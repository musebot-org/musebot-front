class Wallet {
    static walletInstance: any = null;
    accountAddr: string;
    walletObj: null;
    isConnect: boolean;

    constructor() {
        this.accountAddr = ""
        this.walletObj = null
        this.isConnect = false;
    }

    static getWallet() {
        return Wallet.walletInstance
    }

    getAddress() {
        return this.accountAddr
    }

    async connect() {
        let ac = await this.walletObj.connect()
        this.accountAddr = ac.address
        this.isConnect = true;
    }

    async disconnect() {
        this.accountAddr = "";
        await this.walletObj.disconnect()
        this.walletObj = null;
        Wallet.walletInstance = null;
        this.isConnect = false;
    }

    onAccountChange(func) {
        this.walletObj.onAccountChange((account) => {
            if (account) {
                this.accountAddr = account.address
            }
            if (func) {
                func(account)
            }
        })
    }

    async runTransAction(funName, args, aptosClient) {
        const transaction = {
            function: funName,
            arguments: args,
            type_arguments: [],
        };
        const pendingTransaction = await this.signAndSubmitTransaction(transaction);
        const txn = await aptosClient.waitForTransactionWithResult(pendingTransaction);
        return txn
    } signAndSubmitTransaction(transaction: { function: any; arguments: any; type_arguments: never[]; }) {
        throw new Error('Method not implemented.');
    }
    ;
}

class Petra extends Wallet {
    constructor() {
        super()
        this.walletObj = window.aptos
    }
    static info() {
        return {
            img: 'https://petra.app/favicon.ico',
            url: 'https://petra.app/',
            name: 'Petra Wallet',
            detected: 'aptos' in window,
            index: 0,
        }
    }

    async signAndSubmitTransaction(transaction) {
        transaction.type = "entry_function_payload"
        let txn = await this.walletObj.signAndSubmitTransaction(transaction)
        return txn.hash
    }
}

class Martain extends Wallet {
    constructor() {
        super()
        this.walletObj = window.martian
    }
    static info() {
        return {
            img: 'https://martianwallet.xyz/favicon.ico',
            url: 'https://martianwallet.xyz/',
            name: 'Martain Wallet',
            detected: 'martian' in window,
            index: 1,
        }
    }

    async signAndSubmitTransaction(transaction) {
        let txn = await this.walletObj.generateSignAndSubmitTransaction(this.accountAddr, transaction);
        return txn
    }
}

/**
 * {
 *      img: 'https://martianwallet.xyz/favicon.ico',  ????????????
        url: 'https://martianwallet.xyz/',             ?????????????????????????????????????????????????????????????????????????????????????????????
        name: 'Martain Wallet',                        ????????????
        detected: 'martian' in window,                 bool??????????????????????????????
        index: 1,                                      ?????????????????????????????????????????????connect?????????????????????????????????????????????
 * }
 * @returns ?????????????????????????????????
 */
const getList = () => {
    return [
        Petra.info(), Martain.info()
    ]
}

/**
 * ????????????????????????
 * @param {Number} idx  list??????????????????index??????????????????
 * @returns 
 */
const connect = async (idx: number) => {
    switch (idx) {
        case 0:
            Wallet.walletInstance = new Petra()
            break;
        case 1:
            Wallet.walletInstance = new Martain()
            break;
    }
    await Wallet.walletInstance.connect()
    return Wallet.walletInstance
}

/**
 * ??????????????????
 */
const disconnect = async () => {
    if (Wallet.walletInstance) {
        await Wallet.walletInstance.disconnect();
    }
    Wallet.walletInstance = null;
}

export { Wallet, getList, connect, disconnect }

