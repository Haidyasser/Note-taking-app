// Purpose: To handle the note CRUD operations and UI updates

// read notes from the server
window.onload = function () {
  fetch('/notes')
    // print notes sample data
    .then(response => response.json())
    .then(notes => {
      const notesContainer = document.getElementById('noteContainer');
      notes.message.forEach(note => {
        console.log(note)
        const noteCard = generateNoteCard(note);
        notesContainer.innerHTML += noteCard;
      });
    })
    .catch(error => console.error('Error:', error));
};

// Function to generate the HTML for a note card
function generateNoteCard(note) {
  console.log('generateNoteCard')
  let mapColor = {
    white: "lightgray",
    blue: "lightblue",
    red: "lightcoral",
    green: "lightgreen",
    orange: "lightsalmon",
  }
  // if the color is not in the map, set it to lightgray
  if(note.color in mapColor == false){
    note.color = "lightgray";
  }
  note.color = mapColor[note.color];
  console.log(note)
  return `
  <div class="col-md-4">
    <div class="card mt-4" style="background-color: ${note.color}">
      <div class="card-header d-flex justify-content-between">
        <div class="d-flex justify-content-around"> 
          <button type="button" class="delete-btn btn btn-danger btn-sm mr-2" data-note-id=${note._id}>X</button>
          <button type="button" class="eNote btn btn-warning btn-sm mr-2" data-note-id=${note._id}>E</button>
        </div>
        <h5 class="mb-0">${note.title}</h5>
      </div>
      <div class="card-body">
        <p>${note.text}</p>
      </div>
    </div>
  </div>
`;
}

// Function to add a new note to the database and the UI
function addNote(note) {
  console.log('addNote')
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(response => response.json())
    .then(note => {
      const noteCard = generateNoteCard(note.message);
      document.getElementById('noteContainer').innerHTML += noteCard;
      $('#addNoteModal').modal('hide');
      document.getElementById('addNoteForm').reset();
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for form submission
document.getElementById('addNoteForm').addEventListener('submit', function (event) {
  console.log(document.getElementById('addNoteForm'))
  event.preventDefault();
  const note = {
    title: document.getElementById('note-title').value,
    text: document.getElementById('note-text').value,
    color: document.getElementById('note-color').value,
  };
  addNote(note);
}
);

// Function to delete a note
function deleteNote(noteId) {
  console.log('deleteNote')
  console.log(noteId)
  fetch(`/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) { // Check if response went through
        location.reload(); // Reload the page to update the notes
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to edit a note
function editNoteForm(noteId) {
  console.log('editNoteForm')
  fetch(`/notes/${noteId}`)
    .then(response => response.json())
    .then(note => {
      console.log(note)
      document.getElementById('edit-note-title').value = note.message.title;
      document.getElementById('edit-note-text').value = note.message.text;
      document.getElementById('edit-note-color').value = note.message.color;
      document.getElementById('edit-note-id').value = note.message._id;
      $('#editNoteModal').modal('show');
    })
    .catch(error => console.error('Error:', error));
}

// form submission for editing a note as pop up modal
document.getElementById('editNoteForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const note = {
    title: document.getElementById('edit-note-title').value,
    text: document.getElementById('edit-note-text').value,
    color: document.getElementById('edit-note-color').value,
  };
  const noteId = document.getElementById('edit-note-id').value;
  fetch(`/notes/${noteId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then(response => {
      if (response.ok) { // Check if response went through
        location.reload(); // Reload the page to update the notes
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => console.error('Error:', error));
}
);

document.getElementById('noteContainer').addEventListener('click', function (event) {
  console.log('noteContainer')
  if (event.target.classList.contains('delete-btn')) {
    const noteId = event.target.getAttribute('data-note-id');
    deleteNote(noteId);
  }
  else if (event.target.classList.contains('eNote')) {
    // open the edit note form then fill it with the note data to be edited
    const noteId = event.target.getAttribute('data-note-id');
    editNoteForm(noteId);
  }
}
);
