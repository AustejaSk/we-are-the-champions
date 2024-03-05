import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://we-are-the-champions-88a41-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const endorsementsInDB = ref(database, "endorsements")

const publishBtnEl = document.getElementById("publish-btn")
const inputFieldEl = document.getElementById("input-field")
const endorsementEl = document.getElementById("endorsement-el")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")

onValue(endorsementsInDB, function(snapshot){
    let endorsementsArray = Object.values(snapshot.val())
    endorsementsArray.reverse()
    clearEndorsementEl()
    for(let i = 0; i < endorsementsArray.length; i++) {
        appendItemToEndorsementEl(endorsementsArray[i])
    }
})

publishBtnEl.addEventListener("click", function(){
    let inputValue = `<span class='to-output'>To ${toInputEl.value}</span> ${inputFieldEl.value} <span class='from-output'>From ${fromInputEl.value}</span>`
    push(endorsementsInDB, inputValue)
    clearInputFieldEl()
})

function clearEndorsementEl() {
    endorsementEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function appendItemToEndorsementEl(itemValue) {
    endorsementEl.innerHTML += `<li>${itemValue}</li>`
}