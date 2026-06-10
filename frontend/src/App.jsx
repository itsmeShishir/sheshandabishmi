import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Music,
  ArrowUp,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  User,
  Mail,
  Users,
  Utensils,
  CheckSquare,
  Bus,
  Heart,
  MessageSquare,
  Info,
  Map,
  PartyPopper
} from 'lucide-react';

// ==========================================
// 1. MARIGOLD & SPARKS CANVAS COMPONENT
// ==========================================
const MarigoldParticles = ({ rsvpSuccess }) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const particlesRef = useRef({ petals: [], sparks: [] });
  const prevRsvpSuccessRef = useRef(rsvpSuccess);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Petal class simulation
    class MarigoldPetal {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -60 - 20;
        this.size = 5 + Math.random() * 7;
        this.speedY = 0.8 + Math.random() * 1.2;
        this.speedX = Math.sin(Math.random()) * 0.4;
        this.angle = Math.random() * 360;
        this.spinSpeed = 0.4 + Math.random() * 0.8;
        const colors = ['#ff9f1c', '#ffbf00', '#ffd166', '#ff8c00', '#ff4500'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 0.5 + Math.random() * 0.5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 25) * 0.4;
        this.angle += this.spinSpeed;
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }
      draw(cCtx) {
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate((this.angle * Math.PI) / 180);
        cCtx.fillStyle = this.color;
        cCtx.globalAlpha = this.opacity;
        cCtx.beginPath();
        cCtx.moveTo(0, 0);
        cCtx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
        cCtx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
        cCtx.fill();
        cCtx.restore();
      }
    }

    // Spark Particle class simulation
    class SparkParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 4.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.2;
        this.gravity = 0.07;
        this.alpha = 1.0;
        this.decay = 0.014 + Math.random() * 0.018;
        this.size = 3 + Math.random() * 5;
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
      draw(cCtx) {
        if (this.alpha <= 0) return;
        cCtx.save();
        cCtx.globalAlpha = this.alpha;
        cCtx.fillStyle = this.color;
        if (this.isHeart) {
          cCtx.beginPath();
          const d = this.size;
          cCtx.moveTo(this.x, this.y + d / 4);
          cCtx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
          cCtx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
          cCtx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
          cCtx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
          cCtx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
          cCtx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
          cCtx.fill();
        } else {
          cCtx.beginPath();
          cCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          cCtx.fill();
        }
        cCtx.restore();
      }
    }

    // Initialize petals
    const maxPetals = window.innerWidth < 768 ? 18 : 36;
    const tempPetals = [];
    for (let i = 0; i < maxPetals; i++) {
      tempPetals.push(new MarigoldPetal());
    }
    particlesRef.current.petals = tempPetals;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw petals
      particlesRef.current.petals.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Draw active sparks
      for (let i = particlesRef.current.sparks.length - 1; i >= 0; i--) {
        const sp = particlesRef.current.sparks[i];
        sp.update();
        sp.draw(ctx);
        if (sp.alpha <= 0) {
          particlesRef.current.sparks.splice(i, 1);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  // Listen for rsvpSuccess triggers to spawn explosions
  useEffect(() => {
    if (rsvpSuccess && !prevRsvpSuccessRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const sx = canvas.width / 2;
        const sy = canvas.height / 2;
        const tempSparks = [];
        // Spawn 100 spark particles
        for (let i = 0; i < 100; i++) {
          // Import SparkParticle internally or reference class
          class SparkParticle {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              const angle = Math.random() * Math.PI * 2;
              const speed = 1.8 + Math.random() * 4.5;
              this.vx = Math.cos(angle) * speed;
              this.vy = Math.sin(angle) * speed - 1.2;
              this.gravity = 0.07;
              this.alpha = 1.0;
              this.decay = 0.014 + Math.random() * 0.018;
              this.size = 3 + Math.random() * 5;
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
            draw(cCtx) {
              if (this.alpha <= 0) return;
              cCtx.save();
              cCtx.globalAlpha = this.alpha;
              cCtx.fillStyle = this.color;
              if (this.isHeart) {
                cCtx.beginPath();
                const d = this.size;
                cCtx.moveTo(this.x, this.y + d / 4);
                cCtx.quadraticCurveTo(this.x, this.y, this.x - d / 2, this.y);
                cCtx.quadraticCurveTo(this.x - d, this.y, this.x - d, this.y + d / 2);
                cCtx.quadraticCurveTo(this.x - d, this.y + d, this.x, this.y + d * 1.5);
                cCtx.quadraticCurveTo(this.x + d, this.y + d, this.x + d, this.y + d / 2);
                cCtx.quadraticCurveTo(this.x + d, this.y, this.x + d / 2, this.y);
                cCtx.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
                cCtx.fill();
              } else {
                cCtx.beginPath();
                cCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                cCtx.fill();
              }
              cCtx.restore();
            }
          }
          tempSparks.push(new SparkParticle(sx, sy));
        }
        particlesRef.current.sparks = tempSparks;
      }
    }
    prevRsvpSuccessRef.current = rsvpSuccess;
  }, [rsvpSuccess]);

  return <canvas ref={canvasRef} className="canvas-particles" id="particles-canvas" />;
};

