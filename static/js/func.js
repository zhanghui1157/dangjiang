var siteroot = require('./siteinfo.js');
var onfire = require("./onfire.js");

var url = siteroot.siteroot+'/index.php/mini/';
var uploadurl = siteroot.siteupload+'/index.php/mini/';
var func = {
	getBannerImg:url+'Bd/get_bd_banner_list',//获取banner接口	 
	getArtList:url+'Cmsarticle/get_cms_article_list',//获取新闻列表接口	 
	getArtDetail:url+'Cmsarticle/get_cms_article_info',//获取新闻详情 
	getDangList:url+'Hrcommunist/get_hr_communist_list',//获取党员列表 
	getMeetingList:url+'Oameeting/get_oa_meeting_list',//获取党组织活动列表
	getMeetingList1:url+'Oameeting/get_oa_meeting_list1',//获取党组织活动列表
	getDanginfo:url+'Hrcommunist/get_hr_communist_info',//获取党组织详情    
	getDangDetail:url+'Hrcommunist/get_hr_communist_detail',//获取党员信息    
	getIntegralInfo:url+'Hrcommunist/get_hr_communist_integral_info',//获取志愿者积分详情接口    
	getHelpList:url+'Lifehelp/get_hr_communist_help_list', 
	getHelpOneDetail:url+'Lifehelp/get_hr_communist_help_info', 
	setHelp:url+'Lifehelp/set_hr_communist_help', //提交申请帮扶
	
	getEdumaterialList:url+'Edumaterial/get_edu_material', 
	getEdumaterialDetail:url+'Edumaterial/get_edu_material_info', 
	setNotes:url+'Edunotes/set_edu_notes', //提交学习笔记 
	examList:url+'Eduexam/get_edu_exam_list', //考试列表
	examDetail:url+'Eduexam/get_edu_exam_info', //考试题目列表 
	examSubmit:url+'Eduexam/set_edu_exam_questions', //考试提交
	getVolunteerList:url+'Lifevolunteer/get_life_volunteer_list', //志愿者服务列表 
	getVolunteerDetail:url+'Lifevolunteer/get_life_volunteer_activity_info', //志愿者服务详情
	meetingSign:url+'Oameeting/get_oa_meeting_info', //会议签到详情
	setMeetingSign:url+'Oameeting/set_oa_meeting_sign', //会议签到详情
	zhuantiList:url+'Edutopic/get_edu_topic_list', //会议签到详情
	zhuantiImg:url+'Edutopic/get_edu_topic_info', //会议签到详情
	zhuantiContent:url+'Edutopic/get_edu_topic_content',//获取专题学习内容
	notesDetail:url+'Edunotes/get_edu_notes_info',//获取学习笔记详情
	getNotesList:url+'Edutopic/getNotesList',//获取笔记列表
	addNotes:url+'Edutopic/set_edu_notes',//提交学习笔记
	getNotesList:url+'Edunotes/get_edu_notes_type_list',//获取学习笔记类型
	
	getArticleList:url+'Edutopic/getArticleList',//获取视频列表
	getVideoList:url+'Edutopic/getVideoList',//获取视频列表
	eduNotesList:url+'Edunotes/get_edu_notes_list',
	setVolunteer:url+'Lifevolunteer/set_life_volunteer',//申请志愿者
	getApplyVolunteerDetail:url+'Lifevolunteer/get_life_volunteer_list',//获取志愿者服务列表接口
	
	getTemplateList:url+'Oamissive/get_examine_template',//获取审批模板列表
	setOamissive:url+'Oamissive/set_oa_missive',//提交公文接口方法
	getOamissiveList:url+'Oamissive/get_oa_missive_list',//公文收发公文列表接口
	getOamissiveDetail:url+'Oamissive/get_oa_missive_info',//获取公文详情接口
	
	getActivityList:url+'Cust/get_partydayplan_list',//党员工作计划列表
	getActivityInfo:url+'Cust/get_partydayplan_info',//党员工作计划详情
	workPlanList:url+'Cust/get_committeeplan_list',//党员工作计划列表
	workPlanDetail:url+'Cust/get_committeeplan_info',//党员工作计划列表
	
	oaWorkPlanList:url+'Oaworkplan/get_oa_workplan_list',//工作计划列表
	setOaWorkplan:url+'Oaworkplan/set_oa_workplan',//提交工作计划
	setOaWorkplanStatus:url+'Oaworkplan/set_oa_workplan_status',//提交工作计划
	getOaWorkplanDetail:url+'Oaworkplan/get_oa_workplan_info',//获取工作计划详情
	
	workLogList:url+'Oaworklog/get_oa_worklog_type_list',//调用（获取日报类型）接口
	setWorkLog:url+'Oaworklog/set_oa_worklog',//提交通知公告接口方法
	getWorkLogList:url+'Oaworklog/get_oa_worklog_list',//获取日报列表
	getWorkLogDetail:url+'Oaworklog/get_oa_worklog_info',//获取日报详情
	
	setNotice:url+'Oanotice/set_oa_notice',//提交通知公告接口方法 
	getNoticeList:url+'Oanotice/get_oa_notice_list',//提交通知公告接口方法 
	getNoticeInfo:url+'Oanotice/get_oa_notice_info',//获取通知公告详情 
	
	getSurveyList:url+'Lifesurvey/get_life_survey_list',//获取调查问卷与调查问卷公示列表 
	getSurveyInfo:url+'Lifesurvey/get_life_survey_info',//获取考试详情接口 
	setSurvey:url+'Lifesurvey/set_life_survey',//提交考试接口 
	
	developList:url+'Hrcommunist/get_hr_communist_develop_list',//获取党员发展全纪实列表接口 
	developInfo:url+'Hrcommunist/get_hr_communist_develop_info',//获取党员发展全纪实详情接口 
	movingList:url+'Hrcommunist/get_hr_communist_flow_list',//获取流动党员之家列表接口 
	
	userLogin:url+'Public/idnumber_login',//用户登录
	 
	getFeeDetail:url+'Fa/get_communist_feepay',//加载党费缴纳记录 
	
	openUploud:uploadurl+'Upload/file_upload',//上传文件 
	
	WeiPay:url+'WeiPay/doalipay',//非微信浏览器缴费 
	WeiUserPay:url+'WeiUserPay/doalipay',//微信浏览器缴费
	WeiUserIndex:url+'WeiUser/index',//微信浏览器缴费授权
	WeiMiniPay:url+'WeiMiniPay/doalipay',//微信小程序付款
	AliPay:url+'AliPay/doalipay',//支付宝付款
	
	getOpenid:url+'WeixinMember/getOpenid',//获取openid
}    
var globaldata='';
module.exports = func

