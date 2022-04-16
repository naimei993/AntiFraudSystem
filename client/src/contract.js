const contractABI =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskIndex",
				"type": "uint256"
			}
		],
		"name": "acceptTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caseIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValid",
				"type": "bool"
			}
		],
		"name": "auditCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_screenshotIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isVaild",
				"type": "bool"
			}
		],
		"name": "auditScreenshot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_avatarLink",
				"type": "string"
			}
		],
		"name": "createCivilUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_avatarLink",
				"type": "string"
			}
		],
		"name": "createPoliceUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tag",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageLink",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_reward",
				"type": "uint256"
			}
		],
		"name": "createPosts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_postsIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_details",
				"type": "string"
			}
		],
		"name": "createPostsReply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tag",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_caseImageLink",
				"type": "string"
			}
		],
		"name": "postCase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_screenshotLink",
				"type": "string"
			}
		],
		"name": "postScreenshot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_taskImageLink",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isAnswerInRush",
				"type": "bool"
			}
		],
		"name": "postTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_detail",
				"type": "string"
			}
		],
		"name": "postTaskAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_answerIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isAdopt",
				"type": "bool"
			}
		],
		"name": "taskCompelte",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskIndex",
				"type": "uint256"
			}
		],
		"name": "taskFailed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_val",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caseIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValid",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "_checkValue",
				"type": "int256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAdd",
				"type": "address"
			}
		],
		"name": "getBalanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCase",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tag",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "caseImageLink",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "state",
						"type": "uint256"
					}
				],
				"internalType": "struct AntiFraud.FraudCase[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_civilUserAddress",
				"type": "address"
			}
		],
		"name": "getCivilUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHistoryAudit",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "auditPoliceUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "screenshotLink",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isValid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					}
				],
				"internalType": "struct AntiFraud.FraudScreenshot[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHistoryCaseAudit",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tag",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "caseImageLink",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "state",
						"type": "uint256"
					}
				],
				"internalType": "struct AntiFraud.FraudCase[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHistoryPost",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "auditPoliceUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "screenshotLink",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isValid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					}
				],
				"internalType": "struct AntiFraud.FraudScreenshot[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIsVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_policeUserAddress",
				"type": "address"
			}
		],
		"name": "getPoliceUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPostsList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "replyCounts",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tag",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageLink",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "postUserAdd",
						"type": "address"
					}
				],
				"internalType": "struct AntiFraud.Posts[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getScreenshotList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "auditPoliceUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "screenshotLink",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isValid",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					}
				],
				"internalType": "struct AntiFraud.FraudScreenshot[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTask",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "answerCount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isSolved",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "taskImageLink",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isAnswerInRush",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isAccept",
						"type": "bool"
					}
				],
				"internalType": "struct AntiFraud.Task[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_postsIndex",
				"type": "uint256"
			}
		],
		"name": "getThisPostsReply",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "postsId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "floor",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "postUserAdd",
						"type": "address"
					}
				],
				"internalType": "struct AntiFraud.PostsReply[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_taskIndex",
				"type": "uint256"
			}
		],
		"name": "getThisTaskAnswer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "postTime",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "answerAddress",
						"type": "address"
					}
				],
				"internalType": "struct AntiFraud.TaskAnswer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_caseIndex",
				"type": "uint256"
			}
		],
		"name": "getVoteCountOf",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress="0x971cb9eb6a0504bcE7036CD992DD0a91FaB9e2E4"

export {
	contractABI,
	contractAddress
}