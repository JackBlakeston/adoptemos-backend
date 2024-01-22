import { AxiosRequestConfig } from 'axios';

export const TEST_ENVIRONMENT_REQUEST_ORIGIN = 'test-environment-origin';

export const AXIOS_TEST_CONFIG: AxiosRequestConfig = {
  headers: {
    Origin: TEST_ENVIRONMENT_REQUEST_ORIGIN,
  },
  validateStatus: () => {
    return true;
  },
};
