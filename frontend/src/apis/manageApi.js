import axiosClient from './axiosClient';

const URL = '/management';

const manageApi = {
  getEmployeeStatistic: () => {
    return axiosClient.get(`${URL}/emp-stat`);
  },
};

export default manageApi;
