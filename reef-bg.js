/* reef-bg.js  -  plankton particles + gentle parallax for the reef background */
(function () {
  var root = document.querySelector('.reef-bg');
  if (!root) return;
  var canvas = root.querySelector('.reef-bg__canvas');
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colours sampled from the photo: cyan coral, pink tips, amber specks
  var COLOURS = ['120,210,255', '255,150,195', '255,205,130'];
  var W, H, dpr, dots = [], raf = null;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);       // cap for performance
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(90, Math.max(35, (W * H) / 20000)));
    dots = [];
    for (var i = 0; i < count; i++) dots.push(make(true));
  }
  function make(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: 0.6 + Math.random() * 1.8,                          // radius px
      v: 6 + Math.random() * 14,                             // rise speed px/sec
      sway: 8 + Math.random() * 22,                          // side-to-side px
      ph: Math.random() * Math.PI * 2,
      tw: 0.4 + Math.random() * 1.2,                         // twinkle speed
      c: COLOURS[(Math.random() * COLOURS.length) | 0]
    };
  }

  var last = 0;
  function frame(t) {
    var dt = Math.min((t - last) / 1000 || 0, 0.05); last = t;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      d.y -= d.v * dt;
      d.ph += d.tw * dt;
      var x = d.x + Math.sin(d.ph) * d.sway;
      if (d.y < -10) dots[i] = make(false);
      var a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(d.ph * 2.3));
      var g = ctx.createRadialGradient(x, d.y, 0, x, d.y, d.r * 4);
      g.addColorStop(0, 'rgba(' + d.c + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + d.c + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, d.y, d.r * 4, 0, 6.2832); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function stop()  { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  size();
  if (!reduce) start();
  window.addEventListener('resize', size);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  // Parallax: background shifts a few pixels opposite to pointer / scroll
  if (!reduce) {
    window.addEventListener('pointermove', function (e) {
      root.style.setProperty('--px', (e.clientX / window.innerWidth * 2 - 1).toFixed(3));
      root.style.setProperty('--py', (e.clientY / window.innerHeight * 2 - 1).toFixed(3));
    }, { passive: true });
  }
})();
