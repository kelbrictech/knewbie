import {readSession} from './auth-lib.mjs';

export default async (request) => {
  const session = readSession(request);
  if(!session) return Response.json({authenticated:false},{status:401});
  return Response.json({authenticated:true,accountEmail:session.accountEmail,role:session.role});
};

export const config = { path:'/api/me' };
