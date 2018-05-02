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
  '/PartyActivity/PaPartyIndividualActivities/GetGetIndividualActivitiesByID': {
    name: '获取支部e家详情',
    params: '{ int ID }',
    remark: ''
  }
};
// 支部E家：新增、编辑、删除、回复
// 亮点投票：列表（含背景banner图）、搜索、详情、投票
// 答题促学：列表、试卷页、交卷、学习记录
// 知识竞赛：列表、试卷页、试卷分页、交卷、学习记录、竞赛排名
// 正能量：列表、新增、删除、回复、点赞
// 建言献策：新增、列表
// 抽奖专区：抽奖、中奖记录
// 个人中心：积分总数、党费查询、我的正能量列表、通知公告列表、党务公开列表、党建动态列表

export default {
  API_LIST
};
