import {readSession} from './auth-lib.mjs';
export async function handler(event){
  const session=readSession(event);
  if(!session) return {statusCode:401,body:JSON.stringify({authenticated:false})};
  return {statusCode:200,headers:{'content-type':'application/json'},body:JSON.stringify({authenticated:true,accountEmail:session.accountEmail,role:session.role})};
}
