const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let clickCounter = 0
let gameStarted = false
let gameOver = false

$(document).on('keypress', function() {
    if(!gameStarted){
        $("#level-title").text(`Level ${level}`)
        nextSequence()
        gameStarted = true
    }
})

const checkAnswer = (currentLevel) => {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        gameOver = true
        $("#level-title").text("Game Over! Press any key to restart.")
        gameStarted = false
        level = 0
    }
}

const playSound = (selectedColour) => {
    var audio = new Audio(`./sounds/${selectedColour}.mp3`)
    audio.play()
}

const nextSequence = () => {
    userClickedPattern = []
    level++
    $("#level-title").text(`Level ${level}`)
    let randomChosenColour = buttonColours[Math.floor(4 * Math.random())]
    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

const animatePress = (currentColour) => {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
}

$(".btn").on("click", function() {
    userClickedPattern.push($(this).attr("id"))
    playSound($(this).attr("id"))
    animatePress($(this).attr("id"))
    checkAnswer(userClickedPattern.length - 1)
})