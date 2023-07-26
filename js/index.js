const monsterUrl = 'http://localhost:3000/monsters'
// const firstFifty = '?_limit=50&_page=1'
let page = 1;
const firstFifty = `http://localhost:3000/monsters?_limit=50&_page=${page}`



const monsterContainer = document.getElementById('monster-container')

// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
fetch(firstFifty)
.then(r => r.json())
.then(monsters => renderData(monsters))

function renderData(monsters) {
    monsters.forEach(monsterObject => {
        createMonsterCard(monsterObject.name, monsterObject.age, monsterObject.description)
    })
}

function createMonsterCard(name, age, description) {
    const monsterCard = document.createElement('div')
    
    const monsterName = document.createElement('h2')
    monsterName.innerText = name;
    
    const monsterAge = document.createElement('h4')
    monsterAge.innerText = 'Age: ' + age;
    
    const monsterDescription = document.createElement('p')
    monsterDescription.innerText = 'Description: ' + description;
    
    monsterCard.append(monsterName, monsterAge, monsterDescription)
    
    monsterContainer.appendChild(monsterCard)
}

// Above your list of monsters, you should have a form to create a new monster. (see HTML)
// You should have fields for name, age, and description, and a 'Create Monster Button'. (see HTML)
// When you click the button, the monster should be added to the list and saved in the API.
const newMonsterSubmitButton = document.getElementById('create-monster-form')
newMonsterSubmitButton.onsubmit = addNewMonster

function addNewMonster(e) {
    e.preventDefault()
    const newMonsterName = document.getElementById('new-monster-name').value
    const newMonsterAge = document.getElementById('new-monster-age').value
    const newMonsterDescription = document.getElementById('new-monster-description').value
    createMonsterCard(newMonsterName, newMonsterAge, newMonsterDescription)
    addToApi(newMonsterName, newMonsterAge, newMonsterDescription)
    e.target.reset()
}

function addToApi(name, age, description) {
    fetch(monsterUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    })
}

// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
const backFifty = document.getElementById('back')
backFifty.onclick = backOnePage 

function backOnePage(e) {
    e.preventDefault()
    monsterContainer.textContent = ""
    page = page - 1; //or page -= 1;
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(r => r.json())
    .then(monsters => renderData(monsters))
}

const forwardFifty = document.getElementById('forward')
forwardFifty.onclick = forwardOnePage 

function forwardOnePage(e) {
    e.preventDefault()
    monsterContainer.textContent = ""
    page = page + 1; //or page += 1;
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(r => r.json())
    .then(monsters => renderData(monsters))
}
