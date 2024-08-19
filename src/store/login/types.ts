interface IUserSubMenus {
  children?: [];
  id: number;
  name: string;
  parentId: number;
  sort: number;
  type: number;
  url: string;
  icon?: string;
}
interface IUserMenus {
  children?: IUserSubMenus[];
  icon: string;
  id: number;
  name: string;
  sort: number;
  type: number;
  url: string;
}
// export interface IUserInfo {
//   cellPhone: string;
//   createAt: string;
//   department: {
//     createAt: string;
//     id: number;
//     leader: string;
//     name: string;
//     parentId: number | null;
//     updateAt: string;
//   };
//   eable: number;
//   id: number;
//   name: string;
//   realname: string;
//   role: {
//     createAt: string;
//     id: number;
//     intro: string;
//     name: string;
//     updateAt: string;
//   };
//   updateAt: string;
// }
export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: IUserMenus[];
  permissions: [];
}
