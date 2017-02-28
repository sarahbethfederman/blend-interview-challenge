let formModule = (function() {
  let formEl,
      submitBtn,
      title,
      body,
      colors,
      isEdit,
      currNote;

  function init(el, submitEl, cancelEl) {
    formEl = el;
    submitBtn = submitEl;
    cancelEl.addEventListener('click', clearForm);

    colors = formEl.querySelectorAll('input[name="note-color"]');

    title = formEl.querySelector('#title');
    title.addEventListener('keyup', validateForm);

    body = formEl.querySelector('#body');
    body.addEventListener('keyup', validateForm);

    formEl.addEventListener('submit', submitForm);
  }

  function validateForm() {
    if (title.value && body.value)  {
      // if we have a title and body
      // enable submission
      submitBtn.removeAttribute('disabled');  
    } else {
      submitBtn.setAttribute('disabled', 'disabled');  
    }
  }

  function populateForm(note) {
    isEdit = true;
    currNote = note;
    formEl.parentNode.classList.remove('red', 'green', 'yellow', 'blue');
    formEl.parentNode.classList.add(note.color);
    title.value = note.title;
    body.value = note.body;

    for (let i = 0; i < colors.length; i++) {
      if (colors[i].value == note.color) {
        colors[i].checked = true;
      }
    }
  }

  function clearForm() {
    title.value = '';
    body.value = '';
    colors[0].checked = true;
    formEl.parentNode.classList.remove('green', 'yellow', 'blue');
    formEl.parentNode.classList.add('red');
    isEdit = false;
  }

  function submitForm(e) {
    e.preventDefault();
    let noteColor;
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].checked) {
        noteColor = colors[i].value;
      }
    }
    let note = {
      title: title.value,
      body: body.value,
      color: noteColor
    }

    if (isEdit) {
      note.id = currNote.id;
    }

    noteModule.save(note, isEdit);
    clearForm();
    modal.closeModal();
  }

  return {
    init: init,
    populate: populateForm
  };
})();