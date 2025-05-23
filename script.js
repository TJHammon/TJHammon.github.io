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
    restartCoderTyping();
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

  let currentIndex = -1;

  function openLightbox(index) {
    const link = lightboxLinks[index];
    if (!link) return;

    const highRes = link.href;
    const summaryText = link.dataset.summary || 'No summary available.';

    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('lightbox-inner');
    innerWrapper.style.display = 'flex';
    innerWrapper.style.boxShadow = '0 0 80px 40px rgba(255, 255, 255, 0.15)';
    innerWrapper.style.borderRadius = '8px';
    innerWrapper.style.background = '#000';
    innerWrapper.style.maxWidth = '90vw';
    innerWrapper.style.alignItems = 'stretch';
    innerWrapper.style.gap = '0';
    innerWrapper.style.position = 'relative';

    const summaryPanel = document.createElement('div');
    summaryPanel.classList.add('lightbox-summary');
    summaryPanel.style.width = '250px';
    summaryPanel.style.height = 'auto';
    summaryPanel.style.background = '#111';
    summaryPanel.style.color = '#fff';
    summaryPanel.style.padding = '60px 30px 30px 30px';
    summaryPanel.style.display = 'flex';
    summaryPanel.style.flexDirection = 'column';
    summaryPanel.style.justifyContent = 'flex-start';
    summaryPanel.style.borderTopLeftRadius = '8px';
    summaryPanel.style.borderBottomLeftRadius = '8px';
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
    enlarged.style.maxHeight = '90vh';
    enlarged.style.objectFit = 'contain';
    enlarged.style.borderRadius = '8px';
    enlarged.style.boxShadow = '-12px 0 30px rgba(0, 0, 0, 0.5)';

    // Navigation Buttons
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '-50px';
    prevBtn.style.top = '50%';
    prevBtn.style.transform = 'translateY(-50%)';
    prevBtn.style.fontSize = '32px';
    prevBtn.style.background = 'none';
    prevBtn.style.border = 'none';
    prevBtn.style.color = '#fff';
    prevBtn.style.cursor = 'pointer';

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '-50px';
    nextBtn.style.top = '50%';
    nextBtn.style.transform = 'translateY(-50%)';
    nextBtn.style.fontSize = '32px';
    nextBtn.style.background = 'none';
    nextBtn.style.border = 'none';
    nextBtn.style.color = '#fff';
    nextBtn.style.cursor = 'pointer';

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox((currentIndex - 1 + lightboxLinks.length) % lightboxLinks.length);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox((currentIndex + 1) % lightboxLinks.length);
    });

    innerWrapper.appendChild(summaryPanel);
    innerWrapper.appendChild(enlarged);
    innerWrapper.appendChild(prevBtn);
    innerWrapper.appendChild(nextBtn);

    lightboxOverlay.innerHTML = '';
    lightboxOverlay.appendChild(innerWrapper);
    lightboxOverlay.classList.add('active');
    currentIndex = index;
  }

  lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  lightboxOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.lightbox-inner')) {
      lightboxOverlay.classList.remove('active');
      lightboxOverlay.innerHTML = '';
      currentIndex = -1;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        openLightbox((currentIndex - 1 + lightboxLinks.length) % lightboxLinks.length);
      } else if (e.key === 'ArrowRight') {
        openLightbox((currentIndex + 1) % lightboxLinks.length);
      } else if (e.key === 'Escape') {
        lightboxOverlay.classList.remove('active');
        lightboxOverlay.innerHTML = '';
        currentIndex = -1;
      }
    }
  });
});