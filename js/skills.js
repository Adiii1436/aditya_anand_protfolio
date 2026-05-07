/* ═══════════════════════════════════════════
   skills.js — Skills section category filter
   Clicking a tab shows only tags in that category.
   ═══════════════════════════════════════════ */

(function () {

  var tabs = document.querySelectorAll('.sk-tab[data-cat]');
  var tags = document.querySelectorAll('.sk-tag[data-cat]');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('on'); });
      tab.classList.add('on');

      var cat = tab.dataset.cat;

      // Show / hide / highlight tags
      tags.forEach(function (tag) {
        tag.classList.remove('on', 'off');

        if (cat !== 'all') {
          if (tag.dataset.cat === cat) {
            tag.classList.add('on');
          } else {
            tag.classList.add('off');
          }
        }
        // cat === 'all': no extra class → all tags show at default opacity
      });
    });
  });

})();
