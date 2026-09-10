import './styles.css';

const body = document.body;
body.classList.add('js-ready');

// Reveal content as it enters the viewport. The page remains fully readable without JavaScript.
document.querySelectorAll('[data-delay]').forEach((element) => {
  element.style.setProperty('--delay', `${element.dataset.delay}ms`);
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Mobile navigation.
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const setMenu = (open) => {
  menuToggle?.setAttribute('aria-expanded', String(open));
  mobileMenu?.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
};
menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// Keep the desktop navigation's small active marker in sync with the current section.
const navLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
const observedSections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { threshold: [0.15, 0.35, 0.65], rootMargin: '-22% 0px -55% 0px' });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Testimonials are a simple one-card-at-a-time carousel on small screens.
const testimonialViewport = document.querySelector('.testimonial-viewport');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = [...document.querySelectorAll('.testimonial-card')];
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const progressBar = document.querySelector('.testimonial-progress span');
let testimonialIndex = 0;

const updateTestimonials = () => {
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  if (!isMobile) {
    testimonialTrack.style.transform = 'translateX(0)';
    testimonialPrev?.setAttribute('disabled', 'disabled');
    testimonialNext?.setAttribute('disabled', 'disabled');
    if (progressBar) progressBar.style.transform = 'translateX(0)';
    return;
  }
  testimonialPrev?.removeAttribute('disabled');
  testimonialNext?.removeAttribute('disabled');
  const gap = 20;
  const step = testimonialViewport.clientWidth + gap;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * step}px)`;
  if (progressBar) progressBar.style.transform = `translateX(${testimonialIndex * 100}%)`;
};

testimonialPrev?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
  updateTestimonials();
});
testimonialNext?.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  updateTestimonials();
});
window.addEventListener('resize', updateTestimonials);
updateTestimonials();

// Copy-to-clipboard affordance for the email address.
const copyEmailButton = document.querySelector('.copy-email');
copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  const label = copyEmailButton.querySelector('span');
  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.querySelector('.icon use')?.setAttribute('href', '#icon-check');
    if (label) label.textContent = 'Email copied';
    window.setTimeout(() => {
      copyEmailButton.querySelector('.icon use')?.setAttribute('href', '#icon-copy');
      if (label) label.textContent = 'Copy email';
    }, 2200);
  } catch {
    if (label) label.textContent = email;
  }
});

// There is no invented third-party endpoint: the form prepares a clean mailto draft for M. Haris.
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const bodyText = `Hello M. Haris,\n\nMy name is ${name}.\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:harishuja05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  if (formStatus) {
    formStatus.classList.remove('is-error');
    formStatus.textContent = 'Opening your email app…';
  }
  window.location.href = mailto;
});

// A little tactile response on primary actions.
document.querySelectorAll('.button-primary').forEach((button) => {
  button.addEventListener('pointerdown', () => button.classList.add('is-pressed'));
  button.addEventListener('pointerup', () => button.classList.remove('is-pressed'));
  button.addEventListener('pointerleave', () => button.classList.remove('is-pressed'));
});
