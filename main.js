/* =============================================
   PEARLY WHITE — Shared JS
   ============================================= */

// ── Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
    }
  });
}

// ── Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks?.classList.remove('active');
    }
  });
});

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Hero background zoom on load
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('load', () => heroBg.classList.add('loaded'));
}

// ── WhatsApp form submit
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  if (!data.name || !data.phone || !data.service) {
    showToast('Please fill in all required fields', 'error');
    return false;
  }
  const msg =
    `*New Inquiry — Pearly White Dental Clinic*\n\n` +
    `*Name:* ${data.name}\n` +
    `*Phone:* ${data.phone}\n` +
    `*Email:* ${data.email || 'Not provided'}\n` +
    `*Service:* ${data.service}\n` +
    `*Message:* ${data.message || 'No message'}`;
  window.open(`https://wa.me/917694959759?text=${encodeURIComponent(msg)}`, '_blank');
  event.target.reset();
  showToast('Redirecting to WhatsApp…', 'success');
  return false;
}

// ── Toast notification
function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed; bottom:100px; right:32px; z-index:9999;
      padding: 0.85rem 1.5rem; border-radius: 10px; font-size: 0.875rem;
      font-family: 'DM Sans', sans-serif; font-weight:500;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      transition: opacity 0.4s, transform 0.4s;
      transform: translateY(10px); opacity: 0;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = type === 'success' ? '#0891b2' : '#ef4444';
  t.style.color = 'white';
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
  }, 3000);
}

// ── Phone input formatting (Indian style)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '').slice(0, 10);
    this.value = v;
  });
}
