/* Drifting blue spotted jellyfish background for the homepage */
(function(){
  const sea=document.getElementById("sea");if(!sea)return;
  let seed=11;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};

  const spots=[[30,28,5],[50,20,6],[70,28,5],[20,42,4],[40,38,5],[60,40,5],[80,42,4],[30,54,4],[50,52,5],[70,54,4],[14,55,3],[86,55,3],[50,34,3]]
    .map(s=>`<circle cx="${s[0]}" cy="${s[1]}" r="${s[2]}" fill="rgba(215,238,255,.45)" stroke="rgba(255,255,255,.65)" stroke-width=".8"/>`).join("");

  sea.insertAdjacentHTML("afterbegin",`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <radialGradient id="jb" cx="50%" cy="22%" r="85%"><stop offset="0" stop-color="#b4dbff" stop-opacity=".55"/><stop offset=".55" stop-color="#4a8df0" stop-opacity=".3"/><stop offset="1" stop-color="#1b4fb0" stop-opacity=".12"/></radialGradient>
  <symbol id="jelly" viewBox="0 0 100 150" overflow="visible">
    <g fill="none" stroke-linecap="round">
      <path d="M26 66c-7 13 7 22 0 38s-5 26 0 38" stroke="#7fb6ff" stroke-opacity=".4" stroke-width="1.2"/>
      <path d="M40 66c-7 15 7 26 0 44s-5 28 0 36" stroke="#7fb6ff" stroke-opacity=".35" stroke-width="1.1"/>
      <path d="M60 66c7 15-7 26 0 44s5 28 0 36" stroke="#7fb6ff" stroke-opacity=".35" stroke-width="1.1"/>
      <path d="M74 66c7 13-7 22 0 38s5 26 0 38" stroke="#7fb6ff" stroke-opacity=".4" stroke-width="1.2"/>
      <path d="M36 66c5 11-5 16 0 28M48 66c4 14-4 18 0 32M58 66c5 11-5 16 0 28M68 66c4 9-4 13 0 22" stroke="#a9d3ff" stroke-opacity=".55" stroke-width="3.2"/>
    </g>
    <path d="M6 58C6 26 26 6 50 6s44 20 44 52c0 5-4 8-9 8H15c-5 0-9-3-9-8z" fill="url(#jb)" stroke="#a8d2ff" stroke-opacity=".75" stroke-width="1.2"/>
    ${spots}
  </symbol></defs></svg>`);

  const N=[260,200,150,125,105,92,76,64,220,135,84,58];
  N.forEach((w,i)=>{
    const d=(w-58)/202;                        // 0 small/far, 1 big/near
    const j=document.createElement("div");j.className="j";
    const left=rnd()*96,top=-4+rnd()*92;
    j.style.cssText=`width:${w}px;left:${left}%;top:${top}%;opacity:${(.28+.4*(1-Math.abs(d-.45))).toFixed(2)};`+
      `filter:blur(${d>.7?3.2:d<.25?1.6:0}px);--dx:${Math.round((rnd()-.5)*140)}px;--dy:${-Math.round(60+rnd()*160)}px;`+
      `animation-duration:${(20+rnd()*22).toFixed(1)}s;animation-delay:${(-rnd()*30).toFixed(1)}s`;
    j.innerHTML=`<svg viewBox="0 0 100 150" style="animation-duration:${(3.2+rnd()*1.8).toFixed(2)}s;animation-delay:${(-rnd()*4).toFixed(2)}s"><use href="#jelly"/></svg>`;
    sea.appendChild(j);
  });
  for(let i=0;i<46;i++){
    const s=document.createElement("i");s.className="s";const z=1+rnd()*2.2;
    s.style.cssText=`left:${(rnd()*100).toFixed(1)}%;top:${(rnd()*100).toFixed(1)}%;width:${z}px;height:${z}px;animation-duration:${(26+rnd()*40).toFixed(1)}s;animation-delay:${(-rnd()*40).toFixed(1)}s`;
    sea.appendChild(s);
  }
})();
