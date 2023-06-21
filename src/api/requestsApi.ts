import { CamilleList } from '../models/requests.model';

export const getCamilleBotData = async (
  username: string,
  listKey: CamilleList,
): Promise<Record<string, string> | 'You are not registred in camille-bot.'> => {
  throw new Error('no network');
  // const { data } = await axios.get(ENDPOINTS.CAMILLE_BOT, {
  //   params: { username, listKey },
  // });
  //
  // return data;
};
