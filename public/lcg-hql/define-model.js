

//模型
var Model = require("./hql-model.js");


//======项目======
Model.bind("project",{
	//表名
	table:"stu_project",
	//真实名
	name:"项目",
	//列定义
	cols:{
		name:["项目名称",1],
		type:["项目类型","120px",{
			2:"二分类",
			3:"三分类",
			4:"四分类"
		}]
	}
});


//======实验======
Model.bind("stu_lab",{
	//表名
	table:"stu_lab",
	//真实名
	name:"实验",
	//列定义
	cols:{
		name:["实验名称",1],
		about:["实验说明",1]
	}
});


//======模型======
Model.bind("stu_model",{
	//表名
	table:"stu_model",
	//真实名
	name:"模型",
	//列定义
	cols:{
		model_id:["模型id",1],
		create_time:["生成时间",1],
		about:["模型说明",1]
	}
});


//======历史记录======
Model.bind("stu_lab_his",{
	//表名
	table:"stu_lab_his",
	//真实名
	name:"历史记录",
	//查询参数
	queryInfo:{
		link:"stu_task"
	},
	//列定义
	cols:{
		"runDate":["运行时间",1],
		"stu_task.code":["运行结果","100px"],
		"stu_task.about":["运行结果",1]
	}
});


//======检查======
Model.bind("stu_study",{
	//表名
	table:"stu_study",
	//真实名
	name:"影像",
	//查询参数
	queryInfo:{
		link:"study"
	},
	//列定义
	cols:{
		"study.PatientName":{
			title:"患者姓名",
			queryType:"like"
		},
		"study.PatientID":{
			title:"患者编号",
			color:"#438bf5",
			queryType:"like"
		},
		"study.PatientSex":{
			title:"患者性别",
			width:"90px",
			trans:{
				"F ":"{{text}}::#dd4f43",
				"M ":"{{text}}::#438bf5",
				"女":"{{text}}::#dd4f43",
				"男":"{{text}}::#438bf5"
			},
			queryType:"like"
		},
		"study.StudyDateTime":"检查时间",
		"study.Modality":["设备类型","100px"],
		"state":["影像状态","120px",{
			0:"未标注",
			1:"已标注::#438bf5"
		}],
		"group":["影像分组","120px",{
			0:"未分组",
			1:"训练分组",
			2:"测试分组",
			3:"其他分组"
		}]
	}
});






//======原始检查======
Model.bind("study",{
	//表名
	table:"study",
	//真实名
	name:"影像",
	//列定义
	cols:{
		"PatientName":{
			title:"患者姓名",
			queryType:"like"
		},
		"PatientID":{
			title:"患者编号",
			color:"#438bf5",
			queryType:"like"
		},
		"PatientSex":{
			title:"患者性别",
			width:"90px",
			trans:{
				"F ":"{{text}}::#dd4f43",
				"M ":"{{text}}::#438bf5",
				"女":"{{text}}::#dd4f43",
				"男":"{{text}}::#438bf5"
			},
			queryType:"like"
		},
		"StudyDateTime":{
			title:"检查时间",
			order:true
		},
		"Modality":["设备类型","100px"],
		"BodyPartExamined":"检查部位",
		"StationName":"检查设备"
	}
});