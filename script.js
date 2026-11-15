// 모바일 메뉴 토글
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
  nav.classList.toggle('is-open', !open);
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    nav.classList.remove('is-open');
  })
);

// 스크롤 시 헤더 그림자
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 요금 탭
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  })
);

// 스크롤 등장 애니메이션
const targets = document.querySelectorAll('.feature, .space, .price, .step, .rules, .location, .section__head');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  targets.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

// 푸터 연도
document.getElementById('year').textContent = new Date().getFullYear();
