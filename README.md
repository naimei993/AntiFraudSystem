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

```solidity
    function getScreenshot() external view 
        returns (uint[] memory, address[] memory, string[] memory, bool[] memory, uint[] memory) {
        // ... ...
    	// 返回：id数组(uint) 审查的警方用户的地址(address) 截图链接数组(string) 是否有效数组(bool) 发布时间数组(uint)
        return(ids, auditPoliceUsers, screenshotLinks, valids, postTimes);
    }
```

## 5.获取案件列表

```solidity
    function getCase() external view 
        returns (uint[] memory, string[] memory, string[] memory, uint[] memory, string[] memory) {
            // ... ...
            // 返回值：id数组(uint) 案件标题数组(string) 案件描述数组(string) 发布时间数组(uint) 案件图片链接数组(string)
            return(ids, titles, descriptions, postTimes, caseImageLinks);
    }
    
```

## 6.获取任务列表

```solidity
    function getTask() external view 
        returns (uint[] memory, string[] memory, string[] memory, uint[] memory, bool[] memory, string[] memory, bool[] memory, bool[] memory) {
            // ... ...
            // 返回值：id数组(uint) 任务标题数组 任务描述数组 发布时间数组(uint) 是否解决数组(bool) 任务图片链接数组 是否为抢答模式数组(bool) 是否已被抢答数组(bool)
            return(ids, titles, descriptions, postTimes, isSolveds, taskImageLinks, isAnswerInRushs, isAccpets);
    }  
    
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

