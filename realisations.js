(() => {
'use strict';
const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
const buttons=qa('[data-sector]'),panels=qa('[data-sector-panel]');
function sector(id){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sector===id)));panels.forEach(p=>p.hidden=p.dataset.sectorPanel!==id);}
if(buttons.length){buttons.forEach(b=>b.addEventListener('click',()=>sector(b.dataset.sector)));sector(buttons[0].dataset.sector);}
const elem=(t,txt,cls)=>{const e=document.createElement(t);if(txt)e.textContent=txt;if(cls)e.className=cls;return e;};
const link=(txt,href,cls)=>{const a=elem('a',txt,cls);a.href=href;return a;};
const isText=x=>typeof x==='string'&&x.trim().length>0;
const arr=x=>Array.isArray(x)?x.filter(isText):[];
const allowed=['availability','security','services','support','virtualisation','other'];
const valid=x=>x&&/^[a-z0-9][a-z0-9-]{2,70}$/.test(x.id)&&['project','stage'].includes(x.type)&&isText(x.title)&&isText(x.summary)&&isText(x.business)&&isText(x.evidence)&&isText(x.category)&&Array.isArray(x.skills)&&Array.isArray(x.actions)&&Array.isArray(x.technologies);
function card(x){
 const a=elem('article','','portfolio-project catalog-card '+(allowed.includes(x.style)?x.style:'other'));a.id=x.id;
 const left=elem('div','','project-content'),right=elem('div','','project-visual');
 left.append(elem('div',x.category,'project-kicker'),elem('h3',x.title),elem('p',x.summary));
 const skills=elem('div','','skill-list');arr(x.skills).forEach(s=>{const row=elem('div');row.append(elem('span','','skill-marker'),elem('strong',s));skills.append(row);});left.append(skills);
 const tech=elem('div','','project-tech');arr(x.technologies).forEach(t=>tech.append(elem('span',t,'pill')));left.append(tech);
 const actions=elem('div','','actions');actions.append(link('Voir la fiche technique ↗','projets/fiche.html?id='+encodeURIComponent(x.id),'project-link'));left.append(actions);
 right.append(elem('div','APPLICATION EN ENTREPRISE','diagram-caption'),elem('h4',x.business),elem('p',x.evidence));if(isText(x.period))right.append(elem('p',x.period,'diagram-note'));
 a.append(left,right);return a;
}
async function init(){
 const root=q('#catalog-projects'),stage=q('#catalog-stages'),nav=q('#project-index'),total=q('#project-total');if(!root||!stage||!nav||!total)return;
 try{const response=await fetch('data/realisations.json',{cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);const data=await response.json();const items=Array.isArray(data.items)?data.items.filter(valid):[];
 const seen=new Set();for(const x of items){if(seen.has(x.id))continue;seen.add(x.id);
 const existing=document.getElementById(x.id);
 if(existing&&!existing.matches('#projets > article, #catalog-projects > article, #catalog-stages > article'))continue;
 const a=card(x);if(existing){if(x.type!=='project')continue;existing.replaceWith(a);}else (x.type==='project'?root:stage).append(a);
 if(x.type==='project'){let n=qa('a',nav).find(a=>a.getAttribute('href')==='#'+x.id);if(!n){n=link('','#'+x.id,allowed.includes(x.style)?x.style:'other');n.append(elem('span',String(qa('a',nav).length+1).padStart(2,'0')),elem('strong',x.title),elem('small',x.category));nav.append(n);}else{const t=q('strong',n);if(t)t.textContent=x.title;const s=q('small',n);if(s)s.textContent=x.category;}}
 }
 total.textContent=String(qa('#projets article.portfolio-project').length);
 }catch(e){console.warn('Catalogue des réalisations indisponible :',e.message);}
}
init();
})();