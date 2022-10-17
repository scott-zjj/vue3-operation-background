import http from "@/http/request.js";

export function posttest(query) {
  return http({
    method: "POST",
    url: "",
    data: query,
  });
}
export function gettest(query) {
  return http({
    method: "get",
    url: "",
    data: query,
  });
}