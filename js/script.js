// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -35% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Smooth scroll for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// Scroll Animations
// ============================================
const SCROLL_REVEAL_OPTS = {
  threshold: 0.08,
  rootMargin: '0px 0px -18% 0px'
};
const REVEAL_TRANSITION = 'opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1), transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)';

// Staggered reveal for .scroll-reveal (section headers, filters, contact bits)
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.revealDelay, 10) || 0;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      revealObserver.unobserve(el);
    }
  });
}, SCROLL_REVEAL_OPTS);

scrollRevealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = REVEAL_TRANSITION;
  el.dataset.revealDelay = String(Math.min(i * 60, 240));
  revealObserver.observe(el);
});

// Block-level fade (cards, sections) – trigger when section is in view
const fadeElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .education-item, .timeline-content, .cert-category');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, SCROLL_REVEAL_OPTS);

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(24px)';
  element.style.transition = REVEAL_TRANSITION;
  fadeObserver.observe(element);
});

// ============================================
// Hero Animations
// ============================================
const heroText = document.querySelector('.hero-text');
const heroImage = document.querySelector('.hero-image');

if (heroText) {
  heroText.style.opacity = '0';
  heroText.style.transform = 'translateY(40px)';
  
  setTimeout(() => {
    heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
  }, 100);
}

if (heroImage) {
  heroImage.style.opacity = '0';
  heroImage.style.transform = 'translateX(40px)';
  
  setTimeout(() => {
    heroImage.style.transition = 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s';
    heroImage.style.opacity = '1';
    heroImage.style.transform = 'translateX(0)';
  }, 300);
}

// ============================================
// Current Year
// ============================================
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 15l-6-6-6 6"/>
  </svg>
`;
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 16px;
  color: white;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.opacity = '1';
  } else {
    scrollToTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.pageYOffset <= 300) {
        scrollToTopBtn.style.display = 'none';
      }
    }, 300);
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.05)';
  scrollToTopBtn.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
  scrollToTopBtn.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
});

// ============================================
// Parallax Effect for Hero Background
// ============================================
const gradientOrbs = document.querySelectorAll('.gradient-orb');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      
      gradientOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translate(${rate * speed}px, ${rate * speed * 0.5}px)`;
      });
      
      ticking = false;
    });
    
    ticking = true;
  }
});

// ============================================
// Project Card Hover Effects
// ============================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ============================================
// Skill Items Animation
// ============================================
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'scale(0.8)';
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, index * 30);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillObserver.observe(item);
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// Smooth Scroll for All Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// Project Filters
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCardsAll = document.querySelectorAll('#projects-grid .project-card');

if (filterBtns.length && projectCardsAll.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectCardsAll.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('filter-hidden', !show);
      });
    });
  });
}

// ============================================
// Theme Toggle (Dark / Light)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'portfolio-theme';

function setTheme(theme) {
  document.body.classList.remove('theme-dark', 'theme-light');
  document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

function initTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') setTheme('light');
    else setTheme('dark');
  } catch (e) {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }
}

initTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('theme-light');
    setTheme(isLight ? 'dark' : 'light');
  });
}

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cWant to see the code? Check out the repository!', 'color: #8b8ba7; font-size: 12px;');
