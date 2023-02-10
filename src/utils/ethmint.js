import { MetaMask } from './ethwallet'
import { ethers } from "ethers";

class EthMint {

    constructor() {
        this.wallet = new MetaMask();
    }

    /**
     * 初始化合约
     * @param {*} abi      合约ABI信息
     * @param {*} address  合约地址
     */
    async initWithContract(abi,address) {
      await this.init();
      this.contract = new ethers.Contract(address,abi,this.signer);
    }

    /**
     * 初始化并链接钱包
     */
    async init() {
      if(!this.wallet.isConnect) {
        await this.wallet.connect();
        this.provider = new ethers.providers.Web3Provider(this.wallet.walletObj);
        this.signer = this.provider.getSigner();
      }
    }

    /**
     * mintone操作，返回成功失败 （用于demo网站一键生成NFT)
     * @param {String} tokenUri 
     * @returns 
     */
    async mintOne(tokenUri) {
        try{
          let result= await this.contract.mintOne(this.wallet.getAddress(),tokenUri);
          result = await result.wait();
          let id = Number(result.events[0].args.id);
          let num = Number(await this.contract.balanceOf(this.wallet.getAddress(),id));
          return num > 0;
        }catch(e){
            console.error(e);
        }
        return false;
    }

    /**
     * 发布合约
     */
    async setup(abi,code) {
        try{
          await this.init();
          let deploy = new ethers.ContractFactory(abi,code,this.signer);
          let contract = await deploy.deploy(this.wallet.getAddress(),500);
          let coninst = await contract.deployed();
          return coninst.address;
        }catch(e){
          console.error('setup',e)
        }
        return false
    }
}

export { ABIS, EthMint }