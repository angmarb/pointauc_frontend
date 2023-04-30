import { DeepPartial } from 'react-hook-form';
import ENDPOINTS from '../constants/api.constants';
import { IntegrationFields, SettingFields } from '../reducers/AucSettings/AucSettings';
import { GetUserDto } from '../models/user.model';
import { UserInfo } from '../reducers/User/User';
import { axios } from './axios';

export const getUsername = async (): Promise<UserInfo> => {
  throw new Error('no network');
  // const { data } = await axios.get(ENDPOINTS.USER.USERNAME);

  // return data;
};

export const updateSettings = async (settings: DeepPartial<SettingFields>): Promise<void> => {
  throw new Error('no network');
  // await axios.put(ENDPOINTS.USER.SETTINGS, settings);
};

export const updateIntegration = async (integration: DeepPartial<IntegrationFields>): Promise<void> => {
  throw new Error('no network');
  // await axios.put(ENDPOINTS.USER.INTEGRATION, integration);
};

export const getUserData = async (): Promise<GetUserDto> => {
  throw new Error('no network');
  // const { data } = await axios.get(ENDPOINTS.USER.DATA);
  //
  // return data;
};

export const getIsCanRestoreSettings = async (id: string): Promise<boolean> => {
  throw new Error('no network');
  // const { data } = await axios.get(ENDPOINTS.RESTORE_SETTINGS.HAS_USER, { params: { id } });
  //
  // return data;
};

export const postRestoreSettings = async (id: string): Promise<void> => {
  throw new Error('no network');
  // await axios.post(ENDPOINTS.RESTORE_SETTINGS.RESTORE_SETTINGS, { id });
};

export const validateIntegrations = async (): Promise<void> => {
  throw new Error('no network');
  // await axios.get(ENDPOINTS.USER.VALIDATE_INTEGRATIONS);
};
