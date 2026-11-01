import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const config=readFileSync(new URL('../netlify.toml',import.meta.url),'utf8');
test('showroom provides public simulated role selector',()=>{assert.match(html,/Explore demo profiles/);assert.match(html,/function enterDemo\(\)/);assert.match(html,/Fictional learners and simulated records/);});
test('showroom does not prompt for credentials',()=>{assert.doesNotMatch(html,/id="loginPassword"|id="loginUsername"|fetch\('\/api\/login'|fetch\('\/api\/logout'/);});
test('showroom contains no deployable auth functions or session secret fallback',()=>{assert.equal(existsSync(new URL('../netlify/functions/auth-lib.mjs',import.meta.url)),false);assert.equal(existsSync(new URL('../netlify/functions/login.mjs',import.meta.url)),false);assert.doesNotMatch(config,/netlify\/functions|\/api\/login|\/api\/me|\/api\/logout/);});

test('all demo headers use the original blue mascot instead of the KN monogram',()=>{
  assert.doesNotMatch(html,/brand-monogram|data:image\/png;base64,[A-Za-z0-9+/=]+(?=" alt="KNEWBIE mascot")/);
  assert.equal((html.match(/class="brand-mascot" src="assets\/knewbie-mascot\.png"/g)||[]).length,2);
  assert.match(html,/class="student-brand"><img src="assets\/knewbie-mascot\.png"/);
  assert.match(html,/class="login-mascot" src="assets\/knewbie-mascot\.png"/);
  assert.match(html,/rel="icon" type="image\/png" href="assets\/knewbie-mascot\.png"/);
  const asset=readFileSync(new URL('../assets/knewbie-mascot.png',import.meta.url));
  assert.deepEqual(Array.from(asset.subarray(0,8)),[137,80,78,71,13,10,26,10]);
});
