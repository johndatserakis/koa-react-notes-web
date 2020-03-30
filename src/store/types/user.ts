export interface User {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpiration?: string;
  sendPromotionalEmails: boolean;
  isAdmin: boolean;
  isDeleted: boolean;
  loginCount: number;
  ipAddress: string;
  updatedAt: string;
  createdAt: string;
}

export type UserState = {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}
