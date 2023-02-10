<script setup lang="ts">
// import { ElImageViewer } from 'element-plus';
import { ElMessage } from 'element-plus'
import store from '../store'
import { NetType, MintNFT } from '../utils/nftmint'
import { Wallet, getList, connect } from '../utils/wallet'
// import {ImageViewer} from ';'

// https://svr.wombostudio.com/api/workPlatform/checkResult/33288de4538558466009
const createApi = 'https://svr.wombostudio.com/api/workPlatform/new'
const loopupApi = 'https://svr.wombostudio.com/api/workPlatform/checkResult'
// const successReportApi = 'https://svr.wombostudio.com/api/workPlatform/showDone'

const mockImgs: any = [
  'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/8345eb4a9feee9b3c830b23683fe3342.png',
  'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/08a03fbecb929eec49bfd835a41b835c.png',
  'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/d509026446f160b51019145e882b5d90.png'
  // 'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/dad97b124dc7ee73620313cdeab35bbf.png',
  // 'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/d137971dadfb5cc6769d790ba1171e39.png',
  // 'https://aidraw-1311786629.cos.ap-nanjing.myqcloud.com/work/1f137c1f0072c37c581489ac624fe79e.png'
]

const format = (s: string) => {
  return s.substring(0, 8) + '...' + s.substring(s.length - 4)
}

const route = useRoute()
const emit = defineEmits(['close'])
type Step = 'form' | 'genimg' | 'doneimg' | 'metadata'
const step = ref<Step>('form')

const onClose = () => {
  emit('close')

  let type = {
    form: 'input',
    genimg: 'select',
    doneimg: 'select',
    metadata: 'mintsetting'
  }[step.value]

  if (success.value) {
    type = 'complete'
  }
  PopupCloseClickTrack(type)
}

let num = 0
const percent = ref(0)
let timer: any = 0
const imgs = ref<string[]>(mockImgs)
const startGening = (platformJobId: string) => {
  // 动画部分
  const loop = () => {
    if (percent.value >= 100) return
    const left = 100 - num
    num += left * 0.001
    percent.value = Math.floor(num)
    timer = setTimeout(loop, 100)
  }
  loop()

  // 实际请求部分
  const looplooup = () => {
    $http.post(`${loopupApi}/${platformJobId}`).then((r: any) => {
      const res = r.data
      const goon = () => {
        const t = Math.random() * 5000 + 20000
        setTimeout(looplooup, t)
      }
      // 如果拿到接口则停止轮询 & callback
      if (res.code > 0) {
        return goon()
      }
      if (res.code == 0) {
        const r = (res.data && res.data[0]) || {}
        const imgUrl = r.image
        if (!imgUrl || r.status != 'done') {
          return goon()
        }

        imgs.value = [r.image1, r.image2, r.image3].filter((e) => e)

        checkedImg.value = imgs.value[0]
        // 成功拿到图片
        percent.value = 100
        setTimeout(() => {
          step.value = 'doneimg'
        }, 300)
      } else {
        alert(res.message)
      }
    })
  }

  setTimeout(() => {
    looplooup()
  }, 10000)
}

const value = ref('')
const submitting = ref(false)
const submit = async () => {
  if (!value.value) return
  if (submitting.value) return
  if (!store.address) {
    alert('you should connect wallet first')
    return
  }
  submitting.value = true
  const t = new Date().getTime()
  const uuid = store.address || `musebot_${t}_${Math.random()}`

  const data = {
    platform: 'musebot',
    userId: uuid,
    // groupId: room.id,
    platformJobId: uuid + '_' + new Date().getTime(),
    keyword: value.value
  }

  KeywordsSubmitClickTrack()

  $http
    .post(createApi, data)
    .then((res: any) => {
      if (res.data.code != 0) {
        return ElMessage.info(res.data.message)
      }
      step.value = 'genimg'
      startGening(data.platformJobId)
    })
    .catch((err: any) => {
      alert(err.message)
    })
    .finally(() => {
      submitting.value = false
    })
}

const checkedImg = ref()

