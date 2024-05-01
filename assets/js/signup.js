const form = document.getElementById("signup-form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const gender = document.getElementById("gender");
const dateOfBirth = document.getElementById("dateOfBirth");

const firstNameError = document.getElementById("firstName-error");
const lastNameError = document.getElementById("lastName-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const genderError = document.getElementById("gender-error");
const dateOfBirthError = document.getElementById("dateOfBirth-error");

let userArr = JSON.parse(localStorage.getItem('user_data')) || []

form.addEventListener("submit", function (event) {
  event.preventDefault();
//   console.log("Form submitted");
  validateForm();
});

function validateForm() {
//   console.log("Validating form");

  resetErrors();

  let isValid = true;

  if (!isValidName(firstName.value)) {
    // console.log("Invalid first name:", firstName.value);
    firstNameError.textContent = "Please enter a valid first name.";
    isValid = false;
  }

  if (!isValidName(lastName.value)) {
    // console.log("Invalid last name:", lastName.value);
    lastNameError.textContent = "Please enter a valid last name.";
    isValid = false;
  }

  if (!isValidEmail(email.value)) {
    // console.log("Invalid email:", email.value);
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (password.value.length < 8) {
    // console.log("Invalid password length:", password.value);
    passwordError.textContent = "Password must be at least 8 characters long.";
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    // console.log(
    //   "Passwords do not match:",
    //   password.value,
    //   confirmPassword.value
    // );
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  }

  if (gender.value === "") {
    // console.log("Gender not selected");
    genderError.textContent = "Please select your gender.";
    isValid = false;
  }

  if (dateOfBirth.value === "") {
    // console.log("Date of birth not selected");
    dateOfBirthError.textContent = "Please select your date of birth.";
    isValid = false;
  }

  if (isValid) {
    // console.log("Form is valid. Submitting form");
    // alert("Sign up successful!");
    
    const data = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        gender: gender.value,
        date_of_birth: dateOfBirth.value
    }
    userArr.push(data)
    // console.log(userArr)
    localStorage.setItem('user_data', JSON.stringify(userArr))
    form.reset();
    location.href='./index.html'
  }
}

function isValidName(name) {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name);
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function resetErrors() {
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  genderError.textContent = "";
  dateOfBirthError.textContent = "";
}


