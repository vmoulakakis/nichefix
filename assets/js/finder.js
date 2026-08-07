
(function(){
 const P=window.NICHEFIX_PRODUCTS||[];
 const form=document.getElementById('fix-finder'); if(!form)return;
 const out=document.getElementById('finder-results');
 function score(p,o){let s=0;if(p.nicheSlug===o.niche)s+=42;if(p.price<=o.budget)s+=20;else s-=Math.min(30,(p.price-o.budget)/Math.max(o.budget,1)*25);s+=p.organic*.55+p.demand*.28+p.severity*.22+p.competition*.1;if(o.goal==='value')s+=p.grossCommission*.12;if(o.goal==='safe')s+=p.approval*.1+p.confidence*.08;if(o.goal==='search')s+=p.organic*.6+p.competition*.22;if(o.urgency>=4)s+=p.severity*.16;return s;}
 function render(list){out.innerHTML=list.map((p,i)=>`<article class="recommendation"><img loading="lazy" src="${p.preview}" data-fallback="assets/img/${p.nicheSlug}.svg" alt="${p.product} product preview"><div class="pad"><span class="rank-badge">MATCH ${i+1}</span><h3>${p.product}</h3><p>${p.problem}</p><div class="price-row"><span>€${Math.round(p.price).toLocaleString('el-GR')}</span><strong>Organic ${p.organic.toFixed(1)}</strong></div><a class="btn black" style="width:100%;margin-top:12px" href="${p.affiliateUrl}" target="_blank" rel="sponsored nofollow noopener">See product</a></div></article>`).join('');qsaFallback();}
 function qsaFallback(){[...out.querySelectorAll('img[data-fallback]')].forEach(img=>img.addEventListener('error',()=>{img.src=img.dataset.fallback;}));}
 function run(e){if(e)e.preventDefault();const o={niche:form.niche.value,budget:Number(form.budget.value),urgency:Number(form.urgency.value),goal:form.goal.value};const ranked=P.map(p=>({...p,_s:score(p,o)})).sort((a,b)=>b._s-a._s).slice(0,3);render(ranked);}
 form.addEventListener('submit',run);run();
})();
