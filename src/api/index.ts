import store from '../store'
/**
 * {
"userId": "xxxxxxxx1", //用户唯一ID
"event": "PopupCloseClick", //埋点事件
"do": "popupname", //属性变量
"property": "select", //属性值
"platformJobId": "xxxxxxx", //唯一事务ID
"image": "xxx.png" //图片名称
}
 */
type EventType = {
  userId?: string //用户唯一ID
  event: string //埋点事件
  action: string //属性变量
  property: string //属性值
  platformJobId?: string //唯一事务ID
  image?: string //图片名称
}
export const musebotTrack = async (data: EventType) => {
  data.platformJobId = data.event + '_' + new Date().getTime()
  return $http.post('https://musebot.ai/api/eventTracking/push', data)
}

export const navClickTrack = (tab: string) => {
  return musebotTrack({
    event: 'NavigationbarClick',
    action: 'tab_name',
    property: tab
  })
}

export const homeVisitTrack = () => {
  return musebotTrack({
    event: 'HomepageView',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}

export const walletClickTrack = () => {
  return musebotTrack({
    event: 'ConnectwalletClick',
    action: 'action',
    property: !store.address ? 'connect' : 'diconnect'
  })
}

export const getstartedClickTrack = () => {
  return musebotTrack({
    event: 'GetstartedClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}

export const KeywordsSubmitClickTrack = () => {
  return musebotTrack({
    event: 'KeywordsSubmitClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}

export const PopupCloseClickTrack = (type: string) => {
  musebotTrack({
    event: 'PopupCloseClick',
    action: 'popupname',
    property: type
  })
  musebotTrack({
    event: 'PopupCloseClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}

//
export const MintAsNFTClickTrack = (picIndex: string) => {
  musebotTrack({
    event: 'MintAsNFTClick',
    action: 'selected_num',
    property: picIndex
  })
  musebotTrack({
    event: 'MintAsNFTClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}

export const DownloadClickTrack = (picIndex: string) => {
  musebotTrack({
    event: 'DownloadClick',
    action: 'selected_num',
    property: picIndex
  })
  musebotTrack({
    event: 'DownloadClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}
export const MintClickTrack = (type?: string) => {
  musebotTrack({
    event: 'MintClick',
    action: 'chain_type',
    property: type || 'aptos'
  })
  musebotTrack({
    event: 'MintClick',
    action: 'wallet_status',
    property: store.address ? 'connected' : 'disconnected'
  })
}