'use strict'

const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const removeElement = document.querySelector("#remove-note")
const dateElement = document.querySelector("#last-edited")


const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign("/index.html")   
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

//Edit and save note value
titleElement.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes)
})

//Edit and save body value
bodyElement.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes)
})

// Add remove note functionality to button
removeElement.addEventListener("click", (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign("/index.html")
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)

    }
})

