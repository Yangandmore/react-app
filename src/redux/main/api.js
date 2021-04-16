import { request } from '../../utils';

const testApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/api/v2/categories/GanHuo',
        method: 'GET',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { testApi };
