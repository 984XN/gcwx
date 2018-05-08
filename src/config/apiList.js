// 目前用于系统出错时，判断出是哪个模块，例如“this.$vux.alert({title:'获取学习平台列表时出错'})”，见 /src/api/index.js
export const API_LIST = {
  '/PartyStudy/PsPartyStudyCoursewareV2/Query': {
    name: '获取学习平台列表',
    params: {
      model: { Page: '', Start: '', Limit: '' },
      pageModel: {},
      Theme: ''
    }
  },
  '/Sys/SysUser/GetWechatUserInfo': {
    name: '微信登录',
    params: { model: { code: '' } }
  },
  '/Sys/SysUser/BindPartyMember': {
    name: '微信绑定',
    params: { model: { LoginName: '', LoginPWD: '' } }
  },
  '/Sys/SysUser/UnBindPartyMember': {
    name: '微信解绑',
    params: {}
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID': {
    name: '获取资料详情',
    params: { ID: '' }
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/ReadNumber': {
    name: '增加阅读次数',
    params: { ID: '' }
  },
  '/PartyStudy/PsPartyStudyCoursewareV2/InsertStudyintegral': {
    name: '阅读得积分',
    params: { ID: '', Title: '', Minute: '' }
  },
  '/Sys/SysUser/UpdatePwd': {
    name: '修改密码',
    params: { model: { OldLoginPWD: '', NewLoginPWD: '' } }
  },
  '/PartyActivity/PaPartyIndividualActivities/GetIndividualActivities': {
    name: '获取支部e家列表',
    params: {
      model: { Type: '' },
      OrganizationCode: '',
      pageModel: {}
    }
  },
  '/PartyActivity/PaPartyIndividualActivities/InsertIndividualActivities': {
    name: '增加支部e家内容',
    params: {
      model: {
        ExperienceTitle: '',
        ExperienceContent: '',
        Type: '1.心得体会2.留言评论3.思想汇报4.党务咨询' // number
      },
      imageID: ''
    }
  },
  '/PartyActivity/PaPartyIndividualActivities/GetGetIndividualActivitiesByID': {
    name: '获取支部e家详情',
    params: { ID: '' }
  },
  '/PartyActivity/PaPartyIndividualActivities/UpdateIndividualActivities': {
    name: '编辑支部e家内容',
    params: {}, // 把收到的数据编辑后原样返回去
    remark: ''
  },
  '/PartyActivity/PaPartyIndividualActivities/DeleteIndividualActivities': {
    name: '删除支部e家内容',
    params: { ID: '' }
  },
  '/PartyActivity/PaPartyIndividualActivities/UploadFile?op=upload': {
    name: '支部e家的图片上传',
    params: { file: 'formData' }
  },
  '/PartyActivity/PaPartyCommentMsg/InsertCommentMsg': {
    name: '支部e家留言增加评论',
    params: {
      model: {
        UserID: '',
        BeUserID: '',
        ActivitiesID: '',
        CommentContent: '',
        BeMsgID: ''
      }
    }
  },
  '/PartyActivity/PaPartyReadData/InsertReadData': {
    name: '支部e家设为已读',
    params: { ForeignID: '' }
  },
  // 建言献策
  '/PartyActivity/PaPartySuggestions/InsertSuggestions': {
    name: '录入建言献策',
    params: {
      model: {
        OrganizationID: '',
        SuggestionsTitle: '',
        SuggestionsContent: ''
      }
    }
  },
  '/PartyActivity/PaPartySuggestions/GetOrgByLoginMmeber': {
    name: '获取登录人所属单位',
    params: {},
    remark: '获取登录人所属的党工委、区委'
  },
  '/PartyActivity/PaPartySuggestions/GetSuggestions': {
    name: '获取建言献策列表',
    params: { queryModel: {}, pageModel: {} }
  },
  '/PartyActivity/PaPartySuggestions/GetSuggestionsByID': {
    name: '获取建言献策详情',
    params: {
      model: {
        UserID: '',
        BeUserID: '',
        SuggestionsID: '',
        CommentContent: '',
        BeMsgID: ''
      }
    }
  },
  '/PartyActivity/PaPartySuggestionsCommentMsg/InsertCommentMsg': {
    name: '评论建言献策',
    params: {
      model: {
        UserID: '',
        BeUserID: '',
        SuggestionsID: '',
        CommentContent: '',
        BeMsgID: ''
      }
    }
  },
  // 正能量
  '/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergy': {
    name: '正能量列表',
    params: {
      model: {
        IsAdopt: '1所有人审核通过的，0所有人审核没通过的，默认0' // string
      },
      OrganizationCode: '', // number
      pageModel: {}
    }
  },
  '/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergyByMemberID': {
    name: '我的正能量列表',
    params: {
      pageModel: {}
    }
  },
  '/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergyByID': {
    name: '正能量详情信息',
    params: { ID: '' }
  },
  '/PartyActivity/PaPartyPositiveEnergy/InsertPositiveEnergy': {
    name: '增加正能量',
    params: {
      model: {
        PositiveEnergyTitle: '标题', // string
        PositiveEnergyContent: '内容' // string
      },
      imageID: [] // number
    }
  },
  '/PartyActivity/PaPartyPositiveEnergy/UpdatePositiveEnergy': {
    name: '编辑正能量',
    params: {
      model: {
        PositiveEnergyTitle: '标题', // string
        PositiveEnergyContent: '内容' // string
      },
      imageID: [] // number
    }
  },
  '/PartyActivity/PaPartyPositiveEnergy/DeletePositiveEnergyByID': {
    name: '删除正能量',
    params: { ID: '' }
  },
  '/PartyActivity/PaPartyPositiveEnergy/UploadFile?op=upload': {
    name: '上传图片',
    params: {}
  },
  '/PartyActivity/PaPartyPositiveEnergyCommentMsg/InsertCommentMsg': {
    name: '评论正能量',
    params: {
      model: {
        CommentContent: '', // string 留言内容
        EnergyID: '', // int 回复给哪条留言
        BeMsgID: '', // int? 回复给留言下边的哪条评论
        BeUserID: '', // int 被评论人的UID
        UserID: '' // int 登录人的UserID，不传
      }
    }
  },
  '/PartyActivity/PaPartyPositiveEnergy/ReadNumber': {
    name: '设为已读',
    params: { ID: '' }
  },
  '/PartyActivity/PaPartyFabulousRecord/InsertFabulous': {
    name: '点赞',
    params: {
      model: {
        Type: '1.党建动态2.正能量', // number
        ActivityID: '活动ID' // number
      }
    }
  },
  // 抽奖专区
  // 转盘上的奖品清单和剩余可抽奖额度
  '/PartyActivity/PaPartyLotteryGoods/GetLotteryGoodsByIsPutaway': {
    name: '获取奖品清单',
    params: {
      Type: '' // number 1.积分商品, 2.答题促学商品
    }
  },
  // 剩余可抽奖额度（答题抽奖时用）
  '/PartyStudy/PsScoreRecord/GetScoreRecordByID': {
    name: '剩余可抽奖额度',
    params: {
      ID: ''
    }
  },
  // // 更新可抽奖额度（答题抽奖时用）
  // '/PartyStudy/PsScoreRecord/UpdateScoreRecord': {
  //   name: '剩余可抽奖额度',
  //   params: {
  //     ID: ''
  //   }
  // },
  // 抽奖
  '/PartyActivity/PaPartyLotteryGoods/GetLotteryByMember': {
    name: '抽奖',
    params: {
      Type: '' // number 1.积分抽奖, 2.答题促学抽奖
    }
  },
  // 获奖名单
  '/PartyActivity/PaPartyWinningRecord/GetWinningRecord': {
    name: '获取获奖名单',
    params: {
      queryModel: {
        WinningType: '' // number 1.积分抽奖的, 2.答题抽奖的
      }
    }
  },
  // 个人中奖记录
  '/PartyActivity/PaPartyWinningRecord/GetWinningRecordByMember': {
    name: '个人中奖记录',
    params: {
      queryModel: {},
      pageModel: {}
    }
  },
  // 试卷列表
  '/PartyStudy/PsExamPapers/GetExamPapers': {
    name: '试卷列表',
    params: {
      queryModel: {
        PapersClassify: '' // int 10表示答题促学 20表示知识竞赛
      },
      pageModel: {}
    }
  },
  // 已答试卷列表
  '/PartyStudy/PsExamPapers/GetMyExamPapers': {
    name: '已答试卷列表',
    params: {
      queryModel: {
        PapersClassify: '' // int 10表示答题促学/20表示知识竞赛
      },
      pageModel: {}
    }
  },
  // 答题促学 试卷的详情（题目清单，未做过的试卷）
  '/PartyStudy/PsExamPapers/GetPapersByanswer': {
    name: '答题促学试卷的详情',
    params: {
      ID: '',
      pageModel: {}
    }
  },
  // 知识竞赛 试卷的详情（题目清单，未做过的试卷）
  '/PartyStudy/PsExamPapers/GetRandomTopicByKnowledgeContest': {
    name: '知识竞赛试卷的详情',
    params: {
      ID: '',
      pageModel: {}
    }
  },
  // 答题促学 试卷的详情（题目清单，已经做过的试卷）
  '/PartyStudy/PsExamPapers/GetQuestionBankAndScoreByExamPapersID': {
    name: '做过的试卷的详情',
    params: {
      ID: '',
      pageModel: {}
    }
  },
  // 获取成绩
  '/PartyStudy/PsAnswerRecord/InsertAnswerRecordByAnswerLearning': {
    name: '获取成绩',
    params: {
      list: [
        {
          QuestionID: '', // int 题目id,
          SelectedAnswers: '' // string 所选答案
        },
        {
          QuestionID: '', // int 题目id,
          SelectedAnswers: '' // string 所选答案
        }
      ],
      PapersID: '' // int
    }
  },
  '/PartyStudy/PsExamPapers/GetTestScores': {
    name: '知识竞赛排名',
    params: {
      ID: '', // int
      Name: '', // string
      pageModel: {}
    }
  },
  '/Sys/SysUser/GetUserInfoByID': {
    name: '获取个人资料',
    params: {}
  },
  '/PartyActivity/PaPartyMemberAddScore/GetMemberScore': {
    name: '获取积分记录',
    params: {}
  },
  '/PartyMember/PdPartyMemberCostPay/GetCostPayByLoginMember': {
    name: '获取党费缴纳信息',
    params: {}
  },
  '/Sys/SysNote/GetSysNoteByHomePge': {
    name: '获取通知公告列表',
    params: {}
  },
  '/Sys/SysNote/GetNoteMesByID': {
    name: '获取通知公告详情',
    params: {}
  },
  '/PartyActivity/PaPartyAffairs/GetAffairs': {
    name: '获取党务公开列表',
    params: {}
  },
  '/PartyActivity/PaPartyAffairs/GetAffairsByID': {
    name: '获取党务公开详情',
    params: {}
  },
  '/PartyActivity/PaPartyDynamic/GetDynamicByAdopt': {
    name: '获取党建动态列表',
    params: {}
  },
  '/PartyActivity/PaPartyDynamic/GetDynamicByID': {
    name: '获取党建动态详情',
    params: {}
  },
  '/Ballot/BltBallotTask/GetBltBallotTask': {
    name: '投票活动列表',
    params: {}
  },
  '/Ballot/BltBallotItem/Query': {
    name: '投票活动里的投票项列表',
    params: {}
  },
  '/Ballot/BltBallotItem/GetRank': {
    name: '投票项的排名',
    params: {}
  },
  '/Ballot/BltBallotTask/GetByID': {
    name: '投票项基本信息',
    params: {}
  },
  '/Ballot/BltBallotItem/GetTaskRecordMember': {
    name: '投票项的得票记录',
    params: {}
  },
  '/Ballot/BltBallotRecord/InsertBallotRecord': {
    name: '投票动作',
    params: {}
  },
  ____________: {
    name: '默认的空接口',
    params: {}
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
