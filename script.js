// JavaScript simple interactivity: menú y mejoras móviles (versión robusta)
(function(){
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const navClose = document.getElementById('nav-close');
  const yearEls = document.querySelectorAll('#year, #year2');

  function setYear(){
    const y = new Date().getFullYear();
    yearEls.forEach(el=> el && (el.textContent = y));
  }
  setYear();

  // Safe getters
  function isOpen(){
    return nav && nav.getAttribute('aria-hidden') === 'false';
  }

  function openNav(){
    if(!nav) return;
    nav.setAttribute('aria-hidden','false');
    hamburger && hamburger.setAttribute('aria-expanded','true');
    // prevent body scroll while nav open (mobile nicety)
    document.documentElement.style.overflow = 'hidden';
  }
  function closeNav(){
    if(!nav) return;
    nav.setAttribute('aria-hidden','true');
    hamburger && hamburger.setAttribute('aria-expanded','false');
    document.documentElement.style.overflow = '';
  }

  if(hamburger){
    hamburger.addEventListener('click', (e)=>{
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      if(expanded) closeNav(); else openNav();
    });
  }

  navClose && navClose.addEventListener('click', closeNav);

  // close nav on ESC
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && isOpen()) closeNav();
  });

  // close overlay when clicking outside inner area
  document.addEventListener('click', (e)=>{
    if(!nav || nav.getAttribute('aria-hidden') === 'true') return;
    const inner = nav.querySelector('.nav-inner');
    // if click is outside inner and not on hamburger, close
    if(!inner.contains(e.target) && !(hamburger && hamburger.contains(e.target))){
      closeNav();
    }
  });

  // smooth scrolling for same-page anchors
  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav after navigating (mobile behaviour)
        if(isOpen()) closeNav();
      }
    }
  });

  // optional: click on video to toggle play/pause (mobile-friendly)
  const vid = document.getElementById('video-idmiembro');
  if(vid){
    vid.addEventListener('click', function(e){
      if(e.target.tagName.toLowerCase() === 'video'){
        if(vid.paused) {
          vid.play().catch(()=>{/* autoplay/gesture restrictions */});
        } else {
          vid.pause();
        }
      }
    });
  }

})();

// === Carrusel de Momentos ===
(function(){
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  let index = 0;

  function updateCarousel(){
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if(next){
    next.addEventListener('click', ()=>{
      index = (index + 1) % items.length;
      updateCarousel();
    });
  }

  if(prev){
    prev.addEventListener('click', ()=>{
      index = (index - 1 + items.length) % items.length;
      updateCarousel();
    });
  }
})();
