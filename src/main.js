import './scss/main.scss'
console.log('JS loaded!')


let step = 0 //進行步驟

const form = document.querySelector('.checkout__form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.querySelector('.checkout__steppers')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.querySelector('.btn__wrapper')
const prevBtn = btnControl.querySelector('.btn-outline')
const nextBtn = btnControl.querySelector('.btn-pink')

form.addEventListener('click', (event)=> {
  console.log(event)
})


// 監聽商品計算按鈕

btnControl.addEventListener('click', handleBtnControlClicked)
// 監聽上一步下一步按鈕
function handleBtnControlClicked(e) {
  console.log('hi')
  e.preventDefault() //避免送出refresh
  const nowStep = steps[step]
  if (e.target.matches('.btn-pink') && e.target.innerHTML === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}


function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute('disabled', 'disabled')
  } else {
    prevBtn.removeAttribute('disabled')
  }

  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步'
  }
}
