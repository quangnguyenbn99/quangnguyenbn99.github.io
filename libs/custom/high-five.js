(function () {
  var INITIAL_HIGH_FIVES = 105;
  var STORAGE_KEY = 'high-five-count';

  function initializeHighFive() {
    var button = document.getElementById('high-five-button');
    var status = document.getElementById('high-five-status');
    var countDisplay = document.getElementById('high-five-count');
    var bursts = document.getElementById('high-five-bursts');

    if (!button || !status || !countDisplay || !bursts) return;

    var count = INITIAL_HIGH_FIVES;
    try {
      var savedCount = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(savedCount) && savedCount >= INITIAL_HIGH_FIVES) {
        count = savedCount;
      }
    } catch (error) {
      // The counter still works for this page view if storage is unavailable.
    }
    countDisplay.textContent = count;

    button.addEventListener('click', function () {
      count += 1;
      countDisplay.textContent = count;
      try {
        window.localStorage.setItem(STORAGE_KEY, count);
      } catch (error) {
        // Keep the updated count visible even if storage is unavailable.
      }

      button.classList.remove('is-celebrating');
      // Restart the hand animation when the button is clicked repeatedly.
      void button.offsetWidth;
      button.classList.add('is-celebrating');
      status.textContent = 'High-five received! Thanks for stopping by! 🙌';

      ['✨', '🎉', '🙌'].forEach(function (emoji, index) {
        var burst = document.createElement('span');
        burst.className = 'high-five__burst';
        burst.textContent = emoji;
        burst.style.setProperty('--drift', (index - 1) * 55 + 'px');
        bursts.appendChild(burst);
        burst.addEventListener('animationend', function () {
          burst.remove();
        });
        window.setTimeout(function () {
          if (burst.parentNode) burst.remove();
        }, 1200);
      });

      window.setTimeout(function () {
        button.classList.remove('is-celebrating');
      }, 600);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHighFive);
  } else {
    initializeHighFive();
  }
})();
