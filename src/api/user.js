// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';

export const user = {
  login: params => {
    return service
      .post('/api/Sys/SysUser/LoginV2', params)
      .then(res => res.data);
  },
  password: params => {
    return service
      .post('/api/Sys/SysUser/UpdatePwd', params)
      .then(res => res.data);
  },
  member: {
    profile: params => {
      return service
        .post('/api/Sys/SysUser/GetUserInfoByID', params)
        .then(res => {
          let userInfo = {
            Birthday: '',
            EducationBackgroundCode: '',
            MemberState: '',
            Name: '',
            Nation: '',
            OrganizationName: '',
            PhotoName: '',
            Sex: '',
            Tel: '',
            WorkJobs: ''
          };
          if (res.data.Data && res.data.Data[0]) {
            let data = res.data.Data[0];
            userInfo = {
              Birthday: data.Birthday || '',
              EducationBackgroundCode: data.EducationBackgroundCode || '',
              MemberState: data.MemberState || '',
              Name: data.Name || '',
              Nation: data.Nation || '',
              OrganizationName: data.OrganizationName || '',
              PhotoName: data.PhotoName || '',
              Sex: data.Sex || '',
              Tel: data.Tel || '',
              WorkJobs: data.WorkJobs || ''
            };
          }
          delete res.data.Data;
          res.data.Data = { userInfo };
          return res.data;
        });
    },
    score: params => {
      return service
        .post('/api/PartyActivity/PaPartyMemberAddScore/GetMemberScore', params)
        .then(res => {
          res.data.Data.list = res.data.Data.score.map(v => {
            return {
              id: v.ID,
              score: v.AddScore,
              date: v.CreateDate,
              content: v.AddScoreExplain
            };
          });
          return res.data;
        });
    },
    dues: params => {
      return service
        .post(
          '/api/PartyMember/PdPartyMemberCostPay/GetCostPayByLoginMember',
          params
        )
        .then(res => {
          let list = [];
          let year = '';
          let totalDues = 0;
          if (res.data.Data && res.data.Data[0]) {
            let data = res.data.Data[0];
            let items = [
              'FirstQuarterPaid',
              'SecondQuarterPaid',
              'ThirdQuarterPaid',
              'FourthQuarterPaid'
            ];
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              list.push({
                title: '第' + (i + 1) + '季度',
                content: data[item] ? data[item] + '元' : '-'
              });
            }
            year = data.Year ? data.Year + '年' : '';
            totalDues = data.YearPaid;
          }
          delete res.data.Data;
          res.data.Data = {
            year,
            totalDues: totalDues,
            list
          };
          return res.data;
        });
    }
  },
  wechat: {
    getUserInfoByCode: params => {
      return service
        .post('/api/Sys/SysUser/GetWechatUserInfo', params)
        .then(res => res.data);
    },
    bindMember: params => {
      return service
        .post('/api/Sys/SysUser/BindPartyMember', params)
        .then(res => res.data);
    },
    unbindMember: params => {
      return service
        .post('/api/Sys/SysUser/UnBindPartyMember', params)
        .then(res => res.data);
    }
  },
  article: {
    list: params => {
      let url = {
        TongZhiGongGao: '/api/Sys/SysNote/GetSysNoteByHomePge',
        DangWuGongKai: '/api/PartyActivity/PaPartyAffairs/GetAffairs',
        DangJianDongTai: '/api/PartyActivity/PaPartyDynamic/GetDynamicByAdopt'
      }[params.api];
      return service.post(url, params).then(res => {
        res.data.Data.list = res.data.Data.PageData.map(v => {
          return {
            id: v.ID || 0,
            title: v.PartyDynamicTitle || v.AffairsTitle || v.NoteTitle || '',
            content:
              v.PartyDynamicContent || v.AffairsContent || v.NoteContent || '',
            date: v.CheckDate || v.FillInDate || v.CreateDate || '',
            view: v.ReadNumber || 0
          };
        });
        return res.data;
      });
    },
    detail: params => {
      let url = {
        TongZhiGongGao: '/api/Sys/SysNote/GetNoteMesByID',
        DangWuGongKai: '/api/PartyActivity/PaPartyAffairs/GetAffairsByID',
        DangJianDongTai: '/api/PartyActivity/PaPartyDynamic/GetDynamicByID'
      }[params.api];
      return service.post(url, params).then(res => {
        let article = { baseInfo: {}, files: [] };
        // 文章正文信息
        let document = {};
        if (res.data.Data.affair && res.data.Data.affair[0]) {
          document = res.data.Data.affair[0];
        }
        if (res.data.Data.Dynamic && res.data.Data.Dynamic[0]) {
          document = res.data.Data.Dynamic[0];
        }
        if (res.data.Data.note && res.data.Data.note[0]) {
          document = res.data.Data.note[0];
        }
        console.log('document:', document);

        article.baseInfo = {
          type: document.FileType || '',
          id: document.ID || '',
          title:
            document.AffairsTitle || document.PartyDynamicTitle || '未命名',
          content:
            document.AffairsContent ||
            document.PartyDynamicContent ||
            '暂无备注',
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
              path: val.FilePath || ''
            };
          });
        }
        res.data.Data.article = article;
        return res.data;
      });
    }
  }
};

export default {
  user
};
