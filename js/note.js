let noteModule = (function() {
  let container;

  function init() {
    container = document.querySelector('main');

    // if we don't have a db
    if (!localStorage['notesDB']) {
      let data = { notes: [] };
      saveData(data);
    } else {
      // look up our notes
      let notes = getAllData().notes;
      for (let i = 0; i < notes.length; i++) {
        renderNote(notes[i]);
      }
    }
  }

  function saveData(data) {
    localStorage['notesDB'] = JSON.stringify(data);
  }

  function getAllData() {
    return JSON.parse(localStorage['notesDB']);
  }

  function saveNote(updateData, isEdit) {
    let data = getAllData();
    let notes = data.notes;

    if (isEdit) {
      let id = updateData.id;
      console.log(id);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
          notes[i]['title'] = updateData.title;
          notes[i]['body'] = updateData.body;
          notes[i]['color'] = updateData.color;
        }
      }
      saveData(data);
      renderNote(updateData, isEdit);
    } else {
      // generate an id
      updateData.id = new Date().getTime();

      notes.push(updateData);
      saveData(data);
      renderNote(updateData);
    }
  }

  function renderNote(note, isEdit) {
    let markup;
    if (isEdit) {
      // use existing markup
      markup = document.querySelector(`[data-id="${note.id}"]`);
      markup.className = 'note ' + note.color;
    } else {
      markup = document.createElement('article');
      markup.className = 'note ' + note.color;
      markup.setAttribute('data-id', note.id);
    }

    let template = `<header class="note__header">
          <h2 class="note__title">${note.title}</h2>
          <div class="note__actions">
            <button class="note__edit-btn">
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
            <button class="note__delete-btn" data-id="${note.id}">
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
          </div>
        </header>
        <div class="note__body">
          ${note.body}
        </div>`;

    markup.innerHTML = template;
    bindEvents(note, markup);

    if (!isEdit) {
      container.insertBefore(markup, container.firstChild);
    }
  }

  function bindEvents(note, markup) {
    // add event listeners
    markup.querySelector('.note__delete-btn').addEventListener('click', function(e) {
      delModal.openModal(e, function() {
        // set the delete btns target open
        document.querySelector('.delete-note').setAttribute('data-id', note.id);
      });
    });

    markup.querySelector('.note__edit-btn').addEventListener('click', function(e) {
      formModule.populate(note);
      modal.openModal();
    });
  }

  function deleteNote(id) {
    let data = getAllData();
    let notes = data.notes;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id == id) {
        notes.splice(i, 1);
        break;
      }
    }
    saveData(data);
    document.querySelector(`[data-id="${id}"]`).remove();
  }

  function createNote(title, body, color) {
    let note = {};
    
    note.title = title;
    note.body = body;
    note.color = color;

    saveNote(note);
  }

  // Public api
  return {
    create: createNote,
    save: saveNote,
    delete: deleteNote,
    init: init
  };
})();