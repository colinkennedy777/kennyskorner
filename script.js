// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Meal period tabs (Breakfast / Lunch / Drinks)
const mealTabs = document.querySelectorAll('.meal-tab');
mealTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    mealTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const meal = btn.dataset.meal;
    document.querySelectorAll('.meal-panel').forEach(p => p.style.display = 'none');
    document.getElementById('panel-' + meal).style.display = 'block';
    const firstSubTab = document.querySelector('#panel-' + meal + ' .tab-btn');
    if (firstSubTab) firstSubTab.click();
  });
});

// Sub-category tabs
document.querySelectorAll('.meal-panel').forEach(panel => {
  const subTabs = panel.querySelectorAll('.tab-btn');
  const items = panel.querySelectorAll('.menu-item');
  subTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      subTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      items.forEach(item => {
        item.style.display = item.dataset.tab === tab ? 'block' : 'none';
      });
    });
  });
});

// ===== REVIEW CAROUSEL =====
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');

if (track && dotsContainer) {
  const cards = Array.from(track.querySelectorAll('.review-card'));
  const cardWidth = () => cards[0].offsetWidth + 24; // card + gap
  let current = 0;
  let autoTimer;
  const visibleCount = () => Math.max(1, Math.floor(track.parentElement.offsetWidth / cardWidth()));
  const maxIndex = () => Math.max(0, cards.length - visibleCount());

  // Build dots
  const totalDots = () => maxIndex() + 1;
  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() {
    goTo(current >= maxIndex() ? 0 : current + 1);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 3800);
  }

  // Drag/swipe support
  let startX = 0, isDragging = false;
  track.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; track.style.transition = 'none'; });
  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    track.style.transform = `translateX(${-current * cardWidth() + diff}px)`;
  });
  track.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const diff = e.clientX - startX;
    if (diff < -60) next();
    else if (diff > 60) goTo(current - 1);
    else goTo(current);
    startAuto();
  });
  track.addEventListener('mouseleave', () => { if (isDragging) { isDragging = false; track.style.transition = ''; goTo(current); } });

  // Touch support
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -50) next();
    else if (diff > 50) goTo(current - 1);
    startAuto();
  });

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.parentElement.addEventListener('mouseleave', startAuto);

  buildDots();
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, maxIndex())); });
}

// ===== FLOATING ORDER BUTTON =====
const fab = document.getElementById('fabOrder');
if (fab) {
  window.addEventListener('scroll', () => {
    fab.classList.toggle('visible', window.scrollY > 400);
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.beach-card, .review-card, .contact-block, .hours-card, .gm-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
