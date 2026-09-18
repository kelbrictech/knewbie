import {clearCookieHeader} from './auth-lib.mjs';
export async function handler(event){
  if(event.httpMethod!=='POST') return {statusCode:405,body:'Method Not Allowed'};
  return {statusCode:200,headers:{'set-cookie':clearCookieHeader(),'content-type':'application/json'},body:JSON.stringify({ok:true})};
}
