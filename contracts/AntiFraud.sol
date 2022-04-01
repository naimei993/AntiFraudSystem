// 反诈系统的智能合约 
// 参考拍卖系统实现

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./erc20.sol";

contract AntiFraud {
    // 引入ERC20规则的积分（代币）合约
    // 总积分发行量
    uint256 totalCredit;
    // 使用credit.balanceOf记录所有用户的余额
    // 创建完成后所有积分归创建者所有
    TokenERC20 credit = new TokenERC20(totalCredit, "credit", "C");
    // 积分发行 -> 由创建者账户转入对应用户账户
    // 创建者地址
    address administrator;

    // 警方用户辅助编号 -> 生成警方用户id
    uint policeIndex;
    // 市民用户辅助编号 -> 生成市民用户id
    uint civilIndex;
    // 案件资料辅助编号 -> 生成案件资料id
    uint screenshotIndex;
    // 案件辅助编号 -> 生成案件id
    uint caseIndex;
    // 任务辅助编号 -> 生成任务id
    uint taskIndex;
    // 任务回答辅助编号 -> 生成任务回答id
    uint taskAnswerIndex;

    constructor() {
        totalCredit = 100;
        // Solidity中msg.sender代表合约调用者地址。一个智能合约既可以被合约创建者调用，也可以被其它人调用。
        administrator = msg.sender;
        // 所有辅助编号初始化为0
        policeIndex = 0;
        civilIndex = 0;
        screenshotIndex = 0;
        caseIndex = 0;
        taskIndex = 0;
        taskAnswerIndex= 0;
    }
    // 警用结构体
    struct Police {
        // 警方用户id
        uint id;
        // 警方用户姓名
        string name;
        // TODO 头像
        string avatarLink;
    }
    // 储存所有警方用户的映射
    mapping(address => Police) policeList;
    // 注册警方用户
    function createPoliceUser(string memory _name, string memory _avatarLink) external {
        // 增加警方用户辅助编号
        policeIndex++;
        // 加入警方用户列表
        Police storage police = policeList[msg.sender];
        // 警方id设定为辅助编号
        police.id = policeIndex;
        // 设定用户名
        police.name = _name;
        // 设定头像
        police.avatarLink = _avatarLink;
        // 生成初始积分
        // credit.balanceOf[msg.sender] = 0;
        // 加入警方用户列表
        //policeList[msg.sender] = police;
    }
    // 民用结构体
    struct Civil {
        // 市民用户id
        uint id;
        // 市民用户姓名
        string name;
        // TODO 头像
        string avatarLink;
    }
    // 储存所有市民用户的映射
    mapping(address => Civil) civilList;
    // 注册市民用户
    function createCivilUser(string memory _name, string memory _avatarLink) external {
        // 增加市民用户辅助编号
        civilIndex++;
        // 加入市民用户列表
        Civil storage civil = civilList[msg.sender];
        // 市民id设定为辅助编号
        civil.id = civilIndex;
        // 设定用户名
        civil.name = _name;
        // 设定头像
        civil.avatarLink = _avatarLink;
        // 初始化积分
        // credit.balanceOf[msg.sender] = 0;
        // 加入市民用户列表
        // civilList[msg.sender] = civil;
    }
    // 案件资料结构体
    // 只需市民用户上传截图 警方用户进行审核
    struct FraudScreenshot {
        // 资料id
        uint id;
        // 审核案件的警方用户地址
        address auditPoliceUser;
        // 案件图片ipfs链接
        string screenshotLink;
        // 案件是否有效（由警方进行判断）
        bool isValid;
        // 上传时间
        uint postTime;
    }
    // 储存所有案件资料的映射
    // mapping(address => mapping(uint => FraudScreenshot)) screenshotList;
    mapping(address => FraudScreenshot) screenshotList;
    // 储存资料(id)与发布市民用户的映射
    mapping(uint => address) screenshotIdToPostCivilUser;
    // 上传案件资料
    function postScreenshot(string memory _screenshotLink) external {
        // 增加案件资料辅助编号
        screenshotIndex++;
        // 设置案件的发布用户地址
        screenshotIdToPostCivilUser[screenshotIndex] = msg.sender;
        // 将案件加入案件列表
        FraudScreenshot storage fraudScreenshot = screenshotList[msg.sender];
        // 资料id设定为辅助编号
        fraudScreenshot.id = screenshotIndex;           
        // 资料上传时间设定为当前时间 
        fraudScreenshot.postTime = block.timestamp;
        // 资料截图   
        fraudScreenshot.screenshotLink = _screenshotLink; 
        // 案件发布时设定为无效 经审核后变为有效 
        fraudScreenshot.isValid = false;
        // 将案件加入案件列表
        // screenshotList[msg.sender] = fraudScreenshot;
    }
    // 审核案件资料截图
    function auditScreenshot(uint _screenshotIndex, bool _isVaild) external {
        // 设定案件是否有效
        screenshotList[screenshotIdToPostCivilUser[_screenshotIndex]].isValid = _isVaild;
        // 设定审核警方用户
        screenshotList[screenshotIdToPostCivilUser[_screenshotIndex]].auditPoliceUser = msg.sender;
        // 进行审核的警方用户获得积分
        credit.transferFrom(administrator, msg.sender, 1);
        // 审核有效后 市民用户获得积分
        if (_isVaild) {
            credit.transferFrom(administrator, screenshotIdToPostCivilUser[_screenshotIndex], 1);
        }
    }
    // 案件结构体
    // 由警方用户发布 成功上传可获得积分
    struct FraudCase {
        // 案件id
        uint id;
        // 案件标题
        string title;
        // TODO 案件类型
        
        // 案件描述
        string description;
        // 发布时间
        uint postTime;
        // 案件图片ipfs链接
        string caseImageLink;
    }
    // 储存所有案件的映射
    // mapping(address => mapping(uint => FraudCase)) caseList;
    mapping(address => FraudCase) caseList;
    // 储存案件(id)与发布警方用户的映射
    mapping(uint => address) caseIdToPostPoliceUser;
    // 发布案件 -> 类比拍卖系统的发布商品
    function postCase(string memory _title, string memory _description, string memory _caseImageLink) external {
        // 增加案件辅助编号
        caseIndex++;
        // 将案件加入案件列表
        FraudCase storage fraudCase = caseList[msg.sender];
        // 案件id设定为辅助编号
        fraudCase.id = caseIndex;
        // 案件发布时间设定为当前时间
        fraudCase.postTime = block.timestamp;

        fraudCase.title = _title;
        fraudCase.description = _description;
        // 案件截图
        fraudCase.caseImageLink = _caseImageLink;
        // 设置案件的发布用户地址
        caseIdToPostPoliceUser[caseIndex] = msg.sender;
        // 将案件加入案件列表
        // caseList[msg.sender] = fraudCase;
        // 发布案件的警方用户获得积分
        credit.transferFrom(administrator, msg.sender, 1);
    } 
    // 任务结构体
    // 由警方用户发布 参与协助的其他警方用户可获得积分
    struct Task {
        // 任务id
        uint id;
        // 任务标题
        string title;
        // 任务描述
        string description;
        // 发布时间
        uint postTime;
        // 任务是否已经解决
        bool isSolved;
        // 任务图片ipfs链接
        string taskImageLink;
        // 任务形式：true抢答制 false采纳制
        bool isAnswerInRush;
        // 抢答制下任务是否已被接受
        bool isAccept;
    }
    // 储存所有任务的映射
    // mapping(address => mapping(uint => Task)) taskList;
    mapping(address => Task) taskList;
    // 储存任务(id)与发布警方用户的映射
    mapping(uint => address) taskIdToPostPoliceUser;
    // 发布任务 -> 类比拍卖系统的发布商品
    // 1.抢答式：需要抢答人支付抵押金 成功完成后退回 
    // 2.采纳式：不需要抵押金 由发布者自行采纳回答 允许多人同时作答
    function postTask(string memory _title, string memory _description, string memory _taskImageLink, bool _isAnswerInRush) external {
        // 增加任务辅助编号
        taskIndex++;
        // 将任务加入任务列表
        Task storage task = taskList[msg.sender];
        // 任务编号设定为辅助编号
        task.id = taskIndex;
        // 任务发布时间设定为当前时间
        task.postTime = block.timestamp;

        task.title = _title;
        task.description = _description;
        // 任务图片
        task.taskImageLink = _taskImageLink;
        // 任务发布时设定为未解决
        task.isSolved = false;
        // 设定任务类型
        task.isAnswerInRush = _isAnswerInRush;
        // 设定为未接受状态
        task.isAccept = false;
        // 设置任务的发布用户地址
        taskIdToPostPoliceUser[taskIndex] = msg.sender;
        // 将任务加入任务列表
        // taskList[msg.sender] = task;
    }
    // 储存任务id与抢答者地址的映射
    mapping(uint => address) taskIdToAnswerRusher;
    // 抢答制：接受任务
    function acceptTask(uint _taskIndex) external {
        taskList[taskIdToPostPoliceUser[_taskIndex]].isAnswerInRush = true;
        taskList[taskIdToPostPoliceUser[_taskIndex]].isAccept = true;
        // 设置抢答者地址
        taskIdToAnswerRusher[_taskIndex] = msg.sender;
        // 抢答者账户向创建者账户转入抵押金
        credit.transferFrom(msg.sender, administrator, 1);
    }
    // 提交任务的回答
    struct TaskAnswer {
        // 回答id
        uint id;
        // 内容详情
        string detail;
        // 回答提交时间
        uint postTime;
    }
    // 采纳制：储存某一任务下所有回答的id
    mapping (uint => mapping (address => TaskAnswer)) answerList; 
    // 采纳制：储存某一任务下所有回答的地址
    mapping (uint => mapping (uint => address)) answerAdressList; 
    // 提交回答
    function postTaskAnswer(uint _taskIndex, string memory _detail) external {
        // 增加回答辅助编号
        taskAnswerIndex++;
        // 将回答加入该任务对应的回答列表
        TaskAnswer storage answer = answerList[_taskIndex][msg.sender];
        // 将回答加入该任务对应的回答地址列表
        answerAdressList[_taskIndex][taskAnswerIndex] = msg.sender;
        // 设定id
        answer.id = taskAnswerIndex;
        // 设定回答内容
        answer.detail = _detail;
        // 设定回答提交时间
        answer.postTime = block.timestamp;
    }
    // 设定任务失败
    // 内部调用
    function _taskFailed(uint _taskIndex) internal {
        // 重新设定为未接受状态
        taskList[taskIdToPostPoliceUser[_taskIndex]].isAccept = false;
    }
    // 外部调用
    function taskFailed(uint _taskIndex) external {
        _taskFailed(_taskIndex);
    }
    // 确认任务是否完成 
    function taskCompelte(uint _taskIndex, uint _answerIndex, bool _isAdopt) external {
        if (_isAdopt) {
            taskList[taskIdToPostPoliceUser[_taskIndex]].isSolved = true;
            if (taskList[taskIdToPostPoliceUser[_taskIndex]].isAnswerInRush) {
                // 创建者账户向抢答者账户转入积分（抵押金+奖金）
                credit.transferFrom(administrator, taskIdToAnswerRusher[_taskIndex], 2);
            } else {
                // 创建者账户向被采纳者账户转入积分（奖金）
                credit.transferFrom(administrator, answerAdressList[_taskIndex][_answerIndex], 1);
            }
        } else {
            _taskFailed(_taskIndex);
        }
    }
}
