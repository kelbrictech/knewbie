import {getUsers, verifyPassword, signSession, cookieHeader} from './auth-lib.mjs';

export default async (request) => {
  if(request.method!=='POST') return new Response('Method Not Allowed',{status:405});
  try{
    const {username='',password=''} = await request.json().catch(()=>({}));
    const users = getUsers();
    const record = users.find(u=>String(u.username).toLowerCase()===String(username).trim().toLowerCase());
    if(!record || !verifyPassword(String(password),record)){
      return Response.json({error:'invalid_credentials'},{status:401});
    }
    const token = signSession({accountEmail:record.accountEmail,role:record.role,exp:Date.now()+8*60*60*1000});
    return new Response(JSON.stringify({accountEmail:record.accountEmail,role:record.role}),{
      status:200,
      headers:{'content-type':'application/json','set-cookie':cookieHeader(token)}
    });
  }catch(err){
    console.error(err);
    return Response.json({error:'server_error'},{status:500});
  }
};

export const config = { path:'/api/login' };
