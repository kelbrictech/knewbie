import {getUsers, verifyPassword, signSession, cookieHeader} from './auth-lib.mjs';

export async function handler(event){
  if(event.httpMethod!=='POST') return {statusCode:405,body:'Method Not Allowed'};
  try{
    const {username='',password=''}=JSON.parse(event.body||'{}');
    const users=getUsers();
    const record=users.find(u=>String(u.username).toLowerCase()===String(username).trim().toLowerCase());
    if(!record || !verifyPassword(String(password),record)) return {statusCode:401,body:JSON.stringify({error:'invalid_credentials'})};
    const token=signSession({accountEmail:record.accountEmail,role:record.role,exp:Date.now()+8*60*60*1000});
    return {statusCode:200,headers:{'content-type':'application/json','set-cookie':cookieHeader(token)},body:JSON.stringify({accountEmail:record.accountEmail,role:record.role})};
  }catch(err){
    console.error(err);
    return {statusCode:500,body:JSON.stringify({error:'server_error'})};
  }
}
