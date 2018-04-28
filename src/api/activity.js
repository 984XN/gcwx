import service from 'src/api';

export const activity = {
  // 获取列表
  getList: params => {
    return service
      .post(
        '/api/PartyActivity/PaPartyIndividualActivities/GetIndividualActivities',
        params
      )
      .then(res => {
        console.log('activity.getList:', res);
        let list = [];
        if (res.data.Data.PageData) {
          list = res.data.Data.PageData.map((val, index, arr) => {
            return {
              id: val.ID,
              title: val.ExperienceTitle,
              thumb: '',
              author: val.UserName + '(' + val.OrganizationName + ')',
              intro: val.ExperienceContent.replace(/<[^>]+>/g, ''),
              view: 0,
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
        '/api/PartyActivity/PaPartyIndividualActivities/GetGetIndividualActivitiesByID',
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
  // 点赞
  setLiked: params => {
    return service
      .post(
        '/api/PartyStudy/PsPartyStudyCoursewareV2/InsertStudyintegral',
        params
      )
      .then(res => res.data);
  }
};

export default {
  activity
};
