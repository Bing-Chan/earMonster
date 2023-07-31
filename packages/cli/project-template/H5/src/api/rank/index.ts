import useAxiosApi from '/@/utils/useAxiosApi';

/**
 * 获取排行榜
 * @returns UseAxiosReturn
 */
export function getRankList(data) {
  return useAxiosApi(`/h5/dailyperformanceleader/list`, {
    method: 'POST',
    data: data,
  });
}

/**
 * 获取排行榜
 * @returns UseAxiosReturn
 */
export function positionlable(data) {
  return useAxiosApi(`/h5/dailyperformanceleader/positionlable`, {
    method: 'POST',
    data: data,
  });
}
