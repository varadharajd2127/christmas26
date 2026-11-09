/* >>> Paste your Apps Script Web App URL here (ends with /exec) <<< */
const API = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = { get: k => { try { return localStorage.getItem(k) } catch (e) { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch (e) {} }, del: k => { try { localStorage.removeItem(k) } catch (e) {} } };
async function api(action, data = {}) {
  let j; try { const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, ...data }) }); j = await r.json(); }
  catch (e) { throw new Error('Cannot reach the server. Check your connection and the API link in app.js.'); }
  if (!j.ok) throw new Error(j.error); return j;
}
function toast(m, bad) { const t = document.createElement('div'); t.className = 'toast' + (bad ? ' bad' : ''); t.setAttribute('role', 'status'); t.textContent = m; document.body.append(t); setTimeout(() => t.remove(), 3800); }
function countdown(el, iso, label, onDone) {
  if (!iso) { el.innerHTML = `<small><i class="fa-solid fa-calendar-days"></i> ${esc(label)}</small><span class="note" style="color:#bcd0e6">Date not set yet</span>`; return; }
  const end = new Date(iso); let fired = false;
  (function t() {
    const ms = end - new Date();
    if (ms <= 0) { el.innerHTML = `<small>${esc(label)}</small><b><i class="fa-solid fa-star"></i> It’s time!</b>`; if (!fired && onDone) { fired = true; onDone(); } return; }
    const v = [Math.floor(ms / 864e5), Math.floor(ms / 36e5) % 24, Math.floor(ms / 6e4) % 60, Math.floor(ms / 1e3) % 60], u = ['days', 'hrs', 'min', 'sec'];
    el.innerHTML = `<small><i class="fa-solid fa-calendar-days"></i> ${esc(label)}<br>${esc(end.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }))}</small><div class="t">${v.map((x, i) => `<b>${x}<em>${u[i]}</em></b>`).join('')}</div>`;
    setTimeout(t, 1000);
  })();
}
function confetti() { const c = ['#f5c542', '#b3202f', '#4ee08c', '#6ab7ff', '#fff']; for (let i = 0; i < 90; i++) { const d = document.createElement('i'); d.className = 'cf'; d.style.cssText = `left:${Math.random() * 100}vw;background:${c[i % 5]};--dx:${(Math.random() - .5) * 200}px;animation-duration:${2 + Math.random() * 2.5}s;animation-delay:${Math.random() * .5}s`; document.body.append(d); setTimeout(() => d.remove(), 5500); } }
function decor() {
  const cv = document.createElement('canvas'); cv.id = 'snow'; document.body.prepend(cv); const x = cv.getContext('2d'); let f = [];
  const rs = () => { cv.width = innerWidth; cv.height = innerHeight }; rs(); addEventListener('resize', rs);
  for (let i = 0; i < 80; i++) f.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 1 + Math.random() * 3, s: .3 + Math.random(), d: Math.random() * 6 });
  (function a() { x.clearRect(0, 0, cv.width, cv.height); x.fillStyle = 'rgba(255,255,255,.85)'; f.forEach(p => { p.y += p.s; p.d += .01; p.x += Math.sin(p.d) * .4; if (p.y > cv.height) { p.y = -5; p.x = Math.random() * cv.width } x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill() }); requestAnimationFrame(a) })();
  const l = document.createElement('div'); l.className = 'lights'; l.setAttribute('aria-hidden', 'true'); l.innerHTML = '<i></i>'.repeat(18); document.body.prepend(l);
  const s = document.createElement('i'); s.className = 'sleigh fa-solid fa-sleigh'; s.setAttribute('aria-hidden', 'true'); document.body.append(s);
}
decor();
