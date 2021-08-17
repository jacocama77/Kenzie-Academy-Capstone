fetch(`https://jservice.io/api/random`)
.then(response => response.json())
.then(data => {
    let category = data[0].category_id
    console.log(data)
    let currentCategory = document.getElementById("category")
    console.log(category)
    currentCategory.append(data[0].category.title)

    fetch(`https://jservice.io/api/clues?category=${category}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        clues = data
        displayQuestion()
    })
   
})


let clues = []
let answers = []
let randomNumber
let score = 0
let currentClue 
let scoreboard = document.getElementById("score")

function updateScore(){
    scoreboard.innerText = score
}


function displayQuestion() {
    let question = document.getElementById("question")
    randomNumber = Math.floor(Math.random() * clues.length)
    currentClue = clues[randomNumber]
    question.innerText = currentClue.question
    console.log(currentClue)
}

let submitButton = document.getElementById("submitButton")
let newGame = document.getElementById("newGame")

submitButton.addEventListener("click", function(event){
    event.preventDefault()
    addScore()
})

function addScore(){
    let endGame = document.getElementById("endGame")
    console.log(document.getElementById("Answer").value.toLowerCase(), currentClue.answer.toLowerCase())
    if(document.getElementById("Answer").value.toLowerCase() === currentClue.answer.toLowerCase()) {
        score += 1
        updateScore()
        displayQuestion()
        endGame.innerText = "Correct!"
    } 
       else {
            score = 0
            updateScore()
            endGame.innerText = "Game Over"
    }
}

newGame.addEventListener("click", function(event){
    displayQuestion()
    endGame.innerText = ""
})