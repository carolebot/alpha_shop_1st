import './scss/main.scss'
console.log('JS loaded!')

const html = document.querySelector('.html')
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
const darkModeToggle = document.querySelector('.darkModeToggle')

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
  let totalPrice = parseInt(total.innerText, 10)
  fee.innerText = feePrice
  total.innerText = (feePrice === '免費')
    ? totalPrice - 500 : totalPrice + 500
}

function darkMode(e) {
  //change color
  html.classList.toggle('dark')
  //change logo
  let logos = document.querySelectorAll('.logo')
  let logoUrl = (logos[0].src === 'https://i.ibb.co/k1NmtNQ/nFCV3OM.png')
    ? 'https://i.ibb.co/vmhbnbs/Logo.png'
    : 'https://i.ibb.co/k1NmtNQ/nFCV3OM.png'

  logos.forEach(logo => {
    logo.src = logoUrl
  })

  //change icon
  if (html.classList.contains('dark')) {
    return darkModeToggle.innerHTML = `<path d="M11.9999 4.20669C12.1767 4.20669 12.3463 4.13645 12.4713 4.01143C12.5963 3.8864 12.6666 3.71683 12.6666 3.54002V1.27336C12.6666 1.09655 12.5963 0.926976 12.4713 0.801952C12.3463 0.676927 12.1767 0.606689 11.9999 0.606689C11.8231 0.606689 11.6535 0.676927 11.5285 0.801952C11.4035 0.926976 11.3333 1.09655 11.3333 1.27336V3.54002C11.3333 3.71683 11.4035 3.8864 11.5285 4.01143C11.6535 4.13645 11.8231 4.20669 11.9999 4.20669Z" fill="white" fill-opacity="0.8"/>
    <path d="M11.9999 19.7933C11.8231 19.7933 11.6535 19.8636 11.5285 19.9886C11.4035 20.1136 11.3333 20.2832 11.3333 20.46V22.7267C11.3333 22.9035 11.4035 23.073 11.5285 23.1981C11.6535 23.3231 11.8231 23.3933 11.9999 23.3933C12.1767 23.3933 12.3463 23.3231 12.4713 23.1981C12.5963 23.073 12.6666 22.9035 12.6666 22.7267V20.46C12.6666 20.2832 12.5963 20.1136 12.4713 19.9886C12.3463 19.8636 12.1767 19.7933 11.9999 19.7933Z" fill="white" fill-opacity="0.8"/>
    <path d="M5.54668 6.49335C5.67065 6.60603 5.83249 6.66792 6.00001 6.66668C6.08775 6.66719 6.17473 6.65037 6.25595 6.6172C6.33718 6.58402 6.41105 6.53514 6.47335 6.47335C6.53583 6.41137 6.58543 6.33764 6.61928 6.2564C6.65312 6.17516 6.67055 6.08802 6.67055 6.00002C6.67055 5.91201 6.65312 5.82487 6.61928 5.74363C6.58543 5.66239 6.53583 5.58866 6.47335 5.52668L4.88668 3.94668C4.75915 3.83746 4.5951 3.78039 4.42731 3.78687C4.25953 3.79335 4.10037 3.86291 3.98164 3.98164C3.86291 4.10037 3.79335 4.25953 3.78687 4.42731C3.78039 4.5951 3.83746 4.75915 3.94668 4.88668L5.54668 6.49335Z" fill="white" fill-opacity="0.8"/>
    <path d="M18.4533 17.5067C18.3911 17.4445 18.3173 17.3952 18.2361 17.3616C18.1549 17.3279 18.0678 17.3106 17.9799 17.3106C17.892 17.3106 17.805 17.3279 17.7238 17.3616C17.6426 17.3952 17.5688 17.4445 17.5066 17.5067C17.4444 17.5688 17.3951 17.6426 17.3615 17.7238C17.3279 17.8051 17.3105 17.8921 17.3105 17.98C17.3105 18.0679 17.3279 18.155 17.3615 18.2362C17.3951 18.3174 17.4444 18.3912 17.5066 18.4533L19.1133 20.0533C19.175 20.1163 19.2486 20.1664 19.3299 20.2008C19.4111 20.2351 19.4984 20.253 19.5866 20.2533C19.7625 20.2508 19.9302 20.1789 20.0533 20.0533C20.1774 19.9284 20.2471 19.7595 20.2471 19.5833C20.2471 19.4072 20.1774 19.2382 20.0533 19.1133L18.4533 17.5067Z" fill="white" fill-opacity="0.8"/>
    <path d="M4.20669 12C4.20669 11.8232 4.13645 11.6536 4.01143 11.5286C3.8864 11.4036 3.71683 11.3333 3.54002 11.3333H1.27336C1.09655 11.3333 0.926976 11.4036 0.801952 11.5286C0.676927 11.6536 0.606689 11.8232 0.606689 12C0.606689 12.1768 0.676927 12.3464 0.801952 12.4714C0.926976 12.5964 1.09655 12.6666 1.27336 12.6666H3.54002C3.71683 12.6666 3.8864 12.5964 4.01143 12.4714C4.13645 12.3464 4.20669 12.1768 4.20669 12Z" fill="white" fill-opacity="0.8"/>
    <path d="M22.7265 11.3333H20.4599C20.2831 11.3333 20.1135 11.4036 19.9885 11.5286C19.8635 11.6536 19.7932 11.8232 19.7932 12C19.7932 12.1768 19.8635 12.3464 19.9885 12.4714C20.1135 12.5964 20.2831 12.6666 20.4599 12.6666H22.7265C22.9034 12.6666 23.0729 12.5964 23.198 12.4714C23.323 12.3464 23.3932 12.1768 23.3932 12C23.3932 11.8232 23.323 11.6536 23.198 11.5286C23.0729 11.4036 22.9034 11.3333 22.7265 11.3333Z" fill="white" fill-opacity="0.8"/>
    <path d="M5.54672 17.5067L3.94672 19.1133C3.8531 19.2062 3.78912 19.3247 3.76286 19.4539C3.73661 19.5831 3.74925 19.7172 3.7992 19.8392C3.84916 19.9613 3.93417 20.0657 4.04349 20.1394C4.15281 20.2131 4.28153 20.2528 4.41338 20.2533C4.50159 20.253 4.58884 20.2351 4.67009 20.2008C4.75134 20.1664 4.82497 20.1163 4.88672 20.0533L6.49338 18.4533C6.61892 18.3278 6.68945 18.1575 6.68945 17.98C6.68945 17.8025 6.61892 17.6322 6.49338 17.5067C6.36785 17.3811 6.19758 17.3106 6.02005 17.3106C5.84252 17.3106 5.67225 17.3811 5.54672 17.5067Z" fill="white" fill-opacity="0.8"/>
    <path d="M18.0001 6.66665C18.0879 6.66716 18.1748 6.65034 18.2561 6.61716C18.3373 6.58399 18.4112 6.5351 18.4735 6.47332L20.0735 4.86665C20.1976 4.74174 20.2673 4.57277 20.2673 4.39665C20.2673 4.22053 20.1976 4.05156 20.0735 3.92665C19.9485 3.80248 19.7796 3.73279 19.6035 3.73279C19.4273 3.73279 19.2584 3.80248 19.1335 3.92665L17.5268 5.52665C17.4643 5.58862 17.4147 5.66236 17.3809 5.7436C17.347 5.82484 17.3296 5.91197 17.3296 5.99998C17.3296 6.08799 17.347 6.17513 17.3809 6.25637C17.4147 6.33761 17.4643 6.41134 17.5268 6.47332C17.5891 6.5351 17.663 6.58399 17.7442 6.61716C17.8254 6.65034 17.9124 6.66716 18.0001 6.66665Z" fill="white" fill-opacity="0.8"/>
    <path d="M12.0866 5.16669C10.7473 5.14951 9.43324 5.53092 8.31132 6.26246C7.18939 6.994 6.31033 8.04262 5.78587 9.27502C5.26141 10.5074 5.11525 11.8679 5.36596 13.1836C5.61666 14.4993 6.25292 15.7107 7.19385 16.6639C8.13478 17.617 9.33788 18.2689 10.6502 18.5366C11.9625 18.8042 13.3248 18.6757 14.5639 18.1672C15.803 17.6587 16.8628 16.7932 17.6088 15.6808C18.3548 14.5684 18.7531 13.2594 18.7533 11.92C18.7621 10.1412 18.0654 8.43144 16.8157 7.16551C15.566 5.89958 13.8654 5.18079 12.0866 5.16669ZM12.0866 17.3334C11.0108 17.3506 9.95424 17.0472 9.05145 16.4619C8.14866 15.8766 7.4405 15.0359 7.01714 14.0467C6.59379 13.0576 6.4744 11.9648 6.67418 10.9076C6.87396 9.85043 7.38387 8.8766 8.13898 8.11017C8.89409 7.34374 9.86022 6.81938 10.9143 6.60388C11.9685 6.38839 13.0629 6.49149 14.0582 6.90007C15.0535 7.30866 15.9047 8.00423 16.5034 8.8982C17.102 9.79218 17.4211 10.8441 17.4199 11.92C17.427 13.3441 16.87 14.713 15.8705 15.7274C14.8711 16.7419 13.5106 17.3193 12.0866 17.3334Z" fill="white" fill-opacity="0.8"/>`
  }
  darkModeToggle.innerHTML = `<path xmlns="http://www.w3.org/2000/svg"
  d="M9.5 1.5C5.75 1.5 1.25 5.25 1.25 11.25C1.25 17.25 5.75 21.75 11.75 21.75C17.75 21.75 21.5 17.25 21.5 13.5C13.25 18.75 4.25 9.75 9.5 1.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`
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

// 監聽darkMode
darkModeToggle.addEventListener('click', (e) => {
  darkMode(e)
})
