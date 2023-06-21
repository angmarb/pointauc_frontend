import { PatchRedemptionDto } from '../models/redemption.model';

// eslint-disable-next-line import/prefer-default-export
export const authenticateTwitch = async (code: string): Promise<{ isNew: boolean }> => {
  throw new Error('no network');
  // const { data } = await axios.post(ENDPOINTS.TWITCH_AUTH, { code });
  //
  // return data;
};

export const authenticateDA = async (code: string): Promise<{ isNew: boolean }> => {
  throw new Error('no network');
  // const { data } = await axios.post(ENDPOINTS.DA_AUTH, { code, redirect_uri: `${window.location.origin}/da/redirect` });
  //
  // return data;
};

export const closeTwitchRewards = async (): Promise<void> => {
  throw new Error('no network');
  // await axios.delete(ENDPOINTS.TWITCH_REWARDS);
};

export const updateRedemption = async (data: PatchRedemptionDto): Promise<void> => {
  throw new Error('no network');
  // await axios.patch(ENDPOINTS.TWITCH_REDEMPTIONS, data);
};
