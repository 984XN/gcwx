// //////////////////////////////////////////////////////////////////////// //
// 注意:                                                                    //
//   接口的 then 里不能出现 JS 错误，出错会导致调用接口时，总是进入 catch 部分   //
//   使用属性时一定要先判断属性是否存在、类型是否正确                           //
//   如果总是进入 catch 部门，可以 catch(e){console.log(e)} 查看 JS 错误信息   //
// //////////////////////////////////////////////////////////////////////// //

import service from 'src/api';

const DangNeiGuanAiStatusCode = {
  0: '党支部正在审核',
  1: '党支部审核通过',
  2: '党支部审核退回',
  3: '党总支、党委正在审核',
  4: '党总支、党委审核通过',
  5: '党总支、党委审核退回',
  6: '党工委正在审核',
  7: '党工委审核通过',
  8: '党工委审核退回',
  9: '区委正在审核',
  10: '区委审核通过',
  11: '区委审核退回'
}; // 审核状态

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
    score: {
      total: params => {
        return service
          .post('/api/Integration/IgPartyMemberAddScore/GetMemberBySum', params)
          .then(res => {
            return res.data;
          });
      },
      list: params => {
        return service
          .post('/api/Integration/IgPartyMemberAddScore/GetMemberScore', params)
          .then(res => {
            res.data.Data.list = res.data.Data.PageData.map(v => {
              return {
                id: v.ID || 0,
                score: v.AddScore || 0,
                date: v.CreateDate || '',
                content: v.AddScoreExplain || ''
              };
            });
            return res.data;
          });
      },
      // 积分排名列表
      order: params => {
        return service
          .post(
            '/api/Integration/IgPartyMemberAddScore/GetCurrentOrgRanking',
            params
          )
          .then(res => {
            res.data.Data.list = res.data.Data.PageData.map(v => {
              return {
                id: v.ID || 0,
                name: v.Name || '',
                score: v.Score || v.TotalScore || 0,
                organization: v.OrganizationName || ''
              };
            });
            // console.log('res.data:', res.data);
            return res.data;
          });
      },
      // 我的名次
      place: params => {
        return service
          .post(
            '/api/Integration/IgPartyMemberAddScore/GetMemberAddScore',
            params
          )
          .then(res => {
            return res.data;
          })
      }
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
              totalDues += data[item] || 0;
            }
            year = data.Year ? data.Year + '年' : '';
          } else {
            // 无数据时造个数据，显示成“暂无数据”时没有显示出具体数据格式效果直接
            list = [
              { title: '第1季度', content: '-' },
              { title: '第2季度', content: '-' },
              { title: '第3季度', content: '-' },
              { title: '第4季度', content: '-' }
            ];
            year = new Date().getFullYear();
            totalDues = 0;
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
  DangNeiGuanAi: {
    // 一个费用报销功能
    list: params => {
      return service
        .post('/api/PartyActivity/PaPartyCare/GetCare', params)
        .then(res => {
          res.data.Data.list = res.data.Data.PageData.map(v => {
            // 1待审核、2.审核通过、3审核退回
            let statusText =
              DangNeiGuanAiStatusCode[v.CheckRate] ||
              '未知状态[' + v.CheckRate + ']';
            if (v.CheckState === 1) {
              statusText =
                '<span style="color:#FF9800;">' + statusText + '</span>';
            } else if (v.CheckState === 2) {
              statusText =
                '<span style="color:#4CAF50;">' + statusText + '</span>';
            } else if (v.CheckState === 3) {
              statusText =
                '<span style="color:#F44336;">' + statusText + '</span>';
            }
            return {
              id: v.ID,
              statusText,
              statusCode: v.CheckState || -1, // 1审核中 2通过 3拒绝
              title: v.ApplyForTitle,
              content: v.ProposerCondition,
              address: v.ProposerAddress,
              date: v.CreateDate
            };
          });
          // console.log('api DangNeiGuanAi list res:', res.data);
          return res.data;
        });
    },
    upload: (data, config) => {
      return service
        .post(
          '/api/PartyActivity/PaPartyCare/UploadFile?op=upload',
          data,
          config
        )
        .then(res => {
          return res.data;
        });
    },
    add: params => {
      return service
        .post('/api/PartyActivity/PaPartyCare/InsertCare', params)
        .then(res => {
          return res.data;
        });
    },
    detail: params => {
      return service
        .post('/api/PartyActivity/PaPartyCare/GetCareByID', params)
        .then(res => {
          // 文章正文信息
          let baseinfo = res.data.Data.careInfo[0];
          let article = {
            id: baseinfo.ID || '',
            title: baseinfo.ApplyForTitle || '未命名',
            address: baseinfo.ProposerAddress || '未填写',
            content: baseinfo.ProposerCondition || '暂无备注',
            author: baseinfo.Name || '',
            processCode: baseinfo.CheckRate,
            process:
              DangNeiGuanAiStatusCode[baseinfo.CheckRate] ||
              '未知状态[' + baseinfo.CheckRate + ']',
            statusCode: baseinfo.CheckState, // 1审核中 2通过 3拒绝
            status: { 1: '审核中', 2: '通过', 3: '拒绝' }[baseinfo.CheckState], // 1审核中 2通过 3拒绝
            date: baseinfo.CreateDate || ''
          };
          // 附件
          let file = res.data.Data.imgInfo || [];
          article.imgs = file.map(v => {
            return {
              name: v.FileName,
              src: v.FilePath
            };
          });
          // 审核记录
          let record = res.data.Data.checkInfo || [];
          article.records = record.map(v => {
            return {
              id: v.ID,
              date: v.CheckDate,
              organization:
                v.OrganizationName || 'ID为' + v.OrganizationID + '的组织',
              remark: v.CheckOpinion || '-',
              src: v.CheckImgPath
            };
          });
          article.records = article.records.sort(function(a, b) {
            return b.id - a.id;
          });
          res.data.Data.article = article;
          return res.data;
        });
    }
    // delete: params => {
    //   return service
    //     .post('/api/----------------------------------', params)
    //     .then(res => {
    //       return res.data;
    //     });
    // },
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
    },
    emitBinded: params => {
      return service
        .post(
          '/api/Integration/IgPartyMemberAddScore/InsertMemberAddScoreByAuto',
          params
        )
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
        if (res.data.Data.sysnote) {
          document = res.data.Data.sysnote;
        }
        console.log('document:', document);

        article.baseInfo = {
          type: document.FileType || '',
          id: document.ID || '',
          title:
            document.AffairsTitle ||
            document.PartyDynamicTitle ||
            document.NoteTitle ||
            '未命名',
          content:
            document.AffairsContent ||
            document.PartyDynamicContent ||
            document.NoteContent ||
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
              path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
            };
          });
        } else if (res.data.Data.listfile) {
          // 通知公告里是这个名字
          article.files = res.data.Data.listfile.map((val, index, arr) => {
            return {
              id: val.ID || 0,
              name: val.FileName || '',
              path: val.FilePath ? val.FilePath.replace(/^~/g, '') : ''
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