// ==========================================
// 2. SCRATCH CARD COMPONENT
// ==========================================
const ScratchCard = ({ isVisible }) => {
  const canvasRef = useRef(null);
  const [isFadedOut, setIsFadedOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isScratchingRef = useRef(false);
  const canvasDrawnRef = useRef(false);

  useEffect(() => {
    if (!isVisible || canvasDrawnRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set proper canvas size matching bounds
    const rect = canvas.parentNode.getBoundingClientRect();
    const w = rect.width > 0 ? rect.width : 390;
    const h = rect.height > 0 ? rect.height : 156;
    canvas.width = w;
    canvas.height = h;

    // Draw Elegant Gold foil layer
    const goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#c5a059');
    goldGrad.addColorStop(0.5, '#e0c38c');
    goldGrad.addColorStop(1, '#ae843b');
    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sophisticated traditional Mandala circle outlines on the scratch layer
    ctx.strokeStyle = 'rgba(64, 48, 16, 0.2)';
    ctx.lineWidth = 1;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      ctx.moveTo(cx + Math.cos(angle) * 15, cy + Math.sin(angle) * 15);
      ctx.lineTo(cx + Math.cos(angle) * 60, cy + Math.sin(angle) * 60);
    }
    ctx.stroke();

    ctx.fillStyle = '#4e3502';
    ctx.textAlign = 'center';
    ctx.font = "600 10px 'Montserrat'";
    ctx.fillText("SCRATCH TO REVEAL", cx, cy - 34);
    ctx.font = "italic 18px 'Cormorant Garamond'";
    ctx.fillText("Abishmi & Shesh", cx, cy + 6);
    ctx.font = "600 10px 'Montserrat'";
    ctx.fillText("JULY 2026", cx, cy + 40);

    canvasDrawnRef.current = true;

    // Scratch logic
    const getMousePos = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - cRect.left,
        y: clientY - cRect.top
      };
    };

    const checkScratchPercentage = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparent = 0;
      const step = 30;
      let totalSamples = 0;

      for (let i = 3; i < pixels.length; i += 4 * step) {
        totalSamples++;
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      const percentage = transparent / totalSamples;
      if (percentage > 0.45) {
        setIsFadedOut(true);
        setTimeout(() => {
          setIsHidden(true);
        }, 600);
      }
    };

    const scratch = (e) => {
      if (!isScratchingRef.current) return;
      e.preventDefault();
      const pos = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkScratchPercentage();
    };

    const startScratch = (e) => {
      isScratchingRef.current = true;
      scratch(e);
    };

    const endScratch = () => {
      isScratchingRef.current = false;
    };

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', endScratch);

    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', endScratch);

    return () => {
      window.removeEventListener('mouseup', endScratch);
      window.removeEventListener('touchend', endScratch);
    };
  }, [isVisible]);

  if (isHidden) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`scratch-canvas ${isFadedOut ? 'fade-out' : ''}`}
        id="scratch-canvas-el"
      />
      <div
        className="scratch-instruction-overlay"
        id="scratch-hint"
        style={{ opacity: isFadedOut ? 0 : 1 }}
      >
        Scratch to discover the date
      </div>
    </>
  );
};

