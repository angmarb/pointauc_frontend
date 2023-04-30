import globalAxios from 'axios';

export const axios = globalAxios.create({
  timeout: 1,
});
