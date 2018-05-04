// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';
import { System } from 'src/config';

export const activity = {
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
              uid: val.CreateUID ? val.CreateUID : '',
              title: val.ExperienceTitle ? val.ExperienceTitle : '',
              thumb: '',
              author: val.UserName ? val.UserName : '',
              organization: val.OrganizationName ? val.OrganizationName : '',
              content: val.ExperienceContent
                ? val.ExperienceContent.replace(/<[^>]+>/g, '')
                : '',
              view: 0,
              like: 0,
              date: val.CreateDate ? val.CreateDate : ''
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
              date: val.CommentDate || ''
            };
          })
        };
        res.data.Data.Article = article;
        // console.log('activity.api getOne res:', res.data);
        return res.data;
      });
  },
  // 增加点击
  setViewd: params => {
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
};

export default {
  activity
};
