// import MetaMaskSDK from '@metamask/sdk';

class EthWallet {
    constructor(){
        this.accountAddr = ""
        this.walletObj = null
        this.isConnect = false;
    }

    /**
     * 获取当前已连接钱包地址
     * @returns 当前钱包地址
     */
    getAddress() {
        return this.accountAddr
    }

    /**
     * 设置当前钱包地址
     * @param {*} accounts 
     */
    setAccount(accounts) {
        this.accountAddr = accounts[0];
    }

    /**
     * 连接钱包
     */
    async connect() {
        try{
            let accounts = await this.walletObj.request({ method: 'eth_requestAccounts' })
            this.setAccount(accounts)
            this.walletObj.on('accountsChanged',this.setAccount);
            this.isConnect = true;
        }catch(err) {
            if (err.code === 4001) {
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        };
    }
}

class MetaMask extends EthWallet {
    constructor() {
        super()
        this.walletObj = window.ethereum
    }
    /**
     * {
     *      img: '',  钱包图标
            url: '',             钱包安装地址，如果检测到钱包没有安装，界面可以引导用户点击安装
            name: '',                        钱包名称
            detected: ,                 bool，返回本钱包是否安装
            index: ,                    (暂时无用)钱包索引，使用本索引来作为调用connect函数的参数，可以链接对应的钱包
    * }
    */
    static info() {
        return {
            img: 'https://metamask.io/icons/icon-144x144.png?v=48400a28770e10dd52a8c0e539aeb282',
            url: 'https://metamask.io/',
            name: 'MetaMask',
            detected: window.ethereum && window.ethereum.isMetaMask,
            index: 0,
        }
    }
}

export { MetaMask } 

