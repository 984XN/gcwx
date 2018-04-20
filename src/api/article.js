import service from 'src/api';

export const getArticleList = params => {
  // console.log('api.getArticleList', service);
  return service.post('/api/articleList.php', params).then(res => res.data);
};

export default {
  getArticleList
};
