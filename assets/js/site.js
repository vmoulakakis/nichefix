
(function(){
 const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
 qsa('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{if(img.dataset.didFallback)return;img.dataset.didFallback='1';img.src=img.dataset.fallback;}));
 const year=qs('[data-year]'); if(year) year.textContent=new Date().getFullYear();
 qsa('[data-save]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.save;const saved=new Set(JSON.parse(localStorage.getItem('nichefix-saved')||'[]'));saved.has(id)?saved.delete(id):saved.add(id);localStorage.setItem('nichefix-saved',JSON.stringify([...saved]));btn.textContent=saved.has(id)?'Saved ✓':'Save';}));
})();