// ==========================================
// 3. MAIN APP COMPONENT
// ==========================================
export default function App() {
  // Mode detection: Wedding vs Reception
  const [isReception, setIsReception] = useState(false);

  useEffect(() => {
    const checkMode = () => {
      const pathname = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const inviteType = searchParams.get('type') || searchParams.get('invite');
      
      const isRec = pathname.includes('reception') || inviteType === 'reception';
      setIsReception(isRec);
    };

    checkMode();
    // Watch for popstate/url changes (supports simple client router)
    window.addEventListener('popstate', checkMode);
    return () => window.removeEventListener('popstate', checkMode);
  }, []);

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [envelopeAnimationDone, setEnvelopeAnimationDone] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpFormState, setRsvpFormState] = useState({
    fullname: '',
    email: '',
    party_size: '1',
    dietary: 'none',
    event_swayambar: true,
    event_reception: true,
    janti_transport: false,
    song_suggestion: '',
    notes: ''
  });
  const [isSendingRsvp, setIsSendingRsvp] = useState(false);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  const audioRef = useRef(null);

  // Initialize and update countdown
  useEffect(() => {
    const targetTime = new Date('2026-07-01T11:30:00+05:45').getTime(); // Kathmandu Time
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        clearInterval(interval);
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Back to top observer
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check LocalStorage cache for RSVP on mount or when mode changes
  useEffect(() => {
    const cachedRsvp = localStorage.getItem(`abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`);
    if (cachedRsvp) {
      try {
        const data = JSON.parse(cachedRsvp);
        setRsvpFormState((prev) => ({ ...prev, ...data }));
        setRsvpSuccess(true);
      } catch (err) {
        console.error("Failed to parse cached RSVP:", err);
      }
    } else {
      setRsvpSuccess(false);
      // Reset form fields
      setRsvpFormState({
        fullname: '',
        email: '',
        party_size: '1',
        dietary: 'none',
        event_swayambar: true,
        event_reception: true,
        janti_transport: false,
        song_suggestion: '',
        notes: ''
      });
    }
  }, [isReception]);

  // Handle music toggle
  const toggleMusic = (forceValue = null) => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = forceValue !== null ? forceValue : !musicPlaying;
    if (shouldPlay) {
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch((err) => console.log("Audio play blocked by browser policies:", err));
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const handleOpenEnvelope = () => {
    if (envelopeOpen) return;
    setEnvelopeOpen(true);
    toggleMusic(true);

    setTimeout(() => {
      setEnvelopeAnimationDone(true);
    }, 1250);
  };

  const handleAddToCalendar = () => {
    const summary = "Abishmi & Shesh's Wedding Ceremonies";
    const details = isReception
      ? "Together with their families, Mr. and Mrs. Shah and Mr. and Mrs. Neupane request the pleasure of your company to celebrate the wedding of Abishmi and Shesh. Marriage ceremony: July 1. Reception Party: July 3."
      : "Together with their families, Mr. Kamal Kumar Neupane, Ms. Sirana Neupane, Mr. Nawashi Shah, and Ms. Saradha Devi Shah request the pleasure of your company to celebrate the wedding of Abishmi and Shesh. Marriage ceremony: July 1 at 11:30 AM. Reception Party: July 3 at 6:30 PM.";
    const location = "Maxims Banquet & Events and Buddha Palace, Kathmandu, Nepal";
    const startStr = "20260701T054500Z"; // July 1, 2026 11:30 AM NPT in UTC
    const endStr = "20260703T124500Z";   // July 3, 2026 6:30 PM NPT in UTC

    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(calUrl, '_blank');
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpFormState.fullname.trim()) {
      alert("Please fill in your full name.");
      return;
    }

    setIsSendingRsvp(true);

    const payload = isReception
      ? {
          fullname: rsvpFormState.fullname,
          email: rsvpFormState.email,
          party_size: rsvpFormState.party_size,
          dietary: rsvpFormState.dietary,
          event_swayambar: rsvpFormState.event_swayambar ? 'yes' : 'no',
          event_reception: rsvpFormState.event_reception ? 'yes' : 'no',
          janti_transport: rsvpFormState.janti_transport ? 'yes' : 'no',
          song_suggestion: rsvpFormState.song_suggestion,
          notes: rsvpFormState.notes,
          mode: 'reception'
        }
      : {
          fullname: rsvpFormState.fullname,
          notes: rsvpFormState.notes,
          mode: 'wedding'
        };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Unable to submit RSVP.');
      }

      // Save to local storage cache
      localStorage.setItem(
        `abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`,
        JSON.stringify(rsvpFormState)
      );

      setRsvpSuccess(true);
    } catch (err) {
      alert(err.message || 'Something went wrong while sending RSVP. Please try again.');
    } finally {
      setIsSendingRsvp(false);
    }
  };

  const handleResetRsvp = () => {
    localStorage.removeItem(`abishmi_shesh_rsvp_${isReception ? 'reception' : 'wedding'}`);
    setRsvpSuccess(false);
  };

  // Scroll Reveal hook using classes and state instead of IntersectionObserver if desired, 
  // but let's implement standard scroll reveal classes using a tiny effect
  useEffect(() => {
    if (!envelopeAnimationDone) return;
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [envelopeAnimationDone, isReception]);

  // Lock scrolling during envelope screen
  useEffect(() => {
    if (!envelopeAnimationDone) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [envelopeAnimationDone]);

  // Parent names copy variables
  const groomParents = isReception
    ? "Mr. & Mrs. Shah"
    : "Mr. Kamal Kumar Neupane & Ms. Sirana Neupane";

  const brideParents = isReception
    ? "Mr. & Mrs. Neupane"
    : "Mr. Nawashi Shah & Ms. Saradha Devi Shah";

  return (
    <>
      {/* 1. Sayapatri Particles */}
      <MarigoldParticles rsvpSuccess={rsvpSuccess} />

      {/* 2. Envelope Preloader */}
      {!envelopeAnimationDone && (
        <div
          id="envelope-screen"
          className={envelopeOpen ? 'open' : ''}
          onClick={handleOpenEnvelope}
        >
          <img
            className="envelope-fullscreen-image"
            src="/assets/images/envelop.png"
            alt="Wedding invitation envelope"
          />
          <div className="envelope-particles" id="envelope-particles">
            {/* Render 35 golden particle dots */}
            {Array.from({ length: 35 }).map((_, idx) => {
              const size = 2 + Math.random() * 4;
              const left = Math.random() * 100;
              const delay = Math.random() * 12;
              const duration = 8 + Math.random() * 10;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,228,168,0.9) 0%, rgba(232,197,99,0.4) 100%)',
                    animation: `envelopeParticleFloat ${duration}s ${delay}s linear infinite`,
                    pointerEvents: 'none'
                  }}
                />
              );
            })}
          </div>

          <div className="envelope-open-hint">
            <span className="hint-icon">
              <Sparkles style={{ width: '100%', height: '100%' }} />
            </span>
            <span>Touch the Seal to Open</span>
          </div>
        </div>
      )}

      {/* 3. Floating audio and controls */}
      <audio
        ref={audioRef}
        id="mangal-dhun-audio"
        src="/assets/romantic_wedding.mp3"
        loop
        preload="auto"
      />

      <div className="floating-controls" id="floating-controls" aria-label="Floating quick controls">
        <button
          className={`floating-control-btn music-toggle ${musicPlaying ? 'playing' : ''}`}
          id="music-toggle-btn"
          aria-label="Toggle romantic wedding music"
          onClick={() => toggleMusic()}
          type="button"
        >
          <Music id="music-icon" />
        </button>
        <button
          className={`floating-control-btn back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
          id="back-to-top-btn"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          type="button"
        >
          <ArrowUp />
        </button>
      </div>

      {/* 4. Main Site Wrapper */}
      <div id="main-website" className={envelopeAnimationDone ? 'visible' : ''}>
        {/* ==========================================
             HERO SECTION
             ========================================== */}
        <section className="hero-section" id="hero">
          <img
            className="hero-video-bg"
            src={isReception ? "/assets/images/wedding_heros.png" : "/assets/images/wedding_hero.jpeg"}
            alt="Traditional wedding mandap with Himalayan mountains"
            fetchPriority="high"
          />
          <div className="hero-video-overlay" />

          <div className="hero-topline" aria-hidden="true">
            <span>Abishmi &amp; Shesh</span>
            <span>July 2026</span>
          </div>

          <div className="hero-content">
            <div className="ganesh-invocation" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
                <path d="M50,15 C45,15 42,20 40,25 C45,28 55,28 60,25 C58,20 55,15 50,15 Z M50,7 C49,7 48,9 50,9 C52,9 51,7 50,7 Z M50,10 C48,10 47,13 50,13 C53,13 52,10 50,10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M40,25 C32,25 28,32 28,40 C28,48 35,52 42,50 C38,55 35,62 38,68 C40,72 45,74 50,74 C55,74 60,72 62,68 C65,62 62,55 58,50 C65,52 72,48 72,40 C72,32 68,25 60,25" fill="none" stroke="currentColor" stroke-width="2.5" strokeLinecap="round" />
                <path d="M50,40 C43,43 45,55 50,58 C55,60 56,66 54,72 C51,78 42,76 42,82 C42,88 52,90 54,84 C56,78 62,80 62,70 C62,60 58,54 50,40 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M50,28 L50,36 M48,32 L52,32" fill="none" stroke="var(--crimson-accent)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="68" cy="55" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </div>

            <p className="hero-subtitle">Wedding Celebration</p>
            <h1 className="hero-title">
              <span>Abishmi</span>
              <span>&amp;</span>
              <span>Shesh</span>
            </h1>
            <p className="hero-names-details">Marriage: July 1, 2026</p>
            <p className="hero-names-details hero-names-details--party">Party: July 3, 2026</p>
            <p className="hero-location">Maxims Banquet &amp; Events and Buddha Palace, Kathmandu</p>

            <div className="hero-actions">
              <a className="hero-link" href="#invitation-preview">View Invitation</a>
              <button className="hero-link hero-link--ghost calendar-add-btn" onClick={handleAddToCalendar} type="button">Add to Calendar</button>
            </div>
          </div>

          <a className="hero-scroll-cue" href="#invitation-preview" aria-label="Scroll to invitation preview">
            <span />
          </a>
        </section>

        {/* ==========================================
             SCRATCH CARD SECTION
             ========================================== */}
        <section className="date-scratch-section reveal" aria-label="Scratch to reveal the wedding date">
          <div className="date-scratch-copy">
            <span className="invitation-preview-kicker">Save The Date</span>
            <h2>Reveal the Celebration</h2>
          </div>

          <div className="scratch-card-container">
            <div className="scratch-revealed-date">
              <h3>July 1 &amp; 3, 2026</h3>
              <p>Maxims Banquet &amp; Events and Buddha Palace, Kathmandu</p>
              <button className="primary-btn calendar-add-btn" onClick={handleAddToCalendar} type="button">Add to Calendar</button>
            </div>
            <ScratchCard isVisible={envelopeAnimationDone} />
          </div>

          {/* Countdown timer under scratch card */}
          <div className="countdown-container reveal">
            <div className="countdown-box">
              <span className="countdown-number" id="days-val">{countdown.days}</span>
              <span className="countdown-label" style={{ fontSize: '7px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--sage-color))', fontWeight: 600 }}>Days</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number" id="hours-val">{countdown.hours}</span>
              <span className="countdown-label" style={{ fontSize: '7px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--sage-color))', fontWeight: 600 }}>Hours</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number" id="minutes-val">{countdown.minutes}</span>
              <span className="countdown-label" style={{ fontSize: '7px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--sage-color))', fontWeight: 600 }}>Mins</span>
            </div>
            <div className="countdown-box">
              <span className="countdown-number" id="seconds-val">{countdown.seconds}</span>
              <span className="countdown-label" style={{ fontSize: '7px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'hsl(var(--sage-color))', fontWeight: 600 }}>Secs</span>
            </div>
          </div>
        </section>

        {/* ==========================================
             FORMAL INVITATION PREVIEW
             ========================================== */}
        <section className="invitation-preview-section" id="invitation-preview" aria-label="Wedding invitation preview">
          <div className="invitation-preview-copy">
            <span class="invitation-preview-kicker">Formal Invitation</span>
            <h2>Abishmi &amp; Shesh</h2>
          </div>

          <figure className="invitation-preview-frame">
            <img src="/assets/images/wedding_invitation.png" alt="Formal wedding invitation for Abishmi and Shesh" loading="lazy" decoding="async" />
          </figure>
        </section>

        {/* ==========================================
             WELCOME INVITATION SECTION
             ========================================== */}
        <section className="section welcome-section reveal" id="welcome">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2, 2" />
            </svg>
            <h2 className="section-title">शुभ विवाह</h2>
            <p className="section-subtitle">An Auspicious Union</p>
          </div>

          <div className="welcome-panel">
            <div className="welcome-image-container">
              <img src="/assets/images/kalash_welcome.png" alt="Auspicious Kalash representing welcoming invitations" loading="lazy" decoding="async" />
            </div>

            <div className="welcome-card-content">
              <span className="welcome-kicker">With Lord Ganesh's Blessings</span>
              <h3>Welcome to our Auspicious Day</h3>
              <p className="welcome-lead">
                With immense joy, we invite you to celebrate the sacred union of Abishmi and Shesh as two families come together in love, friendship, and lifelong spiritual partnership.
              </p>
              <p>
                Your presence, warmth, and blessings will mean the world to us as we exchange our traditional vows in the beautiful valley of Kathmandu. Please join us in witnessing our union, sharing a grand traditional feast, and celebrating the beginning of our new chapter together.
              </p>

              <div className="inviter-names" aria-label="Inviting families">
                <div className="inviter-group">
                  <h5>Groom's Parents</h5>
                  <p>{groomParents}</p>
                </div>
                <div className="inviter-divider" aria-hidden="true" />
                <div className="inviter-group">
                  <h5>Bride's Parents</h5>
                  <p>{brideParents}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* ==========================================
             OUR LOVE STORY SECTION
             ========================================== */}
        <section className="section story-section reveal" id="our-story">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="1" stroke-dasharray="2, 2" />
            </svg>
            <h2 class="section-title">हाम्रो प्रेम कथा</h2>
            <p className="section-subtitle">Our Love Story</p>
          </div>

          <div className="story-timeline">
            {/* Chapter 1: The Meeting */}
            <div className="story-chapter reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img0.png" alt="Abishmi and Shesh meeting at a school function" />
                <div className="story-chapter-number">०१</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">Chapter One</span>
                <h3 className="story-chapter-title">The School Function</h3>
                <p className="story-chapter-year">2010 • School Function</p>
                <p className="story-chapter-desc">
                  It was back in 2010 during a lively school function when we first crossed paths. A simple introduction sparked a brief connection that stayed with both of us. Though life took us in different directions after school, we kept a quiet connection alive, staying in touch as social media friends and occasionally checking in on each other's journeys over the years.
                </p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chapter 2: The First Date */}
            <div className="story-chapter story-chapter--reverse reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img2.png" alt="Abishmi and Shesh going on their first date" />
                <div className="story-chapter-number">०२</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">Chapter Two</span>
                <h3 className="story-chapter-title">The First Date</h3>
                <p className="story-chapter-year">July 7, 2023 • First Date</p>
                <p className="story-chapter-desc">
                  After thirteen years of staying in contact as social media friends, our paths finally converged for our first official date on July 7, 2023. As we sat down and talked, all the years of digital separation vanished. We laughed, shared stories, and instantly realized that the connection we had maintained online was only the prelude to a beautiful real-life love story.
                </p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chapter 3: Proposal */}
            <div className="story-chapter reveal">
              <div className="story-chapter-image">
                <img src="/assets/images/img3.png" alt="Abishmi and Shesh proposing their forever love" />
                <div className="story-chapter-number">०३</div>
              </div>
              <div className="story-chapter-text">
                <span className="story-chapter-label">Chapter Three</span>
                <h3 className="story-chapter-title">Beginning of Our Forever</h3>
                <p className="story-chapter-year">2026 • Heading to the Mandap</p>
                <p className="story-chapter-desc">
                  Following that magical first date, our bond grew stronger with every shared laugh and conversation. Recognizing each other as life partners, and with the loving blessings of our families, we made the decision to unite our lives in marriage. Our journey from school function acquaintances to social media friends, and now to husband and wife, is about to begin.
                </p>
                <div className="story-chapter-ornament">
                  <svg viewBox="0 0 60 12" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="22" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx="30" cy="6" r="3" fill="currentColor" />
                    <line x1="38" y1="6" x2="60" y2="6" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             ITINERARY / TIMELINE SECTION
             ========================================== */}
        <section className="section itinerary-section" id="itinerary">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="1" stroke-dasharray="2, 2" />
            </svg>
            <h2 className="section-title">Wedding Itinerary</h2>
            <p className="section-subtitle">The Ceremonies &amp; Celebrations</p>
          </div>

          <div className="timeline-container">
            {/* Event 1: Marriage */}
            <div className="timeline-item reveal">
              <div className="event-image-box">
                <img
                  src={isReception ? "/assets/images/img4.png" : "/assets/images/maximss.png"}
                  alt="Marriage ceremony venue exterior"
                />
              </div>

              <div className="event-details-card">
                <span className="event-badge">Day 1 • Marriage</span>
                <h3 className="event-title">Marriage Ceremony</h3>

                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar style={{ width: 14, height: 14 }} />
                    Wednesday, July 1, 2026
                  </div>
                  <div className="meta-item">
                    <Clock style={{ width: 14, height: 14 }} />
                    {isReception ? "11:00 AM Onwards" : "11:30 AM Onwards"}
                  </div>
                  <div className="meta-item">
                    <MapPin style={{ width: 14, height: 14 }} />
                    Maxims Banquet &amp; Events, Kathmandu
                  </div>
                </div>

                {!isReception && (
                  <div className="ceremony-highlights" aria-label="Marriage ceremony timings">
                    <div>
                      <span>Muhurat &amp; Varmala</span>
                      <strong>11:30 AM</strong>
                    </div>
                    <div>
                      <span>Kanyadaan</span>
                      <strong>1:30 PM</strong>
                    </div>
                    <div>
                      <span>Aarti</span>
                      <strong>6:40 PM</strong>
                    </div>
                  </div>
                )}

                <p className="event-description">
                  Join us for the sacred marriage ceremony as Abishmi and Shesh begin their life together with family blessings, traditional rituals, and heartfelt celebration.
                </p>
                <a
                  href="https://maps.app.goo.gl/ZmFc1q9Lf7NHqP3k9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  <ExternalLink style={{ width: 14, height: 14 }} />
                  View Venue Map
                </a>
              </div>
            </div>

            {/* Event 2: Party */}
            <div className="timeline-item reveal">
              <div className="event-image-box">
                <img
                  src={isReception ? "/assets/images/maximg.png" : "/assets/images/img4.png"}
                  alt="Wedding party banquet setup"
                />
              </div>

              <div className="event-details-card">
                <span className="event-badge">Day 2 • Party</span>
                <h3 className="event-title">Wedding Party</h3>

                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar style={{ width: 14, height: 14 }} />
                    Friday, July 3, 2026
                  </div>
                  <div className="meta-item">
                    <Clock style={{ width: 14, height: 14 }} />
                    {isReception ? "5:00 PM Onwards" : "6:30 PM Onwards"}
                  </div>
                  <div className="meta-item">
                    <MapPin style={{ width: 14, height: 14 }} />
                    Buddha Palace, Kathmandu
                  </div>
                </div>

                <p className="event-description">
                  Celebrate with us at the wedding party with dinner, music, dancing, and a joyful evening with family and friends.
                </p>
                <a
                  href="https://maps.app.goo.gl/6ctvC4EWxoSCcrECA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                >
                  <ExternalLink style={{ width: 14, height: 14 }} />
                  View Venue Map
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             VENUE MAP SECTION
             ========================================== */}
        <section className="section venue-map-section" id="venue-map">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="1" stroke-dasharray="2, 2" />
            </svg>
            <h2 className="section-title">हाम्रो स्थान</h2>
            <p className="section-subtitle">Find the Celebration Venues</p>
          </div>

          <div className="venue-map-grid">
            {/* MAP 1: Marriage Ceremony */}
            <div className="venue-map-card reveal">
              <div className="venue-map-badge">
                <MapPin style={{ width: 14, height: 14 }} />
                <span>Marriage Ceremony</span>
              </div>
              <div className="venue-map-info">
                <h3 class="venue-map-title">Maxims Banquet &amp; Events</h3>
                <p className="venue-map-address">Marriage Ceremony • Kathmandu, Nepal</p>
                <div className="venue-map-events">
                  <span className="venue-event-tag">July 1 – Marriage</span>
                </div>
              </div>
              <div className="venue-map-embed">
                <iframe
                  title="Maxims Banquet and Events map location"
                  src="https://www.google.com/maps?output=embed&amp;q=Maxims%20Banquet%20%26%20Events%20Kathmandu&amp;z=16"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/ZmFc1q9Lf7NHqP3k9"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map-btn"
                id="ceremony-map-btn"
              >
                <Map style={{ width: 14, height: 14 }} />
                Open in Google Maps
              </a>
            </div>

            {/* MAP 2: Reception Party */}
            <div className="venue-map-card reveal">
              <div className="venue-map-badge venue-map-badge--reception">
                <PartyPopper style={{ width: 14, height: 14 }} />
                <span>Reception &amp; Party</span>
              </div>
              <div className="venue-map-info">
                <h3 className="venue-map-title">Buddha Palace</h3>
                <p className="venue-map-address">Reception &amp; Party • Kathmandu, Nepal</p>
                <div className="venue-map-events">
                  <span className="venue-event-tag venue-event-tag--gold">July 3 – Party</span>
                  <span className="venue-event-tag venue-event-tag--gold">{isReception ? "5:00 PM Onwards" : "6:30 PM Onwards"}</span>
                </div>
              </div>
              <div className="venue-map-embed">
                <iframe
                  title="Buddha Palace map location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56510.32926166983!2d85.2130632762314!3d27.720510163163386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19760cf434b1%3A0x95451d28a8f300fa!2sBuddha%20Palace%20Banquet!5e0!3m2!1sen!2snp!4v1780693136600!5m2!1sen!2snp"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/6ctvC4EWxoSCcrECA"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-map-btn venue-map-btn--gold"
                id="reception-map-btn"
              >
                <Map style={{ width: 14, height: 14 }} />
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="venue-map-notice reveal">
            <Info style={{ width: 14, height: 14, flexShrink: 0 }} />
            <p>The marriage ceremony will be held at <strong>Maxims Banquet &amp; Events</strong>, followed by the reception and party at <strong>Buddha Palace</strong>. Shuttle service is available for guests. See the RSVP section to request transportation.</p>
          </div>
        </section>

        {/* Fine Section Divider */}
        <div className="divider-ornament">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12,2 C10,6 6,10 2,12 C6,14 10,18 12,22 C14,18 18,14 22,12 C18,10 14,6 12,2 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
          </svg>
        </div>

        {/* ==========================================
             RSVP SECTION
             ========================================== */}
        <section className="section rsvp-section" id="rsvp">
          <div className="section-title-wrapper">
            <svg className="section-ornament" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M40,0 C45,5 55,5 60,10 C50,15 45,15 40,20 C35,15 30,15 20,10 C25,5 35,5 40,0 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
              <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="1" stroke-dasharray="2, 2" />
            </svg>
            <h2 className="section-title">RSVP</h2>
            <p className="section-subtitle">Kindly Respond by June 15, 2026</p>
          </div>

          <div className="card-elegant rsvp-card reveal">
            {!rsvpSuccess ? (
              <form className="rsvp-form" id="wedding-rsvp-form" onSubmit={handleRsvpSubmit}>
                {isReception ? (
                  <>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-fullname">
                          <User className="form-field-icon" style={{ width: 14, height: 14 }} /> Your Full Name
                        </label>
                        <input
                          className="form-input"
                          type="text"
                          id="guest-fullname"
                          name="fullname"
                          placeholder="E.g., Ram Bahadur"
                          value={rsvpFormState.fullname}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, fullname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-email">
                          <Mail className="form-field-icon" style={{ width: 14, height: 14 }} /> Email Address
                        </label>
                        <input
                          className="form-input"
                          type="email"
                          id="guest-email"
                          name="email"
                          placeholder="E.g., ram@gmail.com"
                          value={rsvpFormState.email}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-count">
                          <Users className="form-field-icon" style={{ width: 14, height: 14 }} /> Total Guests in Party
                        </label>
                        <select
                          className="form-input"
                          id="guest-count"
                          name="party_size"
                          value={rsvpFormState.party_size}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, party_size: e.target.value })}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5 People</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="guest-dietary">
                          <Utensils className="form-field-icon" style={{ width: 14, height: 14 }} /> Dietary Preferences
                        </label>
                        <select
                          className="form-input"
                          id="guest-dietary"
                          name="dietary"
                          value={rsvpFormState.dietary}
                          onChange={(e) => setRsvpFormState({ ...rsvpFormState, dietary: e.target.value })}
                        >
                          <option value="none">Standard Traditional Menu</option>
                          <option value="veg">Traditional Nepalese Vegetarian Thali</option>
                          <option value="non-veg">Traditional Nepalese Non-Veg Banquet</option>
                          <option value="vegan">Strict Vegan / No Dairy</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <CheckSquare className="form-field-icon" style={{ width: 14, height: 14 }} /> Which Events Will You Attend?
                      </label>
                      <div className="events-select">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="event_swayambar"
                            checked={rsvpFormState.event_swayambar}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, event_swayambar: e.target.checked })}
                          />
                          <span className="custom-checkbox" />
                          Marriage Ceremony (July 1, 11:00 AM)
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="event_reception"
                            checked={rsvpFormState.event_reception}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, event_reception: e.target.checked })}
                          />
                          <span className="custom-checkbox" />
                          Wedding Party (July 3, 5:00 PM)
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Bus className="form-field-icon" style={{ width: 14, height: 14 }} /> Janti Shuttle Service
                      </label>
                      <div className="events-select">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            id="janti-transport"
                            name="janti_transport"
                            checked={rsvpFormState.janti_transport}
                            onChange={(e) => setRsvpFormState({ ...rsvpFormState, janti_transport: e.target.checked })}
                          />
                          <span className="custom-checkbox" />
                          I require Janti shuttle transportation from Central Kathmandu to the venues
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="guest-song">
                        <Music className="form-field-icon" style={{ width: 14, height: 14 }} /> Song Suggestion
                      </label>
                      <input
                        className="form-input"
                        type="text"
                        id="guest-song"
                        name="song_suggestion"
                        placeholder="Suggest a track for the DJ table..."
                        value={rsvpFormState.song_suggestion}
                        onChange={(e) => setRsvpFormState({ ...rsvpFormState, song_suggestion: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label className="form-label" htmlFor="guest-fullname">
                      <User className="form-field-icon" style={{ width: 14, height: 14 }} /> Your Full Name
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="guest-fullname"
                      name="fullname"
                      placeholder="E.g., Ram Bahadur"
                      value={rsvpFormState.fullname}
                      onChange={(e) => setRsvpFormState({ ...rsvpFormState, fullname: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="guest-notes">
                    <MessageSquare className="form-field-icon" style={{ width: 14, height: 14 }} /> Blessings / Special Notes
                  </label>
                  <textarea
                    className="form-input"
                    id="guest-notes"
                    name="notes"
                    rows={isReception ? 4 : 5}
                    placeholder={isReception ? "Share a lovely note or dietary allergies details..." : "Share your blessings or a lovely note..."}
                    value={rsvpFormState.notes}
                    onChange={(e) => setRsvpFormState({ ...rsvpFormState, notes: e.target.value })}
                  />
                </div>

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={isSendingRsvp}
                  style={{ width: '100%', fontSize: '12px', letterSpacing: '2px', fontWeight: 700, marginTop: '10px' }}
                >
                  {isSendingRsvp ? 'Sending RSVP...' : 'Submit RSVP'}
                </button>
              </form>
            ) : (
              <div className="rsvp-success-overlay active" id="rsvp-success-screen">
                <div className="success-icon-box">
                  <Heart className="success-heart-icon" />
                </div>
                <h3 className="success-title">Dhanyabad!</h3>
                <p className="success-message">
                  Your RSVP has been submitted. An email draft has been prepared for neupane98088@gmail.com so your response can be sent right away.
                </p>
                <button className="action-btn" id="reset-rsvp-btn" onClick={handleResetRsvp}>
                  Update RSVP Details
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==========================================
             FOOTER
             ========================================== */}
        <footer>
          <div className="footer-logo">A &amp; S</div>
          <p className="footer-quote">"अहमादिर्हि देवानां महर्षीणां च सर्वशः" • Two Souls, One Destiny</p>
          {!isReception && (
            <div className="footer-contacts" aria-label="Wedding contact numbers">
              <a href="tel:+9779851417703">Bride &amp; Groom: 9851417703</a>
              <span aria-hidden="true">•</span>
              <a href="tel:+9779851310689">Mama: 9851310689</a>
            </div>
          )}
          <p className="footer-copy">© 2026 Abishmi &amp; Shesh • Built with Mediterranean Elegance</p>
        </footer>
      </div>
    </>
  );
}
