(function () {
  function initializeHighFive() {
    var button = document.getElementById('high-five-button');
    var status = document.getElementById('high-five-status');
    var bursts = document.getElementById('high-five-bursts');

    if (!button || !status || !bursts) return;

    button.addEventListener('click', function () {
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
