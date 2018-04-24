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

export default {
  getArticleList
};