const download = async () => {
  const index = imgs.value.indexOf(checkedImg.value) + 1 + ''
  DownloadClickTrack(index)
  const url = checkedImg.value
  const a = document.createElement('a')
  let imgUrl = ''
  // 跨域获取图片资源
  const res = await fetch(url)
  try {
    const blob = await res.blob()
    imgUrl = window.URL.createObjectURL(blob)
  } catch (e) {
    // console.log('下载图片失败', e);
  }
  // 作品名
  const imgName = url.match(/\.com\/([\S\s]+)(?:.jpg)*$/)?.[1] ?? '作品原图'
  a.download = imgName
  a.href = imgUrl
  a.click()
}

const previewIndex = ref(1)
const showViewer = ref(false)
const onPreview = (index: number) => {
  // ImageViewer
  // ElImageViewer.
  previewIndex.value = index
  showViewer.value = true
}

const onConnect = async () => {
  try {
    const wallet = await connect(1)
    store.address = wallet.getAddress()
  } catch (error) { }
}

const toMintNft = async () => {
  if (!checkedImg.value) return
  step.value = 'metadata'
  const index = imgs.value.indexOf(checkedImg.value) + 1
  MintAsNFTClickTrack(index)
  onConnect()
}

const success = ref(false)
const name = ref('')
const minting = ref(false)
const createNft = async () => {
  if (!store.address) {
    alert('you should connect wallet first')
    return
  }
  MintClickTrack()
  minting.value = true
  try {
    if (!store.address) {
      const wallet = await connect(1)
      store.address = wallet.getAddress()
    }

    const mintNft = new MintNFT(NetType.MAIN_NET, store.contractAddress)

    const res = await mintNft.mintOne(name.value, checkedImg.value)
    console.log(
      '%c [ res ]-52',
      'font-size:13px; background:pink; color:#bf2c9f;',
      res
    )
    success.value = true
  } catch (error: any) {
    ElMessage.info(error)
    console.log(
      '%c [ error ]-212',
      'font-size:13px; background:pink; color:#bf2c9f;',
      error
    )
  }
  minting.value = false
}
</script>

<template>
  <div class="modal">
    <div class="content form" v-if="step === 'form'">
      <div class="ctitle">Describe a scene</div>
      <el-input
        type="textarea"
        placeholder="Text example: on the beach , daytime , a blue penguin , in a pink dress"
        class="input"
        :rows="3"
        v-model="value"
      />
      <el-button :loading="submitting" class="next" @click="submit">
        Next
      </el-button>
    </div>

    <div class="content" v-if="step === 'genimg'">
      <div class="ctitle">AI is generating images……</div>
      <div class="ctitle">Just wait.</div>

      <div class="per">{{ percent }}%</div>
      <div class="process-bar">
        <div class="inner" :style="`width: ${percent}%;`"></div>
      </div>
    </div>

    <div class="content" v-if="step === 'doneimg'">
      <div class="flex-a-j">
        <div class="img-item" v-for="(item, index) in imgs" :key="item">
          <el-image class="simg" :src="item" @click="onPreview(index)" />
          <div class="checkbox">
            <img
              :src="
                $imgUrl(`${checkedImg === item ? 'checked' : 'uncheck'}.png`)
              "
              alt=""
              @click="checkedImg = item"
            />
          </div>
        </div>
      </div>
      <div class="btn1" @click="toMintNft">I want to mint it as an NFT</div>
      <div class="btn2 green" @click="download">
        No need, just download the image.
      </div>
    </div>

    <div class="metadata flex-a-j" v-if="step === 'metadata'">
      <el-image class="img" :src="checkedImg" />
      <div class="success fs24" v-if="success">
        <div>Congrats!</div>
        <div>You just minted {{ name }}.</div>
        <div>You can check it in your</div>
        <div>
          wallet：
          <span class="green">{{ format(store.address) }}</span>
        </div>
      </div>
      <div class="form" v-else>
        <div class="flex-a mb22">
          <span class="label">Name:</span>
          <el-input placeholder="item name" class="input-name" v-model="name" />
        </div>
        <div class="flex-a mb26">
          <span class="label">Blockchain:</span>
          <div class="input-name selected flex-a-j">APTOS</div>
        </div>
        <div class="flex-a">
          <span class="label">Wallet Adress:</span>
          <div class="green">{{ format(store.address) }}</div>
        </div>

        <el-button :loading="minting" class="next flex-a-j" @click="createNft">
          Next
        </el-button>
      </div>
    </div>

    <img :src="$imgUrl('close.png')" class="close" @click="onClose" alt="" />

    <el-image-viewer
      v-if="showViewer"
      :initial-index="previewIndex"
      :url-list="imgs"
      @close="showViewer = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.metadata {
  width: 1012px;
  height: 614px;

  .success {
    text-align: center;
  }

  .img {
    width: 254px;
    height: 254px;
    border-radius: 5px;
    margin-right: 105px;
  }

  .label {
    width: 130px;
  }

  .input-name {
    width: 230px;
    height: 40px;
    border: 2px solid #f5f5f5;
    border-radius: 5px;

    :deep(.el-input__wrapper) {
      border: none;
      box-shadow: none;
      background-color: transparent;

      .el-input__inner {
        text-align: center;
        color: #f5f5f5;
      }
    }

    &.selected {
      border-color: rgba(98, 191, 54, 0.88);
    }
  }

  .next {
    height: 68px;
    width: 100%;
    line-height: 68px;
    background: rgba(98, 191, 54, 0.88);
    border-radius: 5px;
    margin-top: 28px;
    font-size: 14px;
    color: #fff;
    border: none;
    cursor: pointer;
    border: none;
    font-family: "Nasalization";
  }
}
</style>
<style lang="scss" scoped>
@function w($p) {
  @return calc($p / 1440) * 100vw;
}

