/* Small, framework-free interactions; no WordPress or third-party JS dependencies. */
(() => {
  'use strict';
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#mobile-navigation');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.hidden = !open;
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    document.addEventListener('click', (event) => {
      if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    const wide = window.matchMedia('(min-width: 851px)');
    wide.addEventListener('change', () => { if (wide.matches) setOpen(false); });
  }
  const copyrightYear = document.querySelector('#year');
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear().toString();
  const contact = document.querySelector('#contact-form');
  if (contact) {
    contact.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contact.reportValidity()) return;
      const fields = new FormData(contact);
      const str = (name) => (fields.get(name) || '').toString().trim();
      const subject = `Project enquiry: ${str('service')}`;
      const body = [
        `Name: ${str('name')}`, `Email: ${str('email')}`, `Phone: ${str('phone') || 'Not supplied'}`,
        `Service: ${str('service')}`, '', 'Project details:', str('message')
      ].join('\n');
      const url = `mailto:info@tajconbuilders.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = document.querySelector('#form-status');
      if (status) status.textContent = 'Your email app should open with the draft. Please press Send there to submit your enquiry.';
      window.location.href = url;
    });
  }
})();
