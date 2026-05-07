/* ═══════════════════════════════════════════
   tweaks.js — Floating theme tweaks panel
   Controls accent color and card fill style.
   ═══════════════════════════════════════════ */

(function () {

  var panel   = document.getElementById('tweaks-panel');
  var cFilled = document.getElementById('card-filled');
  var cOutline= document.getElementById('card-outline');

  /* ── EDIT-MODE BRIDGE ────────────────────
     The panel is hidden by default and only shown
     when a parent frame sends __activate_edit_mode. */
  window.addEventListener('message', function (e) {
    if (!e.data) return;
    if (e.data.type === '__activate_edit_mode')   panel.style.display = 'flex';
    if (e.data.type === '__deactivate_edit_mode') panel.style.display = 'none';
  });

  if (window.parent !== window) {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  }

  /* ── ACCENT COLOR ────────────────────────
     Updates the --accent CSS variable and notifies
     the parent frame about the change.            */
  function setAccent(color, swatchId) {
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--adim',   color + '1a');
    document.documentElement.style.setProperty('--ablur',  color + '33');

    document.querySelectorAll('.tw-swatch').forEach(function (s) {
      s.classList.remove('sel');
    });
    document.getElementById(swatchId).classList.add('sel');

    if (window.parent !== window) {
      window.parent.postMessage(
        { type: '__edit_mode_set_keys', edits: { accentColor: color } }, '*'
      );
    }
  }

  document.getElementById('sw-amber') .addEventListener('click', function () { setAccent('#f0904a', 'sw-amber');  });
  document.getElementById('sw-blue')  .addEventListener('click', function () { setAccent('#5ba3e8', 'sw-blue');   });
  document.getElementById('sw-green') .addEventListener('click', function () { setAccent('#3ecf8e', 'sw-green');  });
  document.getElementById('sw-violet').addEventListener('click', function () { setAccent('#a78bfa', 'sw-violet'); });

  /* ── CARD STYLE ──────────────────────────
     Toggles between filled (bg2) and outline
     (transparent background) for all cards.      */
  function setCardStyle(style) {
    cFilled .classList.toggle('on', style === 'filled');
    cOutline.classList.toggle('on', style === 'outline');

    document.querySelectorAll('.proj-card, .cert-card, .edu-card').forEach(function (c) {
      c.style.background = (style === 'outline') ? 'transparent' : '';
    });

    if (window.parent !== window) {
      window.parent.postMessage(
        { type: '__edit_mode_set_keys', edits: { cardStyle: style } }, '*'
      );
    }
  }

  cFilled .addEventListener('click', function () { setCardStyle('filled');  });
  cOutline.addEventListener('click', function () { setCardStyle('outline'); });

  /* ── CLOSE BUTTON ────────────────────────*/
  document.getElementById('tw-close').addEventListener('click', function () {
    panel.style.display = 'none';
    if (window.parent !== window) {
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    }
  });

})();
