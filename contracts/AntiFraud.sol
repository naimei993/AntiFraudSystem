// 反诈系统的智能合约 
// 参考拍卖系统实现

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./TokenERC20.sol";
// interface 
contract AntiFraud {
    // // 引入ERC20规则的积分（代币）合约
    // 创建完成后所有积分归创建者所有
    // 积分发行 -> 由创建者账户转入对应用户账户
    // 总积分发行量
    uint256 totalCredit;
    // 创建者地址
    address administrator;
    // 余额
    mapping(address => uint) balanceOf;
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
    // 帖子辅助编号 -> 生成帖子id
    uint postsIndex;

    constructor() {
        totalCredit = 100;
        // Solidity中msg.sender代表合约调用者地址。一个智能合约既可以被合约创建者调用，也可以被其它人调用。
        administrator = msg.sender;
        // 发币
        balanceOf[msg.sender] = totalCredit;
        // 所有辅助编号初始化为0
        policeIndex = 0;
        civilIndex = 0;
        screenshotIndex = 0;
        caseIndex = 0;
        taskIndex = 0;
        postsIndex = 0;
    }
    // get余额
    function _getBalanceOf(address _userAdd) internal view returns (uint) {
        return (balanceOf[_userAdd]);
    }
    function getBalanceOf(address _userAdd) external view returns (uint) {
        return _getBalanceOf(_userAdd);
    }
    // 转币
    function _transfer(address _from, address _to, uint _val) internal returns (bool) {
        bool success = false;
        if (balanceOf[_from] >= _val) {
            balanceOf[_from] -= _val;
            balanceOf[_to] += _val;
            success = true;
        }
        return success;
    }
    function transfer(address _from, address _to, uint _val) external returns (bool) {
        return _transfer(_from, _to, _val);
    }
    // // get积分余额
    // function getBalanceOf(address _contractAdd, address _userAdd) external view returns (uint) {
    //     return ERC20Basic(_contractAdd).balanceOf(_userAdd);
    // }
    // // 授权
    // function creditApprove(address _contractAdd, address _approver, uint _val) external {
    //     ERC20Basic(_contractAdd).approve(_approver, _val);
    // }
    // // 转积分
    // function creditTransfer(address _contractAdd, address _reciver, uint _val) external returns (bool) {
    //     return ERC20Basic(_contractAdd).transfer(_reciver, _val);
    // }
    // // call调用转积分
    // function callTransfer(address _contractAdd) external {
    //     (bool success) = _contractAdd.call(
    //         abi.encodeWithSignature(
    //             "transfer(address,uint256)", 0xF58E5Fdda92689241C6114b9746AEE529fB7671C, 1 
    //         )
    //     );
    //     require(success, "failed");
    // }
    // 警用结构体
    struct Police {
        // 警方用户id
        uint id;
        // 警方用户姓名
        string name;
        // 头像
        string avatarLink;
    }
    // 地址转换
    // mapping(uint => address) policeIdToAddress;
    // 储存所有警方用户的映射
    mapping(address => Police) policeList;
    // get警方用户
    function getPoliceUser(address _policeUserAddress) external view returns (uint, string memory, string memory) {
        Police memory police = policeList[_policeUserAddress];
        require(police.id != 0, "User Not Found");
        return (police.id, police.name, police.avatarLink);
    }
    // 注册警方用户
    function createPoliceUser(string memory _name, string memory _avatarLink) external {
        // 加入警方用户列表
        Police storage police = policeList[msg.sender];
        // 警方id设定为辅助编号
        police.id = ++policeIndex;
        // 设定用户名
        police.name = _name;
        // 设定头像
        police.avatarLink = _avatarLink;
    }
    // 民用结构体
    struct Civil {
        // 市民用户id
        uint id;
        // 市民用户姓名
        string name;
        // 头像
        string avatarLink;
    }
    // 储存所有市民用户的映射
    mapping(address => Civil) civilList;
    // get市民用户
    function getCivilUser(address _civilUserAddress) external view returns (uint, string memory, string memory) {
        Civil memory civil = civilList[_civilUserAddress];
        require(civil.id != 0, "User Not Found");
        return (civil.id, civil.name, civil.avatarLink); 
    }
    // 注册市民用户
    function createCivilUser(string memory _name, string memory _avatarLink) external {
        // 加入市民用户列表
        Civil storage civil = civilList[msg.sender];
        // 市民id设定为辅助编号
        civil.id = ++civilIndex;
        // 设定用户名
        civil.name = _name;
        // 设定头像
        civil.avatarLink = _avatarLink;
    }
    // 案件资料结构体
    // 只需市民用户上传截图 警方用户进行审核
    struct FraudScreenshot {
        // 资料id
        uint id;
        // 审核案件的警方用户地址
        address auditPoliceUser;
        // 案件图片ipfs链接
        string[] screenshotLink;
        // 案件是否有效（由警方进行判断）
        bool isValid;
        // 上传时间
        uint postTime;
    }
    // 储存资料(id)与发布市民用户地址的映射
    mapping(uint => address) screenshotIdToPostCivilUser;
    // 储存市民的案件资料的映射
    mapping(address => FraudScreenshot[]) screenshotList;
    // 储存民警审核过的截图
    mapping(address => FraudScreenshot[]) historyScreenshotAudit;
    // 所有截图
    mapping(uint => FraudScreenshot) allSList;
    // 上传案件资料
    function postScreenshot(string[] memory _screenshotLink) external {
        // 设置案件的发布用户地址
        screenshotIdToPostCivilUser[screenshotIndex] = msg.sender;
        
        FraudScreenshot memory fraudScreenshot;
        // 资料id设定为辅助编号
        fraudScreenshot.id = screenshotIndex;           
        // 设定审核资料的警方用户地址为空
        fraudScreenshot.auditPoliceUser = address(0);
        // 资料上传时间设定为当前时间 
        fraudScreenshot.postTime = block.timestamp;
        // 资料截图   
        fraudScreenshot.screenshotLink = _screenshotLink; 
        // 截图发布时设定为无效 经审核后变为有效 
        fraudScreenshot.isValid = false;
        // 将截图加入市民截图列表
        screenshotList[msg.sender].push(fraudScreenshot);
        // 将截图额加入所有截图列表
        allSList[screenshotIndex] = fraudScreenshot;
        // 增加案件资料辅助编号
        screenshotIndex++;
    }
    // get案件截图列表
    function getScreenshotList() external view returns (FraudScreenshot[] memory) {
        // require(screenshotIndex > 0, "No Screenshot Found");
        // 初始化返回数组
        FraudScreenshot[] memory _List = new FraudScreenshot[](screenshotIndex);
        // // 返回某个市民的全部截图 
        // FraudScreenshot memory screenshot;
        // address _address;
        // // TODO i < address数 
        // //测试情况下只有一台 简化情况为address = 1
        // for (uint i = 0; i < 1; i++) {
        //     _address = screenshotIdToPostCivilUser[i];
        //     for (uint j = 0; j < screenshotList[_address].length; j++) {
        //         screenshot = screenshotList[_address][j];
        //         _List[j] = screenshot;
        //     }
        // }
        for (uint i = 0; i < screenshotIndex; i++) {
            _List[i] = allSList[i];
        }
        return (_List);
    }
    // get自己的历史上传
    function getHistoryPost() external view returns (FraudScreenshot[] memory) {
        // require(screenshotIndex > 0, "No Screenshot Found");
        return screenshotList[msg.sender];
    }
    // get自己的历史审核
    function getHistoryAudit() external view returns (FraudScreenshot[] memory) {
        // require(screenshotIndex > 0, "No Screenshot Found");
        return historyScreenshotAudit[msg.sender];
    }
    // 审核案件资料截图
    function auditScreenshot(uint _screenshotIndex, bool _isVaild) external {
        require(_screenshotIndex <= screenshotIndex, "Screenshot Not Exists");
        // 设定案件是否有效
        allSList[_screenshotIndex].isValid = _isVaild;
        // 设定审核警方用户
        allSList[_screenshotIndex].auditPoliceUser = msg.sender;
        // TODO 更新市民历史上传状态

        // 加入民警历史审核
        historyScreenshotAudit[msg.sender].push(allSList[_screenshotIndex]);
        // 进行审核的警方用户获得积分+1
        _transfer(administrator, msg.sender, 1);
        // 审核有效后 市民用户获得积分+5
        if (_isVaild) {  
            _transfer(administrator, screenshotIdToPostCivilUser[_screenshotIndex], 5);
        }
    }
    // 案件结构体
    // 由警方用户发布 成功上传可获得积分
    struct FraudCase {
        // 案件id
        uint id;
        // 案件标题
        string title;
        // 案件类型
        string tag;
        // 案件描述
        string description;
        // 发布时间
        uint postTime;
        // 案件图片ipfs链接
        string[] caseImageLink;
        // 案件状态表
        // 0：已被否决（社区高票否决/民警复核否决）
        // 1：已提交（社区投票中）
        // 2：已通过社区审核（民警复核中）
        // 3：未通过社区审核（民警复核中）
        // 4：已完成 （民警复核通过/社区高票直接通过）
        uint state;
    }
    // 储存案件(id)与发布用户的映射
    mapping(uint => address) caseIdToPostUser;
    // 储存每个用户与案件的映射
    mapping(address => FraudCase[]) caseList;
    // 历史审核
    mapping(address => FraudCase[]) historyCaseAudit;
    // 储存所有案件的映射
    mapping(uint => FraudCase) allCaseList;
    // 发布案件 -> 类比拍卖系统的发布商品
    function postCase(string memory _title, string memory _tag, string memory _description, string[] memory _caseImageLink) external {
        // 将案件加入案件列表
        FraudCase memory fraudCase;
        // 案件id设定为辅助编号
        fraudCase.id = caseIndex;
        // 案件发布时间设定为当前时间
        fraudCase.postTime = block.timestamp;
        fraudCase.title = _title;
        fraudCase.tag = _tag;
        fraudCase.description = _description;
        // 案件截图
        fraudCase.caseImageLink = _caseImageLink;
        // 设置进度
        fraudCase.state = 1;
        // 设置案件的发布用户地址
        caseIdToPostUser[caseIndex] = msg.sender;
        // 加入用户案件列表
        caseList[msg.sender].push(fraudCase);
        // 将案件加入案件总列表
        allCaseList[caseIndex] = fraudCase;
        // 增加案件辅助编号
        caseIndex++;
    } 
    // get案件列表
    function getCase() external view returns (FraudCase[] memory) {
        // require(caseIndex > 0, "No Case Found");
        FraudCase[] memory _List = new FraudCase[](caseIndex);
        for (uint i = 0; i < caseIndex; i++) {
            _List[i] = allCaseList[i];
        }
        return (_List);
    }
    // 社区投票
    // 记录每个案件的票数 案件编号 => 得票数
    mapping(uint => int) voteCountOfCase;
    // 记录该地址是否已投票 
    mapping(address => bool) isVotedThisAddress;
    // 返回当前地址是否已投票
    function getIsVoted() external view returns (bool) {
        return isVotedThisAddress[msg.sender];
    }
    // get得票数
    function getVoteCountOf(uint _caseIndex) external view returns (int) {
        require(_caseIndex <= caseIndex, "Case Not Exists");
        return voteCountOfCase[_caseIndex];
    }
    // 投票
    function vote(uint _caseIndex, bool isValid, int _checkValue) external {
        require(isVotedThisAddress[msg.sender] == false, "Has voted");
        require(_caseIndex <= caseIndex, "Case Not Exists");
        isVotedThisAddress[msg.sender] = true;
        if (isValid) {
            voteCountOfCase[_caseIndex]++;
        } else {
            voteCountOfCase[_caseIndex]--;
        }
        _countCheck(_checkValue, _caseIndex);
    }
    // 票数判断
    function _countCheck(int _checkValue, uint _caseIndex) internal {
        int count = voteCountOfCase[_caseIndex];
        // 每获得一次投票更新状态
        uint _state;
        if (count > _checkValue) {
            // 大于检测值直接通过
           _state = 4;
        } else if (count < -_checkValue) {
            // 小于检测值直接否决
            _state = 0;
        } else if (count > 0 && count <= _checkValue) {
            // 得票大于0小于检测值
            _state = 2;
        } else {
            // 得票小于等于0大于-检测值
            _state = 3;
        }
        allCaseList[_caseIndex].state = _state;
    }
    // 审核案件
    function auditCase(uint _caseIndex, bool isValid) external {
        require(_caseIndex <= caseIndex, "Case Not Exists");
        // require(allCaseList[_caseIndex].state == 2 || allCaseList[_caseIndex].state == 3);
        if (isValid) {
            allCaseList[_caseIndex].state = 4;
            // 通过审核后发布人获得积分+10
            _transfer(administrator, caseIdToPostUser[_caseIndex], 10);
        } else {
            allCaseList[_caseIndex].state = 0;
        }
        // 加入历史审核
        historyCaseAudit[msg.sender].push(allCaseList[_caseIndex]);
        // 负责审核警方获得积分+1
        _transfer(administrator, msg.sender, 1);
    }
    // get自己的历史案件审核
    function getHistoryCaseAudit() external view returns (FraudCase[] memory) {
        // require(caseIndex > 0, "No Case Found");
        return historyCaseAudit[msg.sender];
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
        // 回答数 抢答固定为1
        uint answerCount;
        // 任务是否已经解决
        bool isSolved;
        // 任务图片ipfs链接
        string[] taskImageLink;
        // 任务形式：true抢答制 false采纳制
        bool isAnswerInRush;
        // 抢答制下任务是否已被接受
        bool isAccept;
    }
    // 储存任务(id)与发布警方用户的映射
    mapping(uint => address) taskIdToPostPoliceUser; 
    // 储存警方与任务的映射
    mapping(address => Task[]) taskList;
    // 储存所有任务的映射
    mapping(uint => Task) allTaskList;
    // 发布任务 -> 类比拍卖系统的发布商品
    // 1.抢答式：需要抢答人支付抵押金 成功完成后退回 
    // 2.采纳式：不需要抵押金 由发布者自行采纳回答 允许多人同时作答
    function postTask(string memory _title, string memory _description, string[] memory _taskImageLink, bool _isAnswerInRush) external {
        // 将任务加入任务列表
        Task memory task;
        // 任务编号设定为辅助编号
        task.id = taskIndex;
        // 任务发布时间设定为当前时间
        task.postTime = block.timestamp;
        task.title = _title;
        task.description = _description;
        task.answerCount = 0;
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
        // 加入警方案件列表
        taskList[msg.sender].push(task);
        // 将任务加入所有任务列表
        allTaskList[taskIndex] = task;
        // 增加任务辅助编号
        taskIndex++;
    }
    // get任务列表
    function getTask() external view returns (Task[] memory) {
        // require(taskIndex > 0, "No Task Found");
        Task[] memory _List = new Task[](taskIndex);
        for (uint i = 0; i < taskIndex; i++) {
            _List[i] = allTaskList[i];
        }
        return (_List);
    } 
    // 储存任务id与抢答者地址的映射
    mapping(uint => address) taskIdToAnswerRusher;
    // 抢答任务
    function acceptTask(uint _taskIndex) external {
        allTaskList[_taskIndex].isAccept = true;
        allTaskList[_taskIndex].answerCount = 1;
        // 设置抢答者地址
        taskIdToAnswerRusher[_taskIndex] = msg.sender;
        // 抢答者账户向创建者账户转入抵押金-2
        _transfer(msg.sender, administrator, 2);
    }
    // 提交任务的回答
    struct TaskAnswer {
        // 回答id
        uint id;
        // 内容详情
        string detail;
        // 回答提交时间
        uint postTime;
        // 作答者地址
        address answerAddress;
    }
    // 储存任务(id)的回答
    mapping (uint => TaskAnswer[]) answerList;
    // 提交回答
    function postTaskAnswer(uint _taskIndex, string memory _detail) external {
        // 将回答加入该任务对应的回答列表
        TaskAnswer memory answer;
        // 设定id
        answer.id = ++allTaskList[_taskIndex].answerCount;
        // 设定回答内容
        answer.detail = _detail;
        // 设定回答提交时间
        answer.postTime = block.timestamp;
        // 设定作答者地址
        answer.answerAddress = msg.sender;
        // 加入回答列表
        answerList[_taskIndex].push(answer);
    }
    // get该任务下的回答
    function getThisTaskAnswer(uint _taskIndex) external view returns (TaskAnswer[] memory) {
        require(_taskIndex <= taskIndex, "Task Not Exists");
        TaskAnswer[] memory _List = new TaskAnswer[](allTaskList[_taskIndex].answerCount);
        for (uint i = 0; i < allTaskList[_taskIndex].answerCount; i++) {
            _List[i] = answerList[_taskIndex][i];
        }
        return _List;
    }
    // 设定任务失败
    // 内部调用
    function _taskFailed(uint _taskIndex) internal {
        // 重新设定为未接受状态
        allTaskList[_taskIndex].isAccept = false;
    }
    // 外部调用
    function taskFailed(uint _taskIndex) external {
        require(_taskIndex <= taskIndex, "Task Not Exists");
        _taskFailed(_taskIndex);
    }
    // 确认任务是否完成 
    function taskCompelte(uint _taskIndex, uint _answerIndex, bool _isAdopt) external {
        require(_taskIndex <= taskIndex, "Task Not Exists");
        if (_isAdopt) {
            allTaskList[_taskIndex].isSolved = true;
            if (allTaskList[_taskIndex].isAnswerInRush) {
                // 创建者账户向抢答者账户转入积分（抵押金+奖金）2+10
                _transfer(administrator, taskIdToAnswerRusher[_taskIndex], 12);
            } else {
                // 创建者账户向被采纳者账户转入积分（奖金）
                _transfer(administrator, answerList[_taskIndex][_answerIndex].answerAddress, 10);
            }
        } else {
            _taskFailed(_taskIndex);
        }
    }
    // 社区（跳骚市场）
    // 帖子
    struct Posts {
        uint id;
        uint postTime;
        // 悬赏金
        uint reward;
        // 该帖子下的回复数
        uint replyCounts;
        string title;
        string description;
        // 类型
        string tag;
        string[] imageLink;
        address postUserAdd;
    }
    // 储存所有帖子
    mapping(uint => Posts) postsList;
    // 发帖
    function createPosts(string memory _title, string memory _description, string memory _tag, string[] memory _imageLink, uint _reward) external {
        Posts memory _post;
        _post.id = postsIndex;
        _post.postTime = block.timestamp;
        _post.reward = _reward;
        _post.replyCounts = 0;
        _post.title = _title;
        _post.description = _description;
        _post.tag = _tag;
        _post.imageLink = _imageLink;
        _post.postUserAdd = msg.sender;
        // 加入帖子列表
        postsList[policeIndex] = _post;
        postsIndex++;
    }
    // get帖子列表
    function getPostsList() external view returns (Posts[] memory) {
        // require(postsIndex > 0, "No Posts Found");
        Posts[] memory _List = new Posts[](postsIndex);
        for (uint i = 0; i < postsIndex; i++) {
            _List[i] = postsList[i];
        }
        return _List;
    }
    // 回复
    struct PostsReply {
        // 所属帖子id
        uint postsId;
        // 楼层
        uint floor;
        uint postTime;
        // 回复内容
        string details;
        address postUserAdd;
    }
    // 储存帖子下的所有回复 帖子id => 对应所有回复
    mapping(uint => PostsReply[]) replyListOfPosts;
    // 发送回复
    function createPostsReply(uint _postsIndex, string memory _details) external {    
        PostsReply memory _reply;
        _reply.postsId = _postsIndex;
        _reply.floor = ++postsList[_postsIndex].replyCounts;
        _reply.postTime = block.timestamp;
        _reply.details = _details;
        _reply.postUserAdd = msg.sender;
        // 加入回复列表
        replyListOfPosts[_postsIndex].push(_reply);
    }
    // get指定贴子下的所有回复
    function getThisPostsReply(uint _postsIndex) external view returns (PostsReply[] memory) {
        require(_postsIndex <= postsIndex, "Post Not Exists");
        PostsReply[] memory _List = new PostsReply[](postsList[_postsIndex].replyCounts);
        for (uint i = 0; i < postsList[_postsIndex].replyCounts; i++) {
            _List[i] = replyListOfPosts[_postsIndex][i];
        }
        return _List;
    }
}