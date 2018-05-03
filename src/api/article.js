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
            thumb: val.FilePath,
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
  getList: params => {
    return service
      .post('/api/PartyStudy/PsPartyStudyCoursewareV2/Query', params)
      .then(res => {
        let list = [];
        if (res.data.Data.PageData) {
          list = res.data.Data.PageData.map((val, index, arr) => {
            return {
              id: val.ID,
              thumb: val.FilePath,
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
  getOne: params => {
    return service
      .post(
        '/api/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID',
        params
      )
      .then(res => {
        let article = {
          baseInfo: {},
          files: []
        };
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
        if (res.data.Data.ListCover[0]) {
          article.baseInfo.cover = res.data.Data.ListCover[0].FilePath;
        }
        if (res.data.Data.ListVideo) {
          article.files = res.data.Data.ListVideo.map((val, index, arr) => {
            return {
              id: val.ID || 0,
              name: val.FileName || '',
              path: val.FilePath || ''
            };
          });
        }
        res.data.Data.Article = article;
        return res.data;
      });
  },
  // 增加点击
  setViewd: params => {
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
