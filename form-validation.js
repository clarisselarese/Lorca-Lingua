const errorMessages = {
  nameOrSurname: "Veuillez entrer deux caractères ou plus",
  emailRequired: "Veuillez entrer un email",
  invalidEmail: "Veuillez entrer un email valide",
  message: "Veuillez entrer un message",
  conditions: "Veuillez accepter les termes et conditions",
};

const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  if (!validate()) {
    e.preventDefault();
  }
});

function validate() {
  const isNameValid = validateNameAndSurname("name");
  const isSurnameValid = validateNameAndSurname("surname");
  const isEmailValid = validateEmail();

  return isNameValid && isSurnameValid && isEmailValid;
}

function validateNameAndSurname(nameOrSurname) {
  const inputElement = document.getElementById(nameOrSurname);
  const inputValue = inputElement.value;

  const errorID = nameOrSurname + "Error";

  const surnameError = document.getElementById(errorID);
  surnameError.textContent = "";

  if (inputValue === null || inputValue === "" || inputValue.length === 1) {
    surnameError.textContent = errorMessages.nameOrSurname;
    return false;
  } else {
    return true;
  }
}

function validateEmail () {
  const inputEmail = document.getElementById("email");
  const emailValue = inputEmail.value;

  const emailError = document.getElementById("emailError");
  emailError.textContent = "";

  if (emailValue === null || emailValue === "") {
    emailError.textContent = errorMessages.emailRequired;
    return false;
  } 

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isRegexValid = emailRegex.test(emailValue)

  if (!isRegexValid) {
    emailError.textContent = errorMessages.invalidEmail;
    return false
  }

  return true
  
}

