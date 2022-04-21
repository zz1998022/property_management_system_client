import { request } from "../utils/request";
import { communityNameInter } from "@/interface/communityInter";

// 获取小区名字
export function getCommunityName() {
  return request<communityNameInter>({
    url: "/community/name",
    method: "get",
  });
}
