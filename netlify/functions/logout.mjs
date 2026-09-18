import {clearCookieHeader} from './auth-lib.mjs';

export default async (request) => {
  if(request.method!=='POST') return new Response('Method Not Allowed',{status:405});
  return new Response(JSON.stringify({ok:true}),{
    status:200,
    headers:{'content-type':'application/json','set-cookie':clearCookieHeader()}
  });
};

export const config = { path:'/api/logout' };
