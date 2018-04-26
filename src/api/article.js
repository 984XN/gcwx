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
            intro: val.Remark,
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
              intro: val.Remark,
              view: val.ReadNumber,
              date: val.CreateDate
            };
          });
        }
        res.data.Data.PageData = list;
        return res.data;
      });
  },
  get: params => {
    return service
      .post('/api/PartyStudy/PsPartyStudyCoursewareV2/GetCoursewareByID', params)
      .then(res => {
        let list = [];
        if (res.data.Data.PageData) {
          list = res.data.Data.PageData.map((val, index, arr) => {
            return {
              id: val.ID,
              title: val.Title,
              author: val.FilePath,
              content: val.Remark,
              date: val.CreateDate
            };
          });
        }
        res.data.Data.PageData = list;
        return res.data;
      });
  }, // 增加点击
  addViewTimes: params => {}, // 增加积分
  addScore: params => {}
};

export default {
  getArticleList,
  article
};
