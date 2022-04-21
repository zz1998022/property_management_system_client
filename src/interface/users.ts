export interface RegisterUsers {
  username: string;
  password: string;
  email: string;
}

export interface UsersInter {
  profile: Users;
}

export interface Users {
  username: string;
  email: string;
  avatar: string;
  token: string;
}
