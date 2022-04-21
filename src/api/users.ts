import { requestWithoutToken } from "@/utils/request";
import { RegisterUsers } from "@/interface/users";

// 登录
export function usersLogin(username: string, password: string) {
  return requestWithoutToken("/users/login", "post", { username, password });
}
// 注册
export function usersRegister(users: RegisterUsers) {
  return requestWithoutToken("/users/register", "post", users);
}
