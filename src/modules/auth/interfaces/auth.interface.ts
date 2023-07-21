export enum UserRoles {
  CUSTOMER = 'CUSTOMER',
}

export interface IAuthUser {
  hasRole(...roles: UserRoles[]): boolean;
  user_id: number;
  roles: UserRoles[];
  currentRequestRole?: UserRoles;
}
