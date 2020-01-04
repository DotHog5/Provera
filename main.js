// Pravimo prazan niz u koji cemo smestati tekst iz input boxa
var notes = []
// Kreiranje novih elemenata svaki put kad korisnik nesto unese
var createNotes = function() {
  var ul = document.createElement('ul')
  ul.setAttribute('class', 'notes')
  
  
  notes.forEach(function (note) {
    var li = document.createElement('li')
    var notesElement = document.getElementById("notes")
    // Brisanje prethodno unesenog teksta(da se ne ponavlja svaki put tekst)
    if (notesElement.hasChildNodes()) {
      notesElement.removeChild(notesElement.childNodes[0]);
    }
    notesElement.appendChild(ul)

    ul.appendChild(li);
    li.appendChild(document.createTextNode(note.content))
  })

}

// request kojima pravimo novi file gde stavljamo podatke 
var sendToServer = function (note) {
  var xhttpForPost = new XMLHttpRequest()
  xhttpForPost.open("POST", '/new_note_spa', true)
  xhttpForPost.setRequestHeader("Content-type", "application/json")
  xhttpForPost.send(JSON.stringify(note));
}

window.onload = function (e) {
  var form = document.getElementById("notes_form")
  form.onsubmit = function (e) {
    e.preventDefault()

    var note = {
      content: e.target.elements[0].value,
      date: new Date()
    }

    notes.push(note)
    e.target.elements[0].value = ""
    createNotes()
    sendToServer(note)
  }
}
