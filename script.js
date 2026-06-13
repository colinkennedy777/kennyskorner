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
    // Trigger first sub-tab in the newly shown panel
    const firstSubTab = document.querySelector('#panel-' + meal + ' .tab-btn');
    if (firstSubTab) firstSubTab.click();
  });
});

// Sub-category tabs within each meal panel
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

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.beach-card, .review-card, .contact-block, .hours-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
