const p1 = {
  score: 0,
  button: document.getElementById('playerOne'),
  display: document.getElementById('pOneScore'),
}

const p2 = {
  score: 0,
  button: document.getElementById('playerTwo'),
  display: document.getElementById('pTwoScore'),
}

const targetPtr = document.getElementById('targetPoint')
const reset = document.getElementById('reset')

let goal = 1
let finished = false

targetPtr.addEventListener('change', () => {
  clearScore()

  p1.button.disabled = false
  p2.button.disabled = false

  finished = false

  goal = parseInt(targetPtr.value)
})

p1.button.addEventListener('click', () => {
  if (!finished) {
    p1.score++
    updateScore(p1, p2, p1.score)

    if (p1.score === goal) {
      changeScoreColor(p1.display)

      p1.button.disabled = true
      p2.button.disabled = true

      finished = true
    }
  }
})

p2.button.addEventListener('click', () => {
  if (!finished) {
    p2.score++
    updateScore(p2, p1, p2.score)

    if (p2.score === goal) {
      changeScoreColor(p2.display)

      p1.button.disabled = true
      p2.button.disabled = true

      finished = true
    }
  }
})

reset.addEventListener('click', () => {
  clearScore()
  
  p1.button.disabled = false
  p2.button.disabled = false

  finished = false
})

function updateScore(player, opponent, score) {
  player.display.textContent = score

  if (player.display.id === 'pOneScore') {
    player.score = score
  } else {
    opponent.score = score
  }

  if (player.score === goal) {
    changeScoreColor(player.display)
    finished = true
  }
}

function changeScoreColor(pDisplay) {
  let sibling

  console.log(pDisplay)

  if (pDisplay.id === 'pOneScore') {
    sibling = pDisplay.nextElementSibling
    console.log('nextElem is: ', sibling)
  } else {
    sibling = pDisplay.previousElementSibling
    console.log('prevElem is: ', sibling)
  }

  pDisplay.classList.add('has-text-success')
  sibling.classList.add('has-text-danger')

  setTimeout(console.log(pDisplay, sibling), 5000)
}

function clearScore() {
  for(let p of [p1, p2]) {
    p.display.textContent = 0
    p.score = 0
    p.display.classList.remove('has-text-success', 'has-text-danger')
  }
  
  // p1.display.textContent = 0
  // p2.display.textContent = 0

  // p1.score = 0
  // p2.score = 0

  // p1.display.classList.remove('has-text-success', 'has-text-danger')
  // p2.display.classList.remove('has-text-success', 'has-text-danger')
}
