/* ─────────────────────────────────────────────
   HANSER.DEV — Interactive Script
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── TYPED TEXT HERO ── */
  const phrases = [
    'Full-Stack Developer',
    'Tech Student',
    'Open Source Enthusiast',
    'Builder & Tinkerer',
    'CS Undergrad',
    'Problem Solver',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typedText');

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typedEl.textContent = current.slice(0, --charIdx);
    } else {
      typedEl.textContent = current.slice(0, ++charIdx);
    }

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  type();

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  /* ── INTERSECTION OBSERVER — REVEAL ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Add reveal class to cards / grids
  const revealTargets = [
    '.hobby-card',
    '.project-card',
    '.achieve-card',
    '.contact-card',
    '.skill-card',
    '.media-card',
    '.section-header',
    '.faq-item',
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.06}s`;
      revealObserver.observe(el);
    });
  });

  /* ── TIMELINE REVEAL ── */
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        timelineObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    timelineObserver.observe(el);
  });

  /* ── SKILL BAR ANIMATION ── */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill, .progress-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('#skills, #projects').forEach(el => skillObserver.observe(el));

  /* ── SKILLS TABS ── */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillPanels = document.querySelectorAll('.skills-panel');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      skillPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        // Animate bars in newly shown panel
        panel.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = '0';
          requestAnimationFrame(() => {
            setTimeout(() => bar.classList.add('animated'), 50);
          });
        });
      }
    });
  });

  /* ── ENTERTAINMENT TABS ── */
  const entTabs = document.querySelectorAll('.ent-tab');
  const entPanels = document.querySelectorAll('.ent-panel');

  entTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      entTabs.forEach(t => t.classList.remove('active'));
      entPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('ent-' + tab.dataset.ent);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger reveal for newly shown media cards
        panel.querySelectorAll('.media-card').forEach((el, i) => {
          el.classList.remove('visible');
          el.style.transitionDelay = `${i * 0.05}s`;
          setTimeout(() => el.classList.add('visible'), 30);
        });
      }
    });
  });

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── SMOOTH HOVER TILT ON HOBBY CARDS ── */
  document.querySelectorAll('.hobby-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-3px) rotateY(${x * 6}deg) rotateX(${y * -4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── COPY EMAIL ON CLICK ── */
  const emailCard = document.querySelector('#contact .contact-card:first-child .contact-link');
  if (emailCard) {
    emailCard.addEventListener('click', e => {
      const email = 'hanser@example.com';
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          const label = emailCard.querySelector('.contact-value');
          const original = label.textContent;
          label.textContent = 'Copied! ✓';
          label.style.color = '#22c55e';
          setTimeout(() => {
            label.textContent = original;
            label.style.color = '';
          }, 2000);
        });
      }
    });
  }

  /* ── INITIAL SKILL BARS for first visible tab ── */
  const firstSkillPanel = document.querySelector('.skills-panel.active');
  if (firstSkillPanel) {
    const skillBarObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
          skillBarObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    skillBarObserver.observe(firstSkillPanel);
  }

  /* ── PROGRESS BARS for Projects ── */
  const projectSection = document.getElementById('projects');
  if (projectSection) {
    const progObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.progress-fill').forEach(bar => bar.classList.add('animated'));
          progObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    progObserver.observe(projectSection);
  }

  /* ── BACK TO TOP on footer logo click ── */
  document.querySelector('.footer-logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
