import crypto from 'node:crypto';

function cookieName(){ return 'knewbie_session'; }

export function getUsers(){
  const raw = Netlify.env.get('KNEWBIE_USERS_JSON');
  if(!raw) throw new Error('KNEWBIE_USERS_JSON is not configured');
  return JSON.parse(raw);
}

export function verifyPassword(password, record){
  const actual = crypto.scryptSync(password, Buffer.from(record.salt,'hex'), 64);
  const expected = Buffer.from(record.hash,'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export function signSession(payload){
  const secret = Netlify.env.get('KNEWBIE_SESSION_SECRET');
  if(!secret) throw new Error('KNEWBIE_SESSION_SECRET is not configured');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256',secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function readSession(request){
  const secret = Netlify.env.get('KNEWBIE_SESSION_SECRET');
  if(!secret) return null;
  const rawCookie = request.headers.get('cookie') || '';
  const cookie = rawCookie.split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName()+'='));
  if(!cookie) return null;
  const token = cookie.slice(cookieName().length+1);
  const [body,sig] = token.split('.');
  if(!body || !sig) return null;
  const expected = crypto.createHmac('sha256',secret).update(body).digest('base64url');
  if(sig.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) return null;
  const payload = JSON.parse(Buffer.from(body,'base64url').toString('utf8'));
  if(!payload.exp || Date.now()>payload.exp) return null;
  return payload;
}

export function cookieHeader(token,maxAge=28800){
  return `${cookieName()}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearCookieHeader(){
  return `${cookieName()}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
