import React, { Component } from "react";
import { BrowserRouter,Navigate} from 'react-router-dom';
import {Route,Routes,} from 'react-router'
import {contractABI,contractAddress} from './contract'
// import AntiFraud from "./contracts/AntiFraud.json";
import getWeb3 from "./getWeb3";
import './App.css';
import Admin from './components/admin/admin'
import Login from './components/login/login'
class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //返回当前区块号
      // web3.eth.getBlockNumber().then(console.log);
     //latest earliest
      // web3.eth.getBlock('latest',false).then(console.log)
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        contractABI,
        contractAddress,
      );
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      window.accounts = accounts;
      window.contract = instance;
    } catch (error) {
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log(accounts,contract);

    // .send(
    //   {
    //     from:accounts[0],
    //     gas:1500000,
    //     gasPrice:"1000000"
    //   },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);}
    // ).on('receipt',function(result){
    //   console.log(result);
    // })
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return  <div className="App">
        <h3>{window.ethereum?"已安装钱包,请登录MateMask":"请先安装MateMask插件"}</h3>
    </div>
    }
    return (
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route
            path="*"
            element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
        </Routes>
        </BrowserRouter>
    </div>
    );
  }
}

export default App;
