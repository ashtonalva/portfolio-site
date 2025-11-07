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
const fadeElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  fadeObserver.observe(element);
});

// ============================================
// Hero Animations
// ============================================
const heroText = document.querySelector('.hero-text');
const heroImage = document.querySelector('.hero-image');

if (heroText) {
  heroText.style.opacity = '0';
  heroText.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
  }, 100);
}

if (heroImage) {
  heroImage.style.opacity = '0';
  heroImage.style.transform = 'translateX(30px)';
  
  setTimeout(() => {
    heroImage.style.transition = 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s';
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
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 50%;
  color: #64ffda;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
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
  scrollToTopBtn.style.backgroundColor = 'rgba(100, 255, 218, 0.2)';
  scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
  scrollToTopBtn.style.transform = 'translateY(0)';
});

// ============================================
// Typing Effect (Optional Enhancement)
// ============================================
const typingElements = document.querySelectorAll('.typing-effect');
typingElements.forEach(element => {
  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '2px solid #64ffda';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      element.style.borderRight = 'none';
    }
  };
  
  typeWriter();
});

// ============================================
// Parallax Effect for Hero Background
// ============================================
const gradientOrbs = document.querySelectorAll('.gradient-orb');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5;
  
  gradientOrbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.1;
    orb.style.transform = `translate(${rate * speed}px, ${rate * speed * 0.5}px)`;
  });
});

// ============================================
// Project Card Hover Effects
// ============================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
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
          entry.target.style.transition = 'all 0.3s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, index * 50);
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
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
console.log('%cWant to see the code? Check out the repository!', 'color: #8892b0; font-size: 12px;');
