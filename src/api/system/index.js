import http from "@/http/request.js";


export function userList(query) {
  return http({
    method: "get",
    url: "xxxx",
    data: query,
  });
}