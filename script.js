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
      const rotateX = (centerY - y) / 5;
      const rotateY = (x - centerX) / 5;
      tiltTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltWrapper.addEventListener('mouseleave', () => {
      tiltTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

if (tiltTarget) {
  tiltTarget.addEventListener('click', () => {
    tiltWrapper.style.pointerEvents = 'none';
    
    tiltTarget.classList.remove('spin'); 
    void tiltTarget.offsetWidth;         
    tiltTarget.classList.add('spin');

    setTimeout(() => {
      tiltWrapper.style.pointerEvents = '';
    }, 1500); // match animation duration
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
    prevBtn.style.left = (window.innerWidth < 640 ? '10px' : '-50px');
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
    nextBtn.style.right = (window.innerWidth < 640 ? '10px' : '-50px');
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(function() {
        alert("Message sent successfully!");
        form.reset();
      }, function(error) {
        alert("Failed to send message: " + JSON.stringify(error));
      });
  });
});

// === Testimonial slider (seamless + reliable wrap) ===
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonialTrack");
  if (!track || track.dataset.inited === "true") return;
  track.dataset.inited = "true";

  const prevBtn  = document.querySelector(".ts-prev");
  const nextBtn  = document.querySelector(".ts-next");
  const dotsWrap = document.getElementById("tsDots");

  const originals = Array.from(track.querySelectorAll(".testimonial-card"));
  const n = originals.length;
  if (!n) return;

  // Build dots (real slides only)
  dotsWrap.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goToReal(i + 1));
    dotsWrap.appendChild(b);
  }

  // Clone ends: [lastClone, ...originals, firstClone]
  const firstClone = originals[0].cloneNode(true);
  const lastClone  = originals[n - 1].cloneNode(true);
  track.insertBefore(lastClone, track.firstChild);
  track.appendChild(firstClone);

  // Augmented index: 0..n+1, start at 1 (first REAL)
  let idx = 1;

  // Helpers that respect track padding + card gap
  const GAP        = () => parseFloat(getComputedStyle(track).gap || "24");
  const LEFT_PAD   = () => parseFloat(getComputedStyle(track).paddingLeft || "0");
  const CARD_W     = () => originals[0].offsetWidth + GAP();
  const POS_FOR    = (i) => LEFT_PAD() + i * CARD_W();
  const MAX_LEFT   = () => track.scrollWidth - track.clientWidth;

  let animating = false;

  // Jump without animation
  function jumpTo(i) {
  // Temporarily disable smooth scrolling so the wrap is invisible
  const prev = track.style.scrollBehavior;
  track.style.scrollBehavior = 'auto';
  animating = false;
  track.scrollLeft = Math.min(POS_FOR(i), MAX_LEFT());

  // Restore whatever was there (usually empty -> falls back to CSS)
  // Do it in the next tick so the browser applies the instant jump first.
  requestAnimationFrame(() => {
    track.style.scrollBehavior = prev || '';
  });
}

  // Smooth scroll
  function scrollToIdx(i) {
    animating = true;
    track.scrollTo({ left: Math.min(POS_FOR(i), MAX_LEFT()), behavior: "smooth" });
  }

  function realIndex() {
    if (idx === 0) return n;
    if (idx === n + 1) return 1;
    return idx;
  }

  function updateDots() {
    const real = realIndex();
    [...dotsWrap.children].forEach((d, i) =>
      d.setAttribute("aria-current", i + 1 === real ? "true" : "false")
    );
  }

  // Public: go to REAL slide (1..n)
  function goToReal(realTarget) {
    idx = realTarget;
    scrollToIdx(idx);
    settleAfterScroll();
  }

  // Arrow clicks — explicitly handle wraps so we don’t rely on scroll rounding
  prevBtn?.addEventListener("click", () => {
    if (idx === 1) {
      idx = 0;               // left clone
    } else {
      idx -= 1;
    }
    scrollToIdx(idx);
    settleAfterScroll();
  });

  nextBtn?.addEventListener("click", () => {
    if (idx === n) {
      idx = n + 1;           // right clone
    } else {
      idx += 1;
    }
    scrollToIdx(idx);
    settleAfterScroll();
  });

  // During animation/drag, keep dots in sync — but ignore while animating
  let rafLock = false;
  track.addEventListener("scroll", () => {
    if (animating) return;          // <— guard: don’t overwrite idx mid-anim
    if (rafLock) return;
    rafLock = true;
    requestAnimationFrame(() => {
      const i = Math.round((track.scrollLeft - LEFT_PAD()) / CARD_W());
      if (i !== idx) { idx = i; updateDots(); }
      rafLock = false;
    });
  });

  // After animation finishes, snap clones → real slides invisibly
  let settleTimer;
  function settleAfterScroll() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      if (idx === 0)      { idx = n; jumpTo(idx); }
      else if (idx === n + 1) { idx = 1; jumpTo(idx); }
      animating = false;
      updateDots();
    }, 220); // a hair longer to outlast smooth-scroll timing
  }

  // Keyboard
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn?.click();
    if (e.key === "ArrowLeft")  prevBtn?.click();
  });

  // Init
  jumpTo(idx);
  updateDots();
  window.addEventListener("resize", () => jumpTo(idx));
});





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => { alert("Message sent successfully!"); form.reset(); })
        .catch((error) => alert("Failed to send message: " + JSON.stringify(error)));
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form2 = document.getElementById("contactForm2");
  if (form2) {
    form2.addEventListener("submit", function (event) {
      event.preventDefault();
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => { alert("Message sent successfully!"); form2.reset(); })
        .catch((error) => alert("Failed to send message: " + JSON.stringify(error)));
    });
  }
});