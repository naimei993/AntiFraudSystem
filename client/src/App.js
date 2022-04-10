import React, { Component } from "react";
import { BrowserRouter,Navigate} from 'react-router-dom';
import {Route,Routes,} from 'react-router'

import AntiFraud from "./contracts/AntiFraud.json";
import getWeb3 from "./getWeb3";
import './App.css';
import Index from './components/index/index'
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

      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = AntiFraud.networks[networkId];
      const instance = new web3.eth.Contract(
        AntiFraud.abi,
        '0x1A194b18d0afb6B8A77CFf25Ca3B9EFE6BEA319c',
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      // alert(
      //   `Failed to load web3, accounts, or contract. Check console for details.`,
      // );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    console.log(accounts,contract);


    //警用端发布任务
    // let result = await contract.methods.postTask("短信诈骗","点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",'https://p0.qhimg.com/bdm/1024_768_85/t01591327d006754ffa.jpg',false).send(
    //   {
    //     from:"0xB0d3bDDD4ca94667782672Cc3E96677cfb87D806",
    //     gas:1500000,
    //     gasPrice:"1000000"
    //   },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);}
    // )

     //警用端发布任务
    // let result = await contract.methods.postTask("短信诈骗","点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",'https://p0.qhimg.com/bdm/1024_768_85/t01591327d006754ffa.jpg',false).send(
    //   {
    //     from:accounts[0],
    //     gas:1500000,
    //     gasPrice:"1000000"
    //   },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);}
    // ).on('receipt',function(result){
    //   console.log(result);
    // })
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // console.log(result,"BBBBBBBB");
    let result = contract.methods.postCase("电信诈骗","点击不明链接，银行卡账户余额清空","http://p6.qhimg.com/t01bd60eab8fdee708d.png").call((result1,result2) =>{
      console.log(accounts[0]);
      console.log(result1,"AAAAAAAAAA");
      console.log(result2,"BBBBBBBBBBBB");
    })
    let getresult =  contract.methods.getCase()
    let getresult1 = contract.methods.getCase().call()
    console.log(result,"创建函数");
    console.log(getresult,"获取函数");
    console.log(getresult1,"获取函数11111");
    

    // .send(
    //   {
    //     from:accounts[0],
    //     gas:1500000,
    //     gasPrice:"1000000"
    //   },function(error,result){console.log(result,"AAAAAAAAAAAAa",error);}
    // ).on('receipt',function(result){
    //   console.log(result);
    // })
  contract.getPastEvents(
      'AllEvents',
      {
        fromBlock:0,
        toBlock:'latest'
      },
      (err,result) =>{console.log(result);}
    )
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return  <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/index" element={<Index/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/" element={<Navigate to="/admin/home/index" />}/>
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
    }
    return (
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/index" element={<Index/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/*" element={<Admin/>}/>
          <Route path="/" element={<Navigate to="/admin/home/index" />}/>
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
      // <div className="App">
      //   <h1>Good to Go!</h1>
      //   <p>Your Truffle Box is installed and ready.</p>
      //   <h2>Smart Contract Example</h2>
      //   <p>
      //     If your contracts compiled and migrated successfully, below will show
      //     a stored value of 5 (by default).
      //   </p>
      //   <p>
      //     Try changing the value stored on <strong>line 42</strong> of App.js.
      //   </p>
      //   <div>The stored value is: {this.state.storageValue}</div>
      // </div>
    );
  }
}

export default App;
