// stitch.js - Core Animation Engine

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Custom Cursor with Spring Physics
  const cursor = document.getElementById('custom-cursor');
  const dot = cursor ? cursor.querySelector('.cursor-dot') : null;
  const trailer = cursor ? cursor.querySelector('.cursor-trailer') : null;
  
  if (cursor && dot && trailer && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailerX = mouseX;
    let trailerY = mouseY;
    
    // Lerp (Linear Interpolation) for the trailing effect
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot moves instantly
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    });
    
    // Animation loop for trailer smooth follow
    const animateTrailer = () => {
      trailerX = lerp(trailerX, mouseX, 0.15);
      trailerY = lerp(trailerY, mouseY, 0.15);
      trailer.style.transform = `translate(calc(${trailerX}px - 50%), calc(${trailerY}px - 50%))`;
      requestAnimationFrame(animateTrailer);
    };
    requestAnimationFrame(animateTrailer);

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .project-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Spotlight Effect for Project Cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Parallax Scrolling
  if (!prefersReducedMotion) {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-parallax'));
            item.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
    // If reduced motion, show everything immediately
    setTimeout(() => {
      document.querySelectorAll('.char, .stagger-item, .burst-tag, [data-stitch]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        if (el.classList) el.classList.add('is-visible');
      });
      const subtitle = document.getElementById('hero-subtitle');
      if (subtitle) {
        subtitle.innerHTML = subtitle.getAttribute('data-text').replace('(and break)', '<span class="typewriter-flash settled">(and break)</span>');
        subtitle.style.opacity = '1';
      }
    }, 100);
    return; // Skip complex animations
  }

  // Generalized Intersection Observer for scroll triggers
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animType = el.getAttribute('data-stitch');
        
        switch (animType) {
          case 'slide-up':
          case 'fade-in':
            el.classList.add('is-visible');
            break;
          case 'stagger-group':
            playStaggerGroup(el);
            break;
          case 'burst-group':
            playBurstGroup(el);
            break;
          case 'counter':
            playCounter(el);
            break;
        }
        
        // Unobserve after playing once
        obs.unobserve(el);
      }
    });
  }, observerOptions);

  // Initialize observing
  document.querySelectorAll('[data-stitch]').forEach(el => observer.observe(el));

  // Hero Name Animation (triggers on load + 300ms)
  setTimeout(() => {
    const heroName = document.getElementById('hero-name');
    if (heroName) {
      playHeroNameAnim(heroName);
    }
  }, 300);

  // Nav Fade In on Scroll (after hero)
  const nav = document.getElementById('main-nav');
  if (nav) {
    let navTicking = false;
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > window.innerHeight * 0.7) {
            nav.classList.add('is-visible');
          } else {
            nav.classList.remove('is-visible');
          }
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });
  }
});

// Animation Functions
function playHeroNameAnim(container) {
  const chars = container.querySelectorAll('.char');
  chars.forEach((char, index) => {
    setTimeout(() => {
      char.style.transform = 'translate(0, 0) rotate(0deg)';
      char.style.opacity = '1';
    }, index * 45); // 45ms stagger per character
  });

  // After name completes, trigger typewriter
  setTimeout(() => {
    const subtitle = document.getElementById('hero-subtitle');
    if (subtitle) playTypewriter(subtitle);
  }, chars.length * 45 + 500); // 500ms grace period after landing
}

function playTypewriter(element) {
  const text = element.getAttribute('data-text');
  element.innerHTML = '';
  element.style.opacity = '1';
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      if (text.substring(i, i+11) === "(and break)") {
        const span = document.createElement('span');
        span.textContent = "(and break)";
        span.className = 'typewriter-flash';
        element.appendChild(span);
        i += 11;
        
        // Let it flash ice blue then settle to muted gray
        setTimeout(() => {
          span.classList.add('settled');
        }, 800);
      } else {
        element.appendChild(document.createTextNode(text.charAt(i)));
        i++;
      }
    } else {
      clearInterval(interval);
    }
  }, 35);
}

function playStaggerGroup(container) {
  const items = container.querySelectorAll('.stagger-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('is-visible');
    }, index * 100);
  });
}

function playBurstGroup(container) {
  const tags = container.querySelectorAll('.burst-tag');
  tags.forEach((tag) => {
    // Generate random delay 20-60ms
    const delay = Math.floor(Math.random() * 41) + 20;
    setTimeout(() => {
      tag.style.transform = 'translate(0, 0) scale(1)';
      tag.style.opacity = '1';
    }, delay);
  });
}

function playCounter(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  let count = 0;
  const increment = Math.max(1, target / 30); // 30 steps roughly
  
  const timer = setInterval(() => {
    count += increment;
    if (count >= target) {
      element.innerText = target;
      clearInterval(timer);
    } else {
      element.innerText = Math.floor(count);
    }
  }, 40);
}
