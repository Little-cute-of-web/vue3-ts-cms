export interface IAccount {
  name: string;
  password: string;
}
export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

export interface IRoutes {
  children?: IRoutes[] | null;
  icon: string;
  id: number;
  name: string;
  sort: number;
  type: number;
  url: string;
}
