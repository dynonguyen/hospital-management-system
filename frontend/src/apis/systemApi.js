import axiosClient from './axiosClient';

const URL = '/system';

const systemApi = {
  getStatisticDash: () => {
    return axiosClient.get(`${URL}/dash`);
  },

  getUserList: () => {
    return axiosClient.get(`${URL}/user-list`);
  },

  getDetailUser: (userId) => {
    return axiosClient.get(`${URL}/user`, { params: { userId } });
  },

  delUser: (username) => {
    return axiosClient.delete(`${URL}/user`, { params: { username } });
  },

  putChangePassword: (username, newPw, isLocked) => {
    return axiosClient.put(`${URL}/user/pw`, { username, newPw, isLocked });
  },

  getSystemInitVal: () => {
    return axiosClient.get(`${URL}/sys-init`);
  },

  postCreateUser: (createSql, sqlList, defaultRole) => {
    return axiosClient.post(`${URL}/create-user`, {
      createSql,
      sqlList,
      defaultRole,
    });
  },
};

export default systemApi;
