// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// 包含主要功能
contract Main {
    // 积分发行量
    uint256 totalCredit;
    // 创建者地址
    address administrator;
    // 各地址余额
    mapping(address => uint) balanceOf;

    // 编号
    uint policeIndex;
    uint civilIndex;
    uint caseIndex;
    uint taskIndex;
    uint productIndex;
    uint transactionPostIndex;

    constructor() {
        totalCredit = 1000;
        administrator = msg.sender;
        // 向创建者账户中转入初始币
        balanceOf[msg.sender] = totalCredit;
        
        policeIndex = 0;
        civilIndex = 0;
        caseIndex = 0;
        taskIndex = 0;
        productIndex = 0;
        transactionPostIndex = 0;
    }

    // 获取余额
    function _getBalanceOf(address _userAdd) internal view returns (uint) {
        return (balanceOf[_userAdd]);
    }

    function getBalanceOf(address _userAdd) external view returns (uint) {
        return _getBalanceOf(_userAdd);
    }

    // 转积分
    // 返回是否成功转移
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

    // 用户结构
    struct User {
        // 用户id
        uint id;
        // 用户姓名
        string name;
        // 头像
        string avatarLink;
        // 地址
        address userAdd;
    }

    // 警方用户列表
    mapping(address => User) policeList;

    // 注册警方用户
    function createPoliceUser(string memory _name, string memory _avatarLink) external {
        User memory _police;
        _police.id = ++policeIndex;
        _police.name = _name;
        _police.avatarLink = _avatarLink;
        _police.userAdd = msg.sender;
        policeList[msg.sender] = _police;
    }

    // 获取警方用户
    function getPoliceUser(address _userAdd) external view returns (User memory) {
        return policeList[_userAdd];
    }

    // 市民用户列表
    mapping(address => User) civilList;

    // 注册市民用户
    function createCivilUser(string memory _name, string memory _avatarLink) external {
        User memory _civil;
        _civil.id = ++civilIndex;
        _civil.name = _name;
        _civil.avatarLink = _avatarLink;
        _civil.userAdd = msg.sender;
        civilList[msg.sender] = _civil;
    }

    // 获取市民用户
    function getCivilUser(address _userAdd) external view returns (User memory) {
        return civilList[_userAdd]; 
    }

    // 通用回复结构
    struct Reply {
        // 要回复的内容的id
        uint repoId;
        // 楼层
        uint floor;
        // 层级
        // 一级回复 = 1 二级回复 = 2...
        uint level;
        uint postTime;
        // 回复内容
        string details;
        // 回复用户地址
        address userAdd;
    }

    // 案件结构
    struct Case {
        uint id;
        string title;
        // 案件类型
        string tag;
        string description;
        uint postTime;
        string[] imageLinks;
        // 发布人地址
        address userAdd;
        // 审核人地址
        address validitySetUserAdd;
        // 是否已经过审核
        bool isSetValidity;
        // 是否为有效信息
        bool isValid;
        // 是否为诈骗案
        bool isFraud;
    }

    // 案件列表
    mapping(uint => Case) caseList;

    // 发布案件 -> 类比拍卖系统的发布商品
    function postCase(string memory _title, string memory _tag, string memory _description, string[] memory _imageLinks) external {
        Case memory _case;
        _case.id = ++caseIndex;
        _case.title = _title;
        _case.tag = _tag;
        _case.description = _description;
        _case.postTime = block.timestamp;
        _case.imageLinks = _imageLinks;
        _case.userAdd = msg.sender;
        _case.validitySetUserAdd = address(0);
        _case.isSetValidity = false;
        _case.isValid = false;
        _case.isFraud = false;
        // 加入案件列表
        caseList[caseIndex] = _case;
    } 

    // 获取案件列表
    function getCaseList() external view returns (Case[] memory) {
        Case[] memory _List = new Case[](caseIndex);
        for (uint i = 0; i < caseIndex; i++) {
            _List[i] = caseList[i + 1];
        }
        return (_List);
    }

    // 审核案件是否为有效诈骗信息
    function setCaseValidity(uint[] memory _caseIndex, bool[] memory _isValid) external {
        for (uint i = 0; i < _caseIndex.length; i++) {
            require(caseList[_caseIndex[i]].id != 0, "Invalid case index");
            caseList[_caseIndex[i]].validitySetUserAdd = msg.sender;
            caseList[_caseIndex[i]].isSetValidity = true;
            caseList[_caseIndex[i]].isValid = _isValid[i];
            // 审核用户积分+1
            _transfer(administrator, msg.sender, 1);
            if (_isValid[i]) {
                // 有效信息 上传用户积分+5
                _transfer(administrator, caseList[_caseIndex[i]].userAdd, 5);
            } else {
                // 无效信息 直接删除
                delete caseList[_caseIndex[i]];
            }
        }
    }

    // 获取历史审核
    function getMyHistoryCaseValiditySet() external view returns (Case[] memory) {
        uint siz = 0; 
        for (uint i = 1; i <= caseIndex; i++) {
            if (caseList[i].validitySetUserAdd == msg.sender) {
                ++siz;
            }
        }
        Case[] memory _List = new Case[](siz);
        for (uint i = 1; i <= caseIndex; i++) {
            if (caseList[i].validitySetUserAdd == msg.sender) {
                _List[i - 1] = caseList[i];
            }
        }
        return _List;
    }

    // 判断案件是否有诈骗嫌疑
    function setIsFraudCase(uint _caseIndex, bool _isFraud) external {
        require(caseList[_caseIndex].id != 0, "Invalid case index");
        caseList[_caseIndex].isFraud = _isFraud;
        // 用户积分+2
        _transfer(administrator, msg.sender, 2);
    } 

    // 获取案件状态
    function getCaseState(uint _caseIndex) external view returns (uint) {
        if (!caseList[_caseIndex].isSetValidity) {
            // 成功提交，等待审核中
            return 1;
        } else {
            if (caseList[_caseIndex].isValid) {
                //已通过审核，已显示在案件广场中
                return 2;
            } else {
                // 未通过审核
                return 3;
            }
        }
    }  

    // 社区投票
    // 每个案件的赞成票数 
    mapping(uint => uint) voteYesCount;
    
    // 每个案件的否定票数
    mapping(uint => uint) voteNoCount;

    // 该地址是否已投票 
    mapping(uint => mapping(address => bool)) isVotedThisAddress;

    // 返回指定案件的当前地址是否已投票
    function getIsVoted(uint _caseIndex) external view returns (bool) {
        require(_caseIndex <= caseIndex, "Case Not Exists");
        return isVotedThisAddress[_caseIndex][msg.sender];
    }

    // 获取指定案件得票数
    // 返回 赞成票 否定票 总得票
    function getVoteCountOf(uint _caseIndex) external view returns (uint, uint, uint) {
        require(_caseIndex <= caseIndex, "Case Not Exists");
        uint _yes = voteYesCount[_caseIndex];
        uint _no = voteNoCount[_caseIndex];
        return (_yes, _no, _yes + _no);
    }
    
    // 投票
    function vote(uint _caseIndex, bool _isFraud) external {
        require(_caseIndex <= caseIndex, "Case Not Exists");
        isVotedThisAddress[_caseIndex][msg.sender] = true;
        if (_isFraud) {
            ++voteYesCount[_caseIndex];
        } else {
            --voteNoCount[_caseIndex];
        }
        // 市民成功投票获得积分+1
        _transfer(administrator, msg.sender, 1);
    }

    //解答案件 
    // 无法确认的案件 => 任务
    struct Task {
        uint id;
        string title;
        string tag;
        string description;
        uint postTime;
        // 接受时间
        uint acceptTime;
        string[] imageLinks;
        // 发布人地址
        address userAdd;
        // 接受人地址
        address acceptAdd;
        // 是否已被接受
        bool isAccept;
        // 是否为诈骗案
        bool isFraud;
        // 是否已完成
        bool isFinished;
    }

    // 任务列表
    mapping(uint => Task) taskList;

    // 发布任务
    function _postTask(string memory _title, string memory _tag, string memory _description, string[] memory _imageLinks) internal {
        Task memory _task;
        _task.id = ++taskIndex;
        _task.title = _title;
        _task.tag = _tag;
        _task.description = _description;
        _task.postTime = block.timestamp;
        _task.acceptTime = 0;
        _task.imageLinks = _imageLinks;
        _task.userAdd = msg.sender;
        _task.acceptAdd = address(0);
        _task.isAccept = false;
        _task.isFraud = false;
        _task.isFinished = false;
        taskList[taskIndex] = _task;
    }

    function postTask(string memory _title, string memory _tag, string memory _description, string[] memory _imageLinks) external {
        _postTask(_title, _tag, _description, _imageLinks);
    }

    // 案件转化为任务
    function postTaskFromCase(uint _caseIndex) external {
        Case memory _case = caseList[_caseIndex];
        _postTask(_case.title, _case.tag, _case.description, _case.imageLinks);
    }

    // 获取任务列表
    function getTaskList() external view returns (Task[] memory) {
        Task[] memory _List = new Task[](taskIndex);
        for (uint i = 0; i < taskIndex; i++) {
            _List[i] = taskList[i + 1];
        }
        return (_List);
    }

    // 接受任务
    function setCaseAccept(uint _taskIndex) external {
        taskList[_taskIndex].isAccept = true;
        taskList[_taskIndex].acceptAdd = msg.sender;
        taskList[_taskIndex].acceptTime = block.timestamp;
        // 转入押金
        require(balanceOf[msg.sender] >= 2, "Credit not enough!");
        _transfer(msg.sender, administrator, 2);
    }

    // 对应任务的回答
    mapping(uint => Reply) taskReply;

    // 发送任务回答
    function postReply2Task(uint _taskIndex, bool _isFraud, string memory _details) external {
        taskList[_taskIndex].isFraud = _isFraud;
        Reply memory _reply;
        _reply.repoId = _taskIndex;
        _reply.details = _details;
        _reply.postTime = block.timestamp;
        _reply.floor = 1;
        _reply.level = 1;
        _reply.userAdd = msg.sender;
        taskReply[_taskIndex] = _reply;
    }

    // 获取任务回答
    function getTaskReply(uint _taskIndex) external view returns (bool, Reply memory) {
        return (taskList[_taskIndex].isFraud, taskReply[_taskIndex]);
    }

    // 设置任务成功
    function setCaseFinished(uint _taskIndex) external {
        taskList[_taskIndex].isFinished = true;
        _transfer(administrator, taskList[_taskIndex].acceptAdd, 5+2);
    }

    // 设置任务失败 超过时限
    function setCaseFailed(uint _taskIndex) external {
        taskList[_taskIndex].isAccept = false;
        taskList[_taskIndex].acceptAdd = address(0);
        taskList[_taskIndex].acceptTime = 0;
    }

    // 官方积分商店
    // 商品结构
    struct Product {
        uint id;
        string name;
        string details;
        uint price;
        // 库存
        uint inventory;
    }

    // 商品列表
    mapping(uint => Product) productList;

    // 上传商品（仅供测试人员使用）
    function createProduct(string memory _name, string memory _details, uint _price, uint _inventory) external {
        Product memory _product;
        _product.id = ++productIndex;
        _product.name = _name;
        _product.details = _details;
        _product.price = _price;
        _product.inventory = _inventory;
        productList[productIndex] = _product;
    }

    // 获取商品列表
    function getProductList() external view returns (Product[] memory) {
        Product[] memory _List = new Product[](productIndex);
        for (uint i = 0; i < productIndex; i++) {
            _List[i] = productList[i+1];
        }
        return (_List);
    }

    // 用户兑换商品
    function purchase(uint _productIndex) external {
        require(productList[_productIndex].inventory > 0, "Inventory not enough!");
        require(balanceOf[msg.sender] >= productList[_productIndex].price, "Credit balance not enough!");
        --productList[_productIndex].inventory;
        _transfer(msg.sender, administrator, productList[_productIndex].price);
    }

    // 警用积分交易社区（闲鱼）
    // 交易贴
    struct TransactionPost {
        uint id;
        uint postTime;
        string title;
        string description;
        // 标签 出售 or 求购
        string tag;
        string[] imageLink;
        // 意向价格
        uint price;
        address userAdd;
        // 现有回复数量
        uint replyCounts;
    }

    // 储存所有交易帖
    mapping(uint => TransactionPost) transactionPostList;

    // 发布交易贴
    function postTransactionPost(string memory _title, string memory _description, string memory _tag, string[] memory _imageLink, uint _price) external {
        TransactionPost memory _post;
        _post.id = ++transactionPostIndex;
        _post.postTime = block.timestamp;
        _post.price = _price;
        _post.title = _title;
        _post.description = _description;
        _post.tag = _tag;
        _post.imageLink = _imageLink;
        _post.userAdd = msg.sender;
        _post.replyCounts = 0;
        // 加入帖子列表
        transactionPostList[transactionPostIndex] = _post;
    }

    // 获取交易贴列表
    function getTransactionPostList() external view returns (TransactionPost[] memory) {
        TransactionPost[] memory _List = new TransactionPost[](transactionPostIndex);
        for (uint i = 0; i < transactionPostIndex; i++) {
            _List[i] = transactionPostList[i + 1];
        }
        return _List;
    }

    // 指定交易贴下的回复列表
    mapping(uint => Reply[]) transactionPostReplyList;

    // 指定交易贴发送回复
    function postReply2TransactionPost(uint _transactionPostIndex, uint _level, string memory _details) external {
        Reply memory _reply;
        _reply.repoId = _transactionPostIndex;
        _reply.details = _details;
        _reply.postTime = block.timestamp;
        _reply.floor = ++transactionPostList[_transactionPostIndex].replyCounts;
        _reply.level = _level;
        _reply.userAdd = msg.sender;
        transactionPostReplyList[_transactionPostIndex].push(_reply);
    }

    // 获取指定交易贴下的回复列表
    function getTransactionPostReplyList(uint _transactionPostIndex) external view returns (Reply[] memory) {
        Reply[] memory _List = new Reply[](transactionPostReplyList[_transactionPostIndex].length);
        for (uint i = 0; i < transactionPostReplyList[_transactionPostIndex].length; i++) {
            _List[i] = transactionPostReplyList[_transactionPostIndex][i];
        }
        return _List;
    }
}