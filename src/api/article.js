// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';

export const getArticleList = params => {
  // console.log('api.getArticleList', service);
  return service
    .post('/api/PartyStudy/PsPartyStudyCoursewareV2/Query', params)
    .then(res => {
      let list = [];
      if (res.data.Data.PageData) {
        list = res.data.Data.PageData.map((val, index, arr) => {
          return {
            id: val.ID,
            thumb: val.FilePath ? val.FilePath.replace(/^~/g, '') : '',
            title: val.Title,
            content: val.Remark,
            view: val.ReadNumber,
            date: val.CreateDate
          };
        });
      }
      res.data.Data.PageData = list;
      return res.data;
    });
};

export const article = {
  // 获取列表
  list: params => {
    return service
      .post('/api/PartyStudy/PsPartyStudyCoursewareV2/Query', params)
      .then(res => {
        let list = [];
        if (res.data.Data.PageData) {
          list = res.data.Data.PageData.map((val, index, arr) => {
            return {
              id: val.ID,
              thumb: val.FilePath ? val.FilePath.replace(/^~/g, '') : '',
              title: val.Title,
              content: val.Remark,
              view: val.ReadNumber,
              date: val.CreateDate
            };
          });
        }
        res.data.Data.PageData = list;
        return res.data;
      });
  },
  detail: params => {
    return service
      .post(
        '/api/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID',
        params
      )
      .then(res => {
        // 数据格式化
        let article = { baseInfo: {}, files: [] };
        if (res.data.Data.Courseware) {
          let val = res.data.Data.Courseware;
          article.baseInfo = {
            type: val.FileType || '',
            id: val.ID || '',
            title: val.Title || '未命名',
            author: val.CreateUser || '',
            view: val.ReadNumber || 0,
            content: val.Remark || '暂无备注',
            date: val.CreateDate || ''
          };
        }
        // 提取封面，虽然是个数组，但只有一项
        if (res.data.Data.ListCover[0]) {
          article.baseInfo.cover = res.data.Data.ListCover[0].FilePath;
        }
        // 把视频放到 article.vidos[]，把文件入到 article.files[]，视频是 ListVideo[]，文件也是 ListVideo[]，需要通过 Courseware.type 判断
        if (
          res.data.Data.ListVideo &&
          res.data.Data.Courseware.FileType &&
          res.data.Data.Courseware.FileType === 20
        ) {
          article.files = res.data.Data.ListVideo.map((val, index, arr) => {
            return {
              id: val.ID || 0,
              name: val.FileName || '',
              path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
            };
          });
        }
        if (
          res.data.Data.ListVideo &&
          res.data.Data.Courseware.FileType &&
          res.data.Data.Courseware.FileType === 10
        ) {
          article.videos = res.data.Data.ListVideo.map((val, index, arr) => {
            return {
              id: val.ID || 0,
              name: val.FileName || '',
              path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
            };
          });
        }
        res.data.Data.Article = article;
        console.log('api.article.detail:', res);
        return res.data;
      });
  },
  // 增加点击
  setViewed: params => {
    return service
      .post('/api/PartyStudy/PsPartyStudyCoursewareV2/ReadNumber', params)
      .then(res => res.data);
  },
  // 增加积分
  addScore: params => {
    return service
      .post(
        '/api/PartyStudy/PsPartyStudyCoursewareV2/InsertStudyintegral',
        params
      )
      .then(res => res.data);
  }
};

export default {
  getArticleList,
  article
};
