document.addEventListener('DOMContentLoaded', () => {
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    typingText.classList.add('start');
    let isAnimating = false;
    typingText.addEventListener('mouseenter', () => {
      if (isAnimating) return;
      isAnimating = true;
      typingText.classList.remove('start');
      void typingText.offsetWidth;
      typingText.classList.add('start');
      setTimeout(() => {
        isAnimating = false;
      }, 1300);
    });
  }

  const coder = document.getElementById('coderTitle');
  function restartCoderTyping() {
    coder.classList.remove('typing-coder');
    void coder.offsetWidth;
    coder.classList.add('typing-coder');
  }
if (coder) {
  restartCoderTyping(); // Only run once on initial page load
}

  const tiltWrapper = document.querySelector('.tilt-img');
  const tiltTarget = tiltWrapper?.querySelector('.tilt-target');
  if (tiltWrapper && tiltTarget) {
    tiltWrapper.addEventListener('mousemove', (e) => {
      const rect = tiltWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 10;
      const rotateY = (x - centerX) / 10;
      tiltTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltWrapper.addEventListener('mouseleave', () => {
      tiltTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

const lightboxLinks = document.querySelectorAll('.lightbox-link');
const lightboxOverlay = document.createElement('div');
lightboxOverlay.classList.add('lightbox-overlay');
document.body.appendChild(lightboxOverlay);

lightboxOverlay.addEventListener('click', (e) => {
  if (!e.target.closest('.lightbox-inner')) {
    lightboxOverlay.classList.remove('active');
    lightboxOverlay.innerHTML = '';
  }
});

lightboxLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const highRes = link.href;
    const summaryText = link.dataset.summary || 'No summary available.';

    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('lightbox-inner');
    innerWrapper.style.display = 'flex';
    innerWrapper.style.boxShadow = '0 0 80px 40px rgba(255, 255, 255, 0.15)';
    innerWrapper.style.borderRadius = '8px';
    innerWrapper.style.background = '#000'; // helps glow stand out on dark bg
    innerWrapper.style.maxWidth = '90vw';
    innerWrapper.style.alignItems = 'stretch'; // Match image + summary height
    innerWrapper.style.gap = '0';

    const summaryPanel = document.createElement('div');
    summaryPanel.classList.add('lightbox-summary');
    summaryPanel.style.width = '300px';
    summaryPanel.style.height = 'auto';
    summaryPanel.style.background = '#111';
    summaryPanel.style.color = '#fff';
    summaryPanel.style.padding = '60px 30px 30px 30px'; // top, right, bottom, left
    summaryPanel.style.display = 'flex';
    summaryPanel.style.flexDirection = 'column';
    summaryPanel.style.justifyContent = 'flex-start';
    summaryPanel.style.borderTopLeftRadius = '8px';
    summaryPanel.style.borderBottomLeftRadius = '8px';
    summaryPanel.style.borderTopRightRadius = '0';
    summaryPanel.style.borderBottomRightRadius = '0';
    summaryPanel.style.marginRight = '0';
    summaryPanel.style.fontSize = '14px';
    summaryPanel.style.lineHeight = '1.6';
    summaryPanel.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #5dd39e; line-height: 1.2; font-size: 34px;">
        <div>Project</div>
        <div>Summary</div>
      </h3>
      <p style="margin: 0;">${summaryText}</p>
    `;

    const enlarged = document.createElement('img');
    enlarged.src = highRes;
    enlarged.style.height = 'auto';
    enlarged.style.width = 'auto';
    enlarged.style.maxHeight = '90vh'; // prevents image from being too tall
    enlarged.style.objectFit = 'contain';
    enlarged.style.borderTopLeftRadius = '0';
    enlarged.style.borderBottomLeftRadius = '0';
    enlarged.style.borderTopRightRadius = '8px';
    enlarged.style.borderBottomRightRadius = '8px';

    innerWrapper.appendChild(summaryPanel);
    innerWrapper.appendChild(enlarged);

    lightboxOverlay.innerHTML = '';
    lightboxOverlay.appendChild(innerWrapper);
    lightboxOverlay.classList.add('active');
  });
});
});