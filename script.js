const passwordDisplay = document.querySelector(".password-display")
const copyBtn = document.querySelector(".copy-btn")
const lengthInput = document.getElementById("length")
const uppercaseCheck = document.getElementById("uppercase")
const numbersCheck = document.getElementById("numbers")
const symbolsCheck = document.getElementById("symbols")
const generateBtn = document.querySelector(".generate-btn")
const strengthMeterFill = document.querySelector(".strength-meter-fill")

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

function generatePassword() {
  let chars = lowercase
  let password = ""

  if (uppercaseCheck.checked) chars += uppercase
  if (numbersCheck.checked) chars += numbers
  if (symbolsCheck.checked) chars += symbols

  for (let i = 0; i < lengthInput.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

  passwordDisplay.textContent = password
  updateStrengthMeter(password)
  return password
}

function updateStrengthMeter(password) {
  let strength = 0

  if (password.length >= 12) strength += 25
  if (password.match(/[A-Z]/)) strength += 25
  if (password.match(/[0-9]/)) strength += 25
  if (password.match(/[^A-Za-z0-9]/)) strength += 25

  strengthMeterFill.style.width = strength + "%"

  if (strength <= 25) {
    strengthMeterFill.style.background = "#ff4444"
  } else if (strength <= 50) {
    strengthMeterFill.style.background = "#ffbb33"
  } else if (strength <= 75) {
    strengthMeterFill.style.background = "#00C851"
  } else {
    strengthMeterFill.style.background = "#007E33"
  }
}

async function copyPassword() {
  const password = passwordDisplay.textContent
  if (password === "Generate a password") return

  try {
    await navigator.clipboard.writeText(password)
    copyBtn.textContent = "Copied!"
    setTimeout(() => {
      copyBtn.textContent = "Copy"
    }, 2000)
  } catch (err) {
    console.error("Failed to copy password:", err)
  }
}

generateBtn.addEventListener("click", generatePassword)
copyBtn.addEventListener("click", copyPassword)
