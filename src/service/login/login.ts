import hyRequest from '../index';
import type { IAccount, ILoginResult } from './types';
import type { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/',
}
export function accountLoginRequest(
  account: IAccount
): Promise<IDataType<ILoginResult>> {
  return hyRequest.request<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    method: 'POST',
    data: account,
  });
}
export function requestUserInfoById(id: number) {
  return hyRequest.request<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    method: 'GET',
    showLoading: false,
  });
}
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.request<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    method: 'GET',
    showLoading: false,
  });
}
