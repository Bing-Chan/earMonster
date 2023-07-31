import { YtoHttp } from "@yto-security/vue3-sdk";

export function getPage(params)  {
  return YtoHttp.post('coefficient/page', params)
}
