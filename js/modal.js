function Modal(modalEl, overlayEl, cancelEl, triggerEl) {
  this.isOpen = false;
  this.modalEl = modalEl;
  this.overlayEl = overlayEl;

  let self = this;

  if (triggerEl) {
    triggerEl.addEventListener('click', self.openModal.bind(self));
  }
  cancelEl.addEventListener('click', self.closeModal.bind(self));

  return this;
} 

Modal.prototype.toggleModal = function() {
  // a11y
  this.modalEl.setAttribute('ariaHidden', !isOpen);
  this.overlayEl.setAttribute('ariaHidden', !isOpen);
  // toggle display
  this.modalEl.classList.toggle('hidden');
  this.overlayEl.classList.toggle('hidden');

  this.isOpen = !this.isOpen;
};

Modal.prototype.closeModal = function(e, cb) {
  // a11y
  this.modalEl.setAttribute('ariaHidden', 'true');
  this.modalEl.setAttribute('tabindex', '-1');
  this.overlayEl.setAttribute('ariaHidden', 'true');
  // toggle display
  this.modalEl.classList.add('hidden');
  this.overlayEl.classList.add('hidden');

  this.isOpen = false;

  if (cb) {
    cb();
  }
};

Modal.prototype.openModal = function(e, cb) {
  // a11y
  this.modalEl.setAttribute('ariaHidden', 'false');
  this.modalEl.focus();
  // TODO: focus trap & escape
  this.overlayEl.setAttribute('ariaHidden', 'false');
  this.modalEl.classList.remove('hidden');
  this.overlayEl.classList.remove('hidden');

  this.isOpen = true;

  if (cb) {
    cb();
  }
};


// todo: freeze screen overlay