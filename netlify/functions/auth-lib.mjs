import crypto from 'node:crypto';

const FALLBACK_USERS = [
  {"username":"mentor.jaden","accountEmail":"teacher@eslearning.test","role":"teacher","salt":"74e17269aca0b486cefb0de4351da1da","hash":"8d84694b622148a9eac2c7edacbe505ff15f45ffa151af24680c8bcb341d3c968a753221f08698264634bd17df06c9709e84528921a25d6e26d171a5bec1a6a5"},
  {"username":"program.admin","accountEmail":"admin@eslearning.test","role":"admin","salt":"2df4fb116810fecb7c1f14b446d43a27","hash":"215c7981f859445b77f25f7dcc82f773703135a1a181d5638ee11865c7143bd456491a795d5dd35fc799084eda69a6328e82b402980275316ac2bb318eab92a0"},
  {"username":"maria.reyes","accountEmail":"student1@eslearning.test","role":"student","salt":"5eaeefeffc44e65a4886ac09c85732aa","hash":"9286070d58ce3e74c65d2cf57e1259b3baf168c19c4a80cf85c10a9af6823c1696637223a8cb869334668a422c8b97961be68fcbb0ce72b9dcda0ced8fc4d798"},
  {"username":"ana.santos","accountEmail":"student2@eslearning.test","role":"student","salt":"c53f1559f2499c2467d69cb5df77088b","hash":"67bdddd35d04fed8a0a84b35de11e04d0c1b1f81ddd9cca7808f556224d09691edbe8634d158b87396ce787e015d3c15aaf7a8374fbe6eed5beb3eb0e53996bd"},
  {"username":"mara.villanueva","accountEmail":"student3@eslearning.test","role":"student","salt":"1cad8981038bfaa990d74e0b3b509f41","hash":"6b55b9f5262f045ca29f013117a659a6a678e1f5784c8e343e23e0a731c5a33511d439140c26200b4d66a369d6e0b5accdd8ae9270dafdf7506481ac9ed62b09"},
  {"username":"seoyun.park","accountEmail":"student4@eslearning.test","role":"student","salt":"6e2de4c0aabeafd2e492b34863ee3492","hash":"5574076900043ef7896ffb45a9a89f7dda23b53e91ce1092e45b3a5faea3c6a12097ae0ced753dcedfa0a4f2929f49e7e93caf38d0e895a663978057fa25c972"},
  {"username":"tech.founder","accountEmail":"student5@eslearning.test","role":"student","salt":"9fd1dc295700af16baad09cb0818e252","hash":"a68750ad7a6b38126cd796254b6e8992a4123eb5a7c9f1998259a2218ec1b62fe52749bd8e199eb5842a6da0bb6c36be38aab689d3728fe2d82db8a46e8a9140"},
  {"username":"elder","accountEmail":"student6@eslearning.test","role":"student","salt":"d52f9f550c26cc97f4543d37610a708a","hash":"1511ee67127ce6d1cdc96d5e9973ed9ee7347a740e84273b06293f7ebd3364825355373ecc0f6a15e1587088724fa12d24134bb6fb29e5c12d433ceef774e188"},
  {"username":"kelbric.master","accountEmail":"master@eslearning.test","role":"master","salt":"0b96b15093ac6c16956d7c3385029f82","hash":"70590922ffa8a27fb33258475c88fe3d8a45ee941a58c065cef527d5e96505a9629e9d2063ea73f28a4db43911fe7d2df105946df719803cadb483cabc3168ba"}
];

function cookieName(){ return 'knewbie_session'; }

export function getUsers(){
  try{
    const raw = globalThis.Netlify?.env?.get?.('KNEWBIE_USERS_JSON');
    if(raw){
      const parsed = JSON.parse(raw);
      if(Array.isArray(parsed) && parsed.length) return parsed;
    }
  }catch(err){
    console.error('KNEWBIE_USERS_JSON could not be read; using verified fallback hashes.', err);
  }
  return FALLBACK_USERS;
}

export function verifyPassword(password, record){
  const actual = crypto.scryptSync(password, Buffer.from(record.salt,'hex'), 64);
  const expected = Buffer.from(record.hash,'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

export function signSession(payload){
  let secret='';
  try{ secret = globalThis.Netlify?.env?.get?.('KNEWBIE_SESSION_SECRET') || ''; }catch(_){}
  if(!secret) secret='knewbie-prototype-session-fallback-2026-change-in-production';
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256',secret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function readSession(request){
  let secret='';
  try{ secret = globalThis.Netlify?.env?.get?.('KNEWBIE_SESSION_SECRET') || ''; }catch(_){}
  if(!secret) secret='knewbie-prototype-session-fallback-2026-change-in-production';
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
