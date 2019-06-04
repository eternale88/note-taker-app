'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}


renderNotes(notes, filters)


document.querySelector("#create-note").addEventListener("click", (e) => {
    const timeStamp = moment().valueOf()
    const id = uuidv4()
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    
    saveNotes(notes) //saves in localStorage
    location.assign(`/edit.html#${id}`)
})


document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})


window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters)
    }
})

