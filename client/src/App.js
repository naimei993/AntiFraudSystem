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

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AntiFraud.networks[networkId];
      const instance = new web3.eth.Contract(
        AntiFraud.abi,
        '0x23278538aFc8aE6e35a6841eE181540E340dD7e3',
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
    let result = await contract.methods.postTask("短信诈骗","点击诈骗短信不明链接，填写个人信息，银行卡账户余额被转移",'https://p0.qhimg.com/bdm/1024_768_85/t01591327d006754ffa.jpg',false)
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    console.log(result);
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div className="App">
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
    </div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
