# contract AntiFraud

注：IPFS相关的实现可以暂时延后

# GETs

前端页面只显示需要的返回值就行 这里给的返回值比较多

## 1.获取警方用户

_policeUserAddress: address 该用户的地址

```solidity
function getPoliceUser(address _policeUserAddress) external view returns (uint, string memory, string memory) {
    // ... ...
    // 返回：id(uint) 名称(string) 头像链接(string)
	  return(police.id, police.name, police.avatarLink);
}
```

## 2.获取民众用户

_civilUserAddress: address 该用户的地址

```solidity
function getCivilUser(address _civilUserAddress) external view returns (uint, string memory, string memory) {
    // ... ...
    // 返回：id(uint) 名称(string) 头像链接(string)
    return(civil.id, civil.name, civil.avatarLink); 
}
```

## 3.获取账户余额

_address: address 该用户的地址

```solidity
function getBalanceOf(address _address) external view returns (uint256) {
    // 返回：余额 (uint256)
    return credit._getBalance(_address);
}
```

## 4.获取截图资料列表

返回截图结构体数组

```solidity
function getScreenshotList() external view returns (FraudScreenshot[] memory) {}
```

## 5.获取案件列表

返回案件结构体数组

```solidity
function getCase() external view returns (FraudCase[] memory) {}
```

## 6.获取任务列表

返回任务结构体数组

```solidity
function getTask() external view returns (Task[] memory) {}   
```

## 7.获取指定任务下的回答列表

_taskIndex: uint 指定的任务编号

返回回答结构体数组

```solidity
function getThisTaskAnswer(uint _taskIndex) external view returns (TaskAnswer[] memory) {}
```



## 警用端-注册警方用户

_name: string 用户名

_avatarLink: string 头像的IPFS链接

```solidity
function createPoliceUser(string memory _name, string memory _avatarLink) external {}
```

## 民用端-注册市民用户

_name: string 用户名

_avatarLink: string 头像的IPFS链接

```solidity
function createCivilUser(string memory _name, string memory _avatarLink) external {}
```

## 民用端-上传案件资料（截图）

_screenshotLink: string 截图的IPFS链接

```solidity
function postScreenshot(string memory _screenshotLink) external {}
```

## 警用端-审核案件资料（截图）

_screenshotIndex: string 案件资料（截图）的id

_isVaild: bool 是否有效

```solidity
function auditScreenshot(uint _screenshotIndex, bool _isVaild) external {}
```

## 警用端-发布案件

_title:  string 标题

_description: string 描述

_caseImageLink: string 相关图片的IPFS链接

```solidity
function postCase(string memory _title, string memory _description, string memory _caseImageLink) external {}
```

## 警用端-发布任务

_title:  string 标题

_description: string 描述

_caseImageLink: string 相关图片的IPFS链接

 _isAnswerInRush: bool 该任务是否为抢答模式：true为抢答模式 false为采纳模式

```solidity
function postTask(string memory _title, string memory _description, string memory _taskImageLink, bool _isAnswerInRush) external {}
```

## 警用端-接受任务（抢答制）

_taskIndex: int 抢答的任务的id

```solidity
function acceptTask(uint _taskIndex) external {}
```

## 警用端-提交回答（抢答制&采纳制）

_taskIndex: int 回答的任务的id

_detail: string 回答的内容

```solidity
function postTaskAnswer(uint _taskIndex, string memory _detail) external {}
```

## 警用端-设定任务失败

_taskIndex: int 失败的任务的id

任务失败：抢答者未在限制时间内成功回答问题 

（回答后不采纳导致的任务失败的情况已经在确认任务是否完成的函数中实现）

限制时间随意设置为一个定值就行 前端的同学自行决定就好 还有相关逻辑的实现也写在前端

```solidity
function taskFailed(uint _taskIndex) external {}
```

## 警用端-任务发布人确认任务是否完成（抢答制&采纳制）

_taskIndex: int 完成的任务的id

_answeIndex: int 正在确认的回答的id

_isAdopt: bool 是否采纳

```solidity
function taskCompelte(uint _taskIndex, uint _answerIndex, bool _isAdopt) external {}
```
