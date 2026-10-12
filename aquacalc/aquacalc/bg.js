/* Scrolling photo background. Reads data-src and data-mode from #bg.
   mode "tile":   image repeats down the page, every other copy mirrored so seams vanish.
   mode "bottom": one image anchored to the bottom of the page, fading into the page colour above. */
(function(){
  const el=document.getElementById("bg");if(!el)return;
  const src=el.dataset.src,mode=el.dataset.mode||"tile",mirror=el.dataset.mirror==="x";
  const img=new Image();let timer;
  function tile(top,h,flip,bottom){
    const t=document.createElement("div");t.className="tile"+(flip?" flip":"")+(mirror?" fx":"");
    t.style.cssText=`${bottom?"bottom:0":"top:"+top+"px"};height:${h}px;background-image:url('${src}')`+
      (bottom?";background-position:center bottom;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 22%);mask-image:linear-gradient(to bottom,transparent,#000 22%)":"");
    el.appendChild(t);
  }
  function build(){
    const w=document.documentElement.clientWidth,vh=window.innerHeight;
    const h=Math.max(document.documentElement.scrollHeight,vh);
    const r=(img.naturalHeight/img.naturalWidth)||.667;
    el.querySelectorAll(".tile").forEach(t=>t.remove());
    if(mode==="bottom"){
      tile(0,Math.min(h,Math.max(w*r,vh)),false,true);
    }else{
      const th=Math.max(w*r,520),n=Math.ceil(h/th);
      for(let i=0;i<n;i++)tile(i*th,th,i%2===1,false);
    }
  }
  const later=()=>{clearTimeout(timer);timer=setTimeout(build,120)};
  img.onload=build;img.onerror=build;img.src=src;
  window.addEventListener("resize",later);
  if("ResizeObserver" in window)new ResizeObserver(later).observe(document.body);
})();
