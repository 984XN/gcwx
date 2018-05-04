// 目前用于系统出错时，判断出是哪个模块，用于 /src/api/index.js
export const API_LIST = {
  '/PartyStudy/PsPartyStudyCoursewareV2/Query': {
    name: '获取学习平台列表',
    params: '{ int Page,int Start,int Limit, pageModel{}, string Theme }',
    remark: ''
  },
  '/Sys/SysUser/GetWechatUserInfo': {
    name: '微信登录',
    params: '{ string code }',
    remark: ''
  },
  '/Sys/SysUser/BindPartyMember': {
    name: '微信绑定',
    params: '{ string LoginName, string LoginPWD }',
    remark: ''
  },
  '/Sys/SysUser/UnBindPartyMember': {
    name: '微信解绑',
    params: '{}',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID': {
    name: '获取资料详情',
    params: '{ int ID }',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/ReadNumber': {
    name: '增加阅读次数',
    params: '{ int ID }',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/InsertStudyintegral': {
    name: '阅读得积分',
    params: '{ int ID, string Title, int Minute }',
    remark: 'ID为资料主键ID, Title为资料标题，Minute为学习时长(单位为分钟)'
  },
  '/Sys/SysUser/UpdatePwd': {
    name: '修改密码',
    params: '{ string OldLoginPWD, string NewLoginPWD }',
    remark: ''
  },
  '/PartyActivity/PaPartyIndividualActivities/GetIndividualActivities': {
    name: '获取支部e家列表',
    params: '{int Type}, string OrganizationCode, pageModel{}',
    remark: ''
  },
  '/PartyActivity/PaPartyIndividualActivities/InsertIndividualActivities': {
    name: '增加支部e家内容',
    params:
      'model{string ExperienceTitle(标题), string ExperienceContent(内容), int? Type},List<int> imageID',
    remark: 'Type(1.心得体会2.留言评论3.思想汇报4.党务咨询)}'
  },
  '/PartyActivity/PaPartyIndividualActivities/UpdateIndividualActivities': {
    name: '编辑支部e家内容',
    params: '',
    remark: '把收到的数据编辑后原样返回去'
  },
  '/PartyActivity/PaPartyIndividualActivities/GetGetIndividualActivitiesByID': {
    name: '获取支部e家详情',
    params: '{ int ID }',
    remark: ''
  },
  '/PartyActivity/PaPartyIndividualActivities/DeleteIndividualActivities': {
    name: '删除支部e家内容',
    params: '{ int ID }',
    remark: ''
  },
  '/PartyActivity/PaPartyIndividualActivities/UploadFile?op=upload': {
    name: '支部e家的图片上传',
    params: '{ name file }',
    remark: ''
  },
  '/PartyActivity/PaPartyCommentMsg/InsertCommentMsg': {
    name: '支部e家留言增加评论',
    params:
      'model{int UserID, int? BeUserID, int? ActivitiesID, string CommentContent, int? BeMsgID}',
    remark: ''
  },
  '/PartyActivity/PaPartyReadData/InsertReadData': {
    name: '支部e家设为已读',
    params: 'model{int ForeignID}',
    remark: ''
  }
};
// 支部E家：新增、编辑、删除、回复、评论
// 亮点投票：列表（含背景banner图）、搜索、详情、投票1 --1
// 答题促学：列表、试卷页、交卷1、学习记录 --1
// 知识竞赛：列表、试卷页、试卷分页1、交卷、竞赛排名 --2
// 正能量：列表、新增、删除、回复、点赞 --0.5
// 建言献策：新增、列表1 --0.5
// 抽奖专区：抽奖、中奖记录1 --1
// 个人中心：积分总数、党费查询、我的正能量列表、通知公告列表、党务公开列表、党建动态列表 --1
// 其它：权限（党员与微信用户显示不同内容）、已知BUG修正 --0

export default {
  API_LIST
};
