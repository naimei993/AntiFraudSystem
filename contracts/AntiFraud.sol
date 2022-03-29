// 反诈系统的智能合约 
// 参考拍卖系统实现

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

import "./erc20.sol";

contract AntiFraud {
    // 警方用户辅助编号 -> 生成警方用户id
    uint policeIndex;
    // 市民用户辅助编号 -> 生成市民用户id
    uint civilIndex;
    // 案件辅助编号 -> 生成案件id
    uint caseIndex;
    // 任务辅助编号 -> 生成任务id
    uint taskIndex;
    
    constructor() {
        // 所有辅助编号初始化为0
        policeIndex = 0;
        civilIndex = 0;
        caseIndex = 0;
        taskIndex = 0;
    }
    // 警用结构体
    struct Police {
        // 警方用户id
        uint id;
        // 警方用户姓名
        string name;
        // TODO 头像
        
        // TODO 生成初始积分

        // 警方用户积分
        TokenERC20 credit;
    }
    // 储存所有警方用户的映射
    mapping(address => Police) policeList;
    // 注册警方用户
    function createPoliceUser(string memory _name) public {
        // 增加警方用户辅助编号
        policeIndex++;

        Police police = Police();
        // 警方id设定为辅助编号
        police.id = policeIndex;

        police.name = _name;
        // TODO 设定头像
        
        // TODO 生成初始积分

        // 加入警方用户列表
        policeList[msg.sender] = police;
    }
    // 民用结构体
    struct Civil {
        // 市民用户id
        uint id;
        // 市民用户姓名
        string name;
        // TODO 头像

        // 市民用户积分
        TokenERC20 credit;
    }
    // 储存所有市民用户的映射
    mapping(address => Civil) civilList;
    // 注册市民用户
    function createPoliceUser(string memory _name) public {
        // 增加市民用户辅助编号
        civilIndex++;

        Civil civil = Civil();
        // 市民id设定为辅助编号
        civil.id = civilIndex;

        civil.name = _name;
        // TODO 设定头像

        // 加入市民用户列表
        civilList[msg.sender] = civil;
    }
    // 案件结构体
    // 由市民用户发布 经过警方用户审核后有效后可获得积分
    struct FraudCase {
        // 案件id
        uint id;
        // TODO 案件发布人
        Civil postCivilUser;
        // 案件标题
        string title;
        // 案件描述
        string description;
        // 发布时间
        string postTime;
        // 案件是否有效（由警方进行判断）
        bool isValid;
        // 审核案件的警方用户
        Police auditPoliceUser;
        // TODO 案件图片 -> 使用图片的ipfs哈希实现?
        string caseImageLink;
    }
    // 储存所有案件的映射
    mapping(address => mapping(uint => FraudCase)) caseList;
    // 储存案件(id)与发布市民用户的映射
    mapping(uint => address) caseIdToPostCivilUser;
    // 发布案件（民用功能）-> 类比拍卖系统的发布商品
    function postFraudCase(string memory _title, string memory _description) public {
        // 增加案件辅助编号
        caseIndex++;
        
        FraudCase fraudCase = FraudCase();
        // 案件id设定为辅助编号
        fraudCase.id = caseIndex;
        // 案件发布时间设定为当前时间
        fraudCase.postTime = now;

        fraudCase.title = _title;
        fraudCase.description = _description;
        // TODO 判断案件是否有效

        // Solidity中msg.sender代表合约调用者地址。一个智能合约既可以被合约创建者调用，也可以被其它人调用。
        // 设置案件的发布用户地址
        caseIdToPostCivilUser[caseIndex] = msg.sender;
        // 将案件加入案件列表
        caseList[msg.sender][caseIndex] = fraudCase;
    }
    // 审核案件
    function audiCase(FraudCase _case, bool _isVaild, Police _auditPoliceUser) public {
        // 设定案件是否有效
        _case.isValid = _isVaild;
        // 设定审核警方用户
        _case.auditPoliceUser = _auditPoliceUser;
        // TODO 审核有效后 市民用户获得积分
        if (_isVaild) {

        }
    }
    // 任务结构体
    // 由警方用户发布 参与协助的其他警方用户可获得积分
    struct Task {
        // 任务id
        uint id;
        // TODO 任务发布人
        Police postPoliceUser;
        // TODO 参与协助者
        Police assistPoliceUser;
        // 任务标题
        string title;
        // 任务描述
        string description;
        // 发布时间
        string postTime;
        // 任务是否已经解决
        bool isSolved;
        // TODO 任务图片 -> 使用图片的ipfs哈希实现?
        string taskImageLink;
    }
     // 储存所有任务的映射
    mapping(address => mapping(uint => Task)) taskList;
    // 储存任务(id)与发布警方用户的映射
    mapping(uint => address) taskIdToPostPoliceUser;
    // 发布任务（警方功能）-> 类比拍卖系统的发布商品
    function postTask(string memory _title, string memory _description) public {
        // 增加任务辅助编号
        taskIndex++;

        Task task = Task();
        // 任务编号设定为辅助编号
        task.id = taskIndex;
        // 任务发布时间设定为当前时间
        task.postTime = now;

        task.title = _title;
        task.description = _description;
        // TODO 判断任务是否已经解决

        // 设置任务的发布用户地址
        taskIdToPostPoliceUser[taskIndex] = msg.sender;
        // 将任务加入任务列表
        taskList[msg.sender][taskIndex] = task;
    }
    // TODO 协助任务
    
}
