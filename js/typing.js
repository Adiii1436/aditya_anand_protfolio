/* ═══════════════════════════════════════════
   typing.js — Typewriter animation in the hero
   To change the phrases, edit the PHRASES array below.
   ═══════════════════════════════════════════ */

(function () {
  var PHRASES = [
    'data pipelines.',
    'AI-powered tools.',
    'distributed systems.',
    'LLM-backed apps.',
    'things that scale.'
  ];

  var pi  = 0;   // phrase index
  var ci  = 0;   // character index
  var del = false; // deleting mode

  var tEl = document.getElementById('typed-target');

  function tick() {
    var p = PHRASES[pi];

    if (!del) {
      ci++;
      tEl.textContent = p.slice(0, ci);
      if (ci === p.length) {
        // Pause at full phrase before deleting
        setTimeout(function () { del = true; tick(); }, 2200);
        return;
      }
    } else {
      ci--;
      tEl.textContent = p.slice(0, ci);
      if (ci === 0) {
        del = false;
        pi  = (pi + 1) % PHRASES.length;
      }
    }

    setTimeout(tick, del ? 55 : 85);
  }

  // Small initial delay so the page settles first
  setTimeout(tick, 900);
})();
