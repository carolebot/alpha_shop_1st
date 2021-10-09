import './scss/main.scss'
console.log('JS loaded!')

const form = document.querySelector('.checkout__form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.querySelector('.checkout__steppers')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.querySelector('.btn__wrapper')
const prevBtn = btnControl.querySelector('.btn-outline')
const nextBtn = btnControl.querySelector('.btn-pink')
const cartPanel = document.querySelector('.cart__panel')
const shipPanel = document.querySelector('.ship__panel')
const fee = document.querySelector('.fee__price')
const total = document.querySelector('.total__price')
let step = 0 //進行步驟

// 上下步驟切換與表單變化
function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-pink')) {
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

// disable按鈕
function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute('disabled', 'disabled')
  } else {
    prevBtn.removeAttribute('disabled')
  }
  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
    nextBtn.setAttribute('disabled', 'disabled')
  } else {
    nextBtn.innerHTML = '下一步　→'
    nextBtn.removeAttribute('disabled')
  }
}

// 計算商品數
function countAmount(e) {
  const counter = e.target.parentElement.children[1]
  let amount = parseInt(counter.innerText, 10)
  if (e.target.matches('.plus')) {
    amount += 1
  } else {
    amount -= 1
    if (amount < 0) { return amount = 0 }
  }
  counter.innerText = amount
}

// 計算價格
function countPrice(e) {
  const counter = e.target.parentElement.children[1]
  const price = parseInt(counter.parentElement.parentElement.children[2].innerText, 10)
  let amount = parseInt(counter.innerText, 10)
  let totalPrice = parseInt(total.innerText, 10)
  if (e.target.matches('.plus')) {
    totalPrice += price
  } else {
    if (amount === 0) {
      return
    }
    totalPrice -= price
  }
  total.innerText = totalPrice
}

// 計算運費
function countShipFee(e) {
  let feePrice = (e.target.parentElement.children[2].innerText === '$500') ? '$500' : '免費'
  fee.innerText = feePrice
}


// 監聽上下步驟按鈕
btnControl.addEventListener('click', handleBtnControlClicked)

// 監聽數量增減按鈕
cartPanel.addEventListener('click', (e) => {
  if (e.target.matches('.product__counterBtn')) {
    countPrice(e)
    countAmount(e)
  }
})

// 監聽運費
shipPanel.addEventListener('click', (e) => {
  if (e.target.matches('input')) {
    countShipFee(e)
  }
})

