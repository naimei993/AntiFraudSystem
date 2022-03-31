# contract AntiFraud

注：IPFS相关的实现可以暂时延后

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

_isAdopt: bool 是否采纳

```solidity
function taskCompelte(uint _taskIndex, bool _isAdopt) external {}
```

