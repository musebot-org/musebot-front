import formurlencoded from 'form-urlencoded'

const store = reactive({
  address: '',
  access_token: '',
  contractAddress: '',
  showModal: false
})

watch(() => store.address, () => {
  if (store.address) {
    localStorage.setItem('address', store.address)
  } else {
    localStorage.removeItem('address')
  }
})

const config: any = {
  headers: {
    common: {
      Authorization: 'Basic YXBpOjUzMTg5Yzc0OWIwNzExZWE5ODAyNDA3NGUwZGNhMDE4',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}
// 'https://svr.wombostudio.com/api/oauth/api/token'
$axios
  .post(
    'https://svr.wombostudio.com/api/oauth/api/token',
    formurlencoded({
      grant_type: 'api',
      secretId: '6ad6ca2b7152',
      secretKey: '6ad6ca2b715211ed97b652540015f4a4'
    }),
    config
  )
  .then((res: any) => {
    store.access_token = res.data.access_token
  })

//
$axios
  .get('https://musebot.ai/contract/api/moduleaddress')
  .then((res: any) => {
    console.log(
      '%c [ contractAddress res ]-28',
      'font-size:13px; background:pink; color:#bf2c9f;',
      res
    )
    store.contractAddress = res.data
  })
export default store
