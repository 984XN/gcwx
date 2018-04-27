// 目前用于系统出错时，判断出是哪个模块，用于 /src/api/index.js
export const API_LIST = {
  '/PartyStudy/PsPartyStudyCoursewareV2/Query': {
    name: '获取学习平台列表',
    params: 'model{ int Page,int Start,int Limit, pageModel{}, string Theme }',
    remark: ''
  },
  '/Sys/SysUser/GetWechatUserInfo': {
    name: '微信登录',
    params: 'model{ string code }',
    remark: ''
  },
  '/Sys/SysUser/BindPartyMember': {
    name: '微信绑定',
    params: 'model{ string LoginName, string LoginPWD }',
    remark: ''
  },
  '/Sys/SysUser/UnBindPartyMember': {
    name: '微信解绑',
    params: '{}',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID': {
    name: '获取资料详情',
    params: 'model{ int ID }',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/ReadNumber': {
    name: '增加阅读次数',
    params: 'model{ int ID }',
    remark: ''
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/InsertStudyintegral': {
    name: '阅读得积分',
    params: 'model{ int ID, string Title, int Minute }',
    remark: 'ID为资料主键ID, Title为资料标题，Minute为学习时长(单位为分钟)'
  },
  '/Sys/SysUser/UpdatePwd': {
    name: '修改密码',
    params: 'model{ string OldLoginPWD, string NewLoginPWD }',
    remark: ''
  }
};

export default {
  API_LIST
};
