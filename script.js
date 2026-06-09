/**
 * Abishmi & Shesh Digital Wedding Invitation Logic
 * Highly animated, interactive scratch card, traditional Bansuri flute synthesizer,
 * marigold petal particles, scroll animations, and local storage RSVP caching.
 */

document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ==========================================
  // 1. STATE & CONSTANTS
  // ==========================================
  const TARGET_DATE = new Date('2026-07-01T11:30:00+05:45').getTime(); // Kathmandu Time (Marriage Day)
  let isPlayingMusic = false;

  // Lock scrolling initially during the preloader envelope screen
  document.body.style.overflowY = 'hidden';

  // ==========================================
  // 2. NEPALI ENVELOPE OPENING HANDLER
  // ==========================================
  const envelopeScreen = document.getElementById('envelope-screen');
  const mainWebsite = document.getElementById('main-website');

  // Spawn floating golden particles on the envelope screen
  (function createEnvelopeParticles() {
    const container = document.getElementById('envelope-particles');
    if (!container) return;
    const count = 35;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 8 + Math.random() * 10;
      dot.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(245,228,168,0.9) 0%, rgba(232,197,99,0.4) 100%);
        animation: envelopeParticleFloat ${duration}s ${delay}s linear infinite;
        pointer-events: none;
      `;
      container.appendChild(dot);
    }
    // Inject keyframes for floating particles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes envelopeParticleFloat {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-110vh) translateX(${(Math.random()-0.5)*60}px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  })();

  let hasOpenedEnvelope = false;

  function openEnvelope(e) {
    if (hasOpenedEnvelope) return;
    hasOpenedEnvelope = true;
    e.stopPropagation(); // Avoid duplicate clicks
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Add open class to trigger zoom-in and fade-out transition
    envelopeScreen.classList.add('open');
    
    // Initialize & start background romantic music (user gesture allowed!)
    toggleMusic(true);

    // After animations complete, fade out envelope overlay and show main site
    setTimeout(() => {
      mainWebsite.classList.add('visible');
      
      // Let body scroll
      document.body.style.overflowY = 'auto';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      // Initialize scratch card canvas dimensions once container is visible
      initScratchCard();
    }, 1250);
  }

  envelopeScreen.addEventListener('click', openEnvelope);



  // ==========================================
  // 4. BACKGROUND MUSIC - ROMANTIC WEDDING MUSIC
  // ==========================================
  const floatingControls = document.getElementById('floating-controls');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const bgAudio = document.getElementById('mangal-dhun-audio');

  function toggleMusic(forcePlay = null) {
    const shouldPlay = (forcePlay !== null) ? forcePlay : !isPlayingMusic;
    if (shouldPlay) {
      bgAudio.play().then(() => {
        isPlayingMusic = true;
        musicToggleBtn.classList.add('playing');
      }).catch(err => {
        console.log("Audio play blocked until interaction:", err);
      });
    } else {
      bgAudio.pause();
      isPlayingMusic = false;
      musicToggleBtn.classList.remove('playing');
    }
  }

  musicToggleBtn.addEventListener('click', () => {
    if (floatingControls && floatingControls.dataset.dragging === 'true') return;
    toggleMusic();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (floatingControls && floatingControls.dataset.dragging === 'true') return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 420);
    }, { passive: true });
  }

  if (floatingControls) {
    localStorage.removeItem('abishmi_shesh_controls_position');
    floatingControls.dataset.dragging = 'false';
  }

  // ==========================================
  // 5. FLOATING MARIGOLD (SAYAPATRI) CANVAS FLOWERS
  // ==========================================
  const pCanvas = document.getElementById('particles-canvas');
  const pCtx = pCanvas.getContext('2d');
  let animationFrameId = null;
  let marigoldPetals = [];

  function resizeParticlesCanvas() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeParticlesCanvas);
  resizeParticlesCanvas();

  class MarigoldPetal {
    constructor() {
      this.reset();
      this.y = Math.random() * pCanvas.height; // Spread initially
    }
    reset() {
      this.x = Math.random() * pCanvas.width;
      this.y = Math.random() * -60 - 20;
      this.size = 5 + Math.random() * 7;
      this.speedY = 0.8 + Math.random() * 1.2;
      this.speedX = Math.sin(Math.random()) * 0.4;
      this.angle = Math.random() * 360;
      this.spinSpeed = 0.4 + Math.random() * 0.8;
      // Rich shades of marigold orange and gold yellows
      const colors = ['#ff9f1c', '#ffbf00', '#ffd166', '#ff8c00', '#ff4500'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 0.5 + Math.random() * 0.5;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y / 25) * 0.4;
      this.angle += this.spinSpeed;
      if (this.y > pCanvas.height + 20) {
        this.reset();
      }
    }
    draw() {
      pCtx.save();
      pCtx.translate(this.x, this.y);
      pCtx.rotate((this.angle * Math.PI) / 180);
      pCtx.fillStyle = this.color;
      pCtx.globalAlpha = this.opacity;
      
      // Draw organic teardrop leaf/petal
      pCtx.beginPath();
      pCtx.moveTo(0, 0);
      pCtx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
      pCtx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
      pCtx.fill();
      pCtx.restore();
    }
  }

  function initMarigolds() {
    marigoldPetals = [];
    const maxPetals = window.innerWidth < 768 ? 18 : 36;
    for (let i = 0; i < maxPetals; i++) {
      marigoldPetals.push(new MarigoldPetal());
    }
  }

  function animateMarigolds() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    marigoldPetals.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animateMarigolds);
  }

  initMarigolds();
  animateMarigolds();

  // ==========================================
  // 6. INTERACTIVE SCRATCH CARD LOGIC
  // ==========================================
  const scratchCanvas = document.getElementById('scratch-canvas-el');
  const scratchHint = document.getElementById('scratch-hint');
  let scratchCtx = null;
  let isScratching = false;
  let canvasDrawn = false;

  function initScratchCard() {
    if (!scratchCanvas || canvasDrawn) return;
    
    // Set proper canvas size matching bounds with fallbacks
    const rect = scratchCanvas.parentNode.getBoundingClientRect();
    const w = rect.width > 0 ? rect.width : 390;
    const h = rect.height > 0 ? rect.height : 156;
    scratchCanvas.width = w;
    scratchCanvas.height = h;
    
    scratchCtx = scratchCanvas.getContext('2d');
    
    // Draw Elegant Gold foil layer
    const goldGrad = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    goldGrad.addColorStop(0, '#c5a059');
    goldGrad.addColorStop(0.5, '#e0c38c');
    goldGrad.addColorStop(1, '#ae843b');
    scratchCtx.fillStyle = goldGrad;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Draw sophisticated traditional Mandala circle outlines on the scratch layer
    scratchCtx.strokeStyle = 'rgba(64, 48, 16, 0.2)';
    scratchCtx.lineWidth = 1;
    
    const cx = scratchCanvas.width / 2;
    const cy = scratchCanvas.height / 2;
    
    // Mandala nested circles
    scratchCtx.beginPath();
    scratchCtx.arc(cx, cy, 50, 0, Math.PI * 2);
    scratchCtx.stroke();
    scratchCtx.beginPath();
    scratchCtx.arc(cx, cy, 32, 0, Math.PI * 2);
    scratchCtx.stroke();
    scratchCtx.beginPath();
    scratchCtx.arc(cx, cy, 15, 0, Math.PI * 2);
    scratchCtx.stroke();
    
    // Radial spokes starting from radius 15px to 60px
    scratchCtx.beginPath();
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      scratchCtx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 15);
      scratchCtx.lineTo(cx + Math.cos(angle) * 60, cy + Math.sin(angle) * 60);
    }
    scratchCtx.stroke();

    // Elegant text indicators
    scratchCtx.fillStyle = '#4e3502';
    scratchCtx.textAlign = 'center';
    scratchCtx.font = "600 10px 'Montserrat'";
    scratchCtx.fillText("SCRATCH TO REVEAL", cx, cy - 34);
    scratchCtx.font = "italic 18px 'Cormorant Garamond'";
    scratchCtx.fillText("Abishmi & Shesh", cx, cy + 6);
    scratchCtx.font = "600 10px 'Montserrat'";
    scratchCtx.fillText("JULY 2026", cx, cy + 40);

    canvasDrawn = true;
    setupScratchEvents();
  }

  function setupScratchEvents() {
    function getMousePos(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function scratch(e) {
      if (!isScratching || !scratchCtx) return;
      e.preventDefault();
      
      const pos = getMousePos(e);
      scratchCtx.globalCompositeOperation = 'destination-out';
      scratchCtx.beginPath();
      scratchCtx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      scratchCtx.fill();
      
      checkScratchPercentage();
    }

    function startScratch(e) {
      isScratching = true;
      scratch(e);
    }

    function endScratch() {
      isScratching = false;
    }

    // Bind event listeners
    scratchCanvas.addEventListener('mousedown', startScratch);
    scratchCanvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', endScratch);

    scratchCanvas.addEventListener('touchstart', startScratch);
    scratchCanvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', endScratch);
  }

  // Optimize evaluation by sampling every 30th pixel
  function checkScratchPercentage() {
    const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imgData.data;
    let transparent = 0;
    const step = 30; // Sample step size
    let totalSamples = 0;

    for (let i = 3; i < pixels.length; i += 4 * step) {
      totalSamples++;
      if (pixels[i] === 0) {
        transparent++;
      }
    }

    const percentage = transparent / totalSamples;
    
    // Once scratched 45%, fade out the foil to reveal content
    if (percentage > 0.45) {
      scratchCanvas.classList.add('fade-out');
      scratchHint.style.opacity = '0';
      
      // Release memory once canvas fades out
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
        scratchHint.style.display = 'none';
      }, 600);
    }
  }

  const calBtns = document.querySelectorAll('.calendar-add-btn');
  calBtns.forEach(calBtn => {
    calBtn.addEventListener('click', () => {
      const summary = "Abishmi & Shesh's Wedding Ceremonies";
      const details = "Together with their families, Mr. Nawashi Shah, Ms. Saradha Devi Shah, Mr. Kamal Kumar Neupane, and Ms. Sirana Neupane request the pleasure of your company to celebrate the wedding of Abishmi and Shesh in Kathmandu. Marriage ceremony: July 1 at 11:30 AM. Reception: July 3 at 6:30 PM.";
      const location = "Maxims Banquet & Events and Buddha Palace, Kathmandu, Nepal";
      const startStr = "20260701T054500Z"; // July 1, 2026 11:30 AM NPT in UTC
      const endStr = "20260703T124500Z";   // July 3, 2026 6:30 PM NPT in UTC
      
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      window.open(calUrl, '_blank');
    });
  });

  // ==========================================
  // 8. COUNTDOWN TIMER CALCULATIONS
  // ==========================================
  const daysVal = document.getElementById('days-val');
  const hoursVal = document.getElementById('hours-val');
  const minutesVal = document.getElementById('minutes-val');
  const secondsVal = document.getElementById('seconds-val');

  function updateCountdown() {
    if (!daysVal || !hoursVal || !minutesVal || !secondsVal) return;
    
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    
    if (distance < 0) {
      // Event has started
      daysVal.textContent = "00";
      hoursVal.textContent = "00";
      minutesVal.textContent = "00";
      secondsVal.textContent = "00";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysVal.textContent = String(days).padStart(2, '0');
    hoursVal.textContent = String(hours).padStart(2, '0');
    minutesVal.textContent = String(minutes).padStart(2, '0');
    secondsVal.textContent = String(seconds).padStart(2, '0');
  }

  if (daysVal && hoursVal && minutesVal && secondsVal) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // ==========================================
  // 9. SCROLL REVEAL (INTERSECTION OBSERVER FALLBACK)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 11. RSVP FORM HANDLING & STORAGE
  // ==========================================
  const rsvpForm = document.getElementById('wedding-rsvp-form');
  const successScreen = document.getElementById('rsvp-success-screen');
  const resetRsvpBtn = document.getElementById('reset-rsvp-btn');

  // Load prior RSVP details from LocalStorage if cache exists
  const cachedRsvp = localStorage.getItem('abishmi_shesh_rsvp');
  if (cachedRsvp) {
    const data = JSON.parse(cachedRsvp);
    
    // Pre-fill inputs
    document.getElementById('guest-fullname').value = data.fullname || '';
    document.getElementById('guest-notes').value = data.notes || '';
    
    // Display Success Screen directly
    successScreen.classList.add('active');
  }

  // RSVP Form submission handler
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const rsvpDetails = {
      fullname: formData.get('fullname'),
      notes: formData.get('notes') || '',
      submitted_at: new Date().toISOString()
    };

    // Save to LocalStorage cache
    localStorage.setItem('abishmi_shesh_rsvp', JSON.stringify(rsvpDetails));

    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalSubmitText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending RSVP...';
    }

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpDetails)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to send RSVP right now.');
      }

      // Display custom animated overlay success screen
      successScreen.classList.add('active');

      // Trigger explosive heart/sparkle particles
      triggerCelebratorySparks();
    } catch (error) {
      alert(error.message || 'Unable to send RSVP right now. Please try again later.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalSubmitText;
      }
    }
  });

  // Modify form inputs
  resetRsvpBtn.addEventListener('click', () => {
    successScreen.classList.remove('active');
  });

  // ==========================================
  // 12. CELEBRATORY SPARKS / HEARTS SYSTEM
  // ==========================================
  class SparkParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 4.5;
      
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.2; // slight upward drift
      this.gravity = 0.07;
      this.alpha = 1.0;
      this.decay = 0.014 + Math.random() * 0.018;
      this.size = 3 + Math.random() * 5;
      
      // Color variety: gold, slate-blue, orange, crimson red
      const colors = ['#c5a059', '#e0c38c', '#1b2e3c', '#ff9f1c', '#9e2a2b'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isHeart = Math.random() < 0.35;
    }
    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      if (this.alpha <= 0) return;
      pCtx.save();
      pCtx.globalAlpha = this.alpha;
      pCtx.fillStyle = this.color;

      if (this.isHeart) {
        // Draw miniature heart
        pCtx.beginPath();
        const d = this.size;
        pCtx.moveTo(this.x, this.y + d / 4);
        pCtx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
        pCtx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
        pCtx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
        pCtx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
        pCtx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
        pCtx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
        pCtx.fill();
      } else {
        // Draw round sparkle circle
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        pCtx.fill();
      }
      pCtx.restore();
    }
  }

  let activeExplosions = [];
  let isExploding = false;

  function triggerCelebratorySparks() {
    activeExplosions = [];
    const sx = pCanvas.width / 2;
    const sy = pCanvas.height / 2;

    // Generate 100 energetic particles
    for (let i = 0; i < 100; i++) {
      activeExplosions.push(new SparkParticle(sx, sy));
    }

    if (!isExploding) {
      isExploding = true;
      runExplosionFrame();
    }
  }

  function runExplosionFrame() {
    if (activeExplosions.length === 0) {
      isExploding = false;
      return;
    }

    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    
    // Draw basic background falling petals
    marigoldPetals.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw active sparkles
    for (let i = activeExplosions.length - 1; i >= 0; i--) {
      const sp = activeExplosions[i];
      sp.update();
      sp.draw();
      
      if (sp.alpha <= 0) {
        activeExplosions.splice(i, 1);
      }
    }
    requestAnimationFrame(runExplosionFrame);
  }

});
