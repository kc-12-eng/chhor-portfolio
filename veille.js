(() => {
'use strict';
const list=document.querySelector('#veille-items'),status=document.querySelector('#veille-status'),count=document.querySelector('#veille-count'),refresh=document.querySelector('#veille-refresh'),read=document.querySelector('#veille-read'),filters=[...document.querySelectorAll('[data-veille-filter]')];
if(!list||!status||!count||!refresh||!read)return;
let items=[], filter='all',updated='',busy=false;
const key='chhor-veille-read-v1';
let seen=new Set();try{seen=new Set(JSON.parse(localStorage.getItem(key)||'[]'));}catch{}
const id=x=>x.url;
const safeURL=s=>{try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}};
const el=(tag,content,cls)=>{const node=document.createElement(tag);if(content)node.textContent=content;if(cls)node.className=cls;return node;};
function render(){
 const fresh=items.filter(x=>!seen.has(id(x))).length;count.textContent=fresh?fresh+' nouvelle'+(fresh>1?'s':'')+' information'+(fresh>1?'s':''):'À jour';
 list.replaceChildren(); const selected=items.filter(x=>filter==='all'||x.kind===filter);
 if(!selected.length){list.append(el('p','Aucune information dans ce filtre.'));return;}
 for(const x of selected){const article=el('article','','live-item');const badge=el('span',x.kind,'tag');article.append(badge);if(!seen.has(id(x)))article.append(el('span','● Nouveau','live-new'));
 article.append(el('h4',x.title),el('p',x.source+' · Repéré le '+new Date(x.date+'T12:00:00').toLocaleDateString('fr-FR'),'live-status'),el('p',x.summary));
 const a=el('a','Lire la source originale ↗');a.href=x.url;a.target='_blank';a.rel='noopener noreferrer';article.append(a);list.append(article);}
}
function save(){try{localStorage.setItem(key,JSON.stringify([...seen].slice(-1000)));}catch{}}
filters.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.veilleFilter;filters.forEach(z=>z.setAttribute('aria-pressed',String(z===b)));render();}));
read.addEventListener('click',()=>{items.forEach(x=>seen.add(id(x)));save();render();});
async function load(){if(busy)return;busy=true;refresh.disabled=true;try{
 const response=await fetch('./data/veille.json',{cache:'no-store'});if(!response.ok)throw new Error('HTTP '+response.status);
 const data=await response.json();if(!Array.isArray(data.items))throw new Error('Format inattendu');
 updated=String(data.updated||'');items=data.items.filter(x=>x&&['PUSH','PULL'].includes(x.kind)&&safeURL(x.url)&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&['title','summary','source'].every(k=>typeof x[k]==='string')).map(x=>({...x,url:safeURL(x.url)})).sort((a,b)=>b.date.localeCompare(a.date));
 status.textContent='Dernière collecte : '+(/^\d{4}-\d{2}-\d{2}$/.test(updated)?new Date(updated+'T12:00:00').toLocaleDateString('fr-FR'):'date non disponible')+' · '+items.length+' information(s).';render();
 }catch(e){status.textContent='Flux temporairement indisponible. Réessaie avec Actualiser.';if(!items.length)count.textContent='Indisponible';}finally{busy=false;refresh.disabled=false;}}
 refresh.addEventListener('click',load);load();setInterval(()=>{if(!document.hidden)load();},300000);
})();
