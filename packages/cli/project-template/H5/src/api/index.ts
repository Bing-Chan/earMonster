import useAxiosApi from '/@/utils/useAxiosApi';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function getDefalutTime() {
  return useAxiosApi(`/h5/common/getSpecificDate`, {
    method: 'GET',
    data: {},
  });
}


