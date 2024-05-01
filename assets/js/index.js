const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const data = JSON.parse(localStorage.getItem("user_data"));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  resetErrors();

  if (data) {
    for (let i = 0; i < data.length; i++){
        if (email.value == data[i].email) {
          if (password.value == data[i].password) {
            localStorage.setItem("logged-in", JSON.stringify(data[i]));
            location.href = "./mainpage.html";
          } else {
            passwordError.textContent = "Incorrect Password";
          }
          break;
        }
        else {
            emailError.textContent = "Incorrect Email";
        }
    }
} else {
    emailError.textContent = "No account found";
}
}

function resetErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
}
