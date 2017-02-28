let modal, 
    delModal;

function init() {
  // notes
  noteModule.init();

  // modal
  let triggerEl = document.querySelector('.add-note');
  let modalEl = document.querySelector('.note-modal');
  let overlayEl = document.querySelector('.screen-overlay');
  let cancelEl = document.querySelector('.cancel-note');
  modal = new Modal(modalEl, overlayEl, cancelEl, triggerEl);

  // delete modal
  let delModalEl = document.querySelector('.delete-modal');
  let delCancelEl = document.querySelector('.cancel-delete');
  delModal = new Modal(delModalEl, overlayEl, delCancelEl);
  let delBtn = document.querySelector('.delete-note');
  delBtn.addEventListener('click', function(e) {
    delModal.closeModal();
    noteModule.delete(delBtn.getAttribute('data-id'));
  });

  // form
  let form = document.querySelector('form[name="note-form"]');
  let submitEl = document.querySelector('.save-note');
  formModule.init(form, submitEl, cancelEl);
}

document.addEventListener('DOMContentLoaded', init);

