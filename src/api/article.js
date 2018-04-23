import service from 'src/api';

export const getArticleList = params => {
  // console.log('api.getArticleList', service);
  return service
    .post('/api/PartyStudy/PsPartyStudyCoursewareV2/Query', params)
    .then(res => res.data);
};

export default {
  getArticleList
};
