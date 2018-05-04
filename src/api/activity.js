// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';
import { System } from 'src/config';

export const activity = {
  ZhiBuEJia: {
    // 获取列表
    getList: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyIndividualActivities/GetIndividualActivities',
          params
        )
        .then(res => {
          // console.log('activity.getList:', res);
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
    getOne: params => {
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
              return { src: val.FilePath };
            }),
            replies: res.data.Data.Data.map(val => {
              return {
                id: val.ID || '',
                uid: val.UserID ? val.UserID : '',
                author: val.Commentator || '',
                content: val.CommentContent || '',
                avatar: val.PhotoName || System.avatarDefault,
                date: val.CommentDate || '',
                comment:
                  val.comment.map(val => {
                    return {
                      id: val.ID || '',
                      uid: val.UserID ? val.UserID : '',
                      author: val.Commentator || '',
                      content: val.CommentContent || '',
                      avatar: val.PhotoName || System.avatarDefault,
                      date: val.CommentDate || ''
                    };
                  }) || []
              };
            })
          };
          res.data.Data.Article = article;
          // console.log('activity.api getOne res:', res.data);
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
    setLiked: params => {
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
    getList: params => {
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
    getOne: params => {
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
                  avatar: val.PhotoName || System.avatarDefault,
                  date: val.CommentDate || '',
                  comment:
                    val.comment.map(val => {
                      return {
                        id: val.ID || '',
                        uid: val.UserID ? val.UserID : '',
                        author: val.Commentator || '',
                        content: val.CommentContent || '',
                        avatar: val.PhotoName || System.avatarDefault,
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
          res.data.Data.Article = article;
          // console.log('activity.api getOne res:', res.data);
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
      return service
        .post('/api/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergy', {
          model: {
            IsAdopt: 1 // 1所有人审核通过的，0所有人审核没通过的，默认0
          },
          ...params
        })
        .then(res => {
          return res.data;
        });
    },
    detail: params => {
      return service
        .post(
          '/api/PartyActivity/PaPartyPositiveEnergy/GetPositiveEnergyByMemberID',
          params
        )
        .then(res => {
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
    edit: params => {
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
  }
};

export default {
  activity
};
