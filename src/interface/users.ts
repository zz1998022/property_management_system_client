export interface RegisterUsers {
  username: string;
  password: string;
  email: string;
}

export interface usersInter {
  profile: {
    username: string;
    email: string;
    avatar: string;
    token: string;
  };
}
