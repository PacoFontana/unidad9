// JavaScript simple interactivity: menú y mejoras móviles
(function(){
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  const navClose = document.getElementById('nav-close');
  const yearEls = document.querySelectorAll('#year, #year2');

  function setYear(){
    const y = new Date().getFullYear();
    yearEls.forEach(el=> el.textContent = y);
  }
  setYear();

  function openNav(){
    nav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded','true');
  }
  function closeNav(){
    nav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded','false');
  }

  hamburger && hamburger.addEventListener('click', ()=>{
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    if(expanded) closeNav(); else openNav();
  });

  navClose && navClose.addEventListener('click', closeNav);

  // close nav on ESC
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeNav();
  });

  // close overlay when clicking outside inner area
  document.addEventListener('click', (e)=>{
    if(!nav) return;
    const inner = nav.querySelector('.nav-inner');
    if(nav.getAttribute('aria-hidden') === 'false' && !inner.contains(e.target) && !hamburger.contains(e.target)){
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