@function h($p) {
  @return calc($p / 1024) * 100vh;
}

.btn1,
.btn2 {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 361px;
  height: 40px;
  border: 2px solid rgba(98, 191, 54, 0.88);
  border-radius: 5px;
  margin: 20px auto 0;
}

.btn1 {
  background: rgba(98, 191, 54, 0.88);
  margin-top: 40px;
}

.img-item {
  text-align: center;

  &:not(:last-child) {
    margin-right: 40px;
  }

  .simg {
    width: 235px;
    height: 235px;
    border-radius: 5px;
    cursor: pointer;
  }

  .checkbox {
    height: 32px;
    margin-top: 35px;

    img {
      max-height: 100%;
      cursor: pointer;
    }
  }
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: linear-gradient(122.16deg,
      rgba(73, 73, 73, 0.442) 0.03%,
      rgba(44, 44, 44, 0.65) 39.86%);
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(9px);
  color: #f5f5f5;
  /* Note: backdrop-filter has minimal browser support */

  .close {
    cursor: pointer;
    position: absolute;
    top: 28px;
    right: 28px;
    width: 22px;
    height: 22px;
  }

  .content {
    // width: 360px;
    font-weight: 400;
    font-size: 14px;
    line-height: 173.8%;
    text-align: center;
    padding: 90px 70px 60px;

    &.form {}

    .ctitle {
      font-size: 24px;
    }

    .input {
      width: 361px;
      border: 2px solid rgba(245, 245, 245, 0.88);
      border-radius: 5px;
      margin-top: 36px;
    }

    :deep(.el-textarea) {
      .el-textarea__inner {
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: #f5f5f5;
      }
    }

    .next {
      width: 361px;
      height: 68px;
      line-height: 68px;
      background: rgba(98, 191, 54, 0.88);
      border-radius: 5px;
      margin-top: 20px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      border: none;
      font-family: "Nasalization";
    }
  }

  .process-bar {
    position: relative;
    width: 424px;
    height: 20px;
    background: #d9d9d9;
    border-radius: 5px;
    overflow: hidden;

    .inner {
      position: absolute;
      height: 100%;
      background: rgba(98, 191, 54, 0.88);
      border-radius: 5px;
      transition: all 0.1s;
    }
  }
}
</style>
