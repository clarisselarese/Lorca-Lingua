const errorMessages = {
  nameOrSurname: "Veuillez entrer deux caractères ou plus",
  emailRequired: "Veuillez entrer un email",
  invalidEmail: "Veuillez entrer un email valide",
  invalidPhoneNumber: "Veuillez entrer un numéro de téléphone valide",
  messageRequired: "Veuillez entrer un message",
  conditionsRequired: "Veuillez accepter les termes et conditions",
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
  const isPhoneNumberValid = validatePhoneNumber();
  const isMessageValid = validateMessage();
  const isConditionsValid = validateConditions();

  return (
    isNameValid &&
    isSurnameValid &&
    isEmailValid &&
    isPhoneNumberValid &&
    isMessageValid &&
    isConditionsValid
  );
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

function validateEmail() {
  const inputEmail = document.getElementById("email");
  const emailValue = inputEmail.value;
  const emailError = document.getElementById("emailError");
  emailError.textContent = "";

  if (emailValue === null || emailValue === "") {
    emailError.textContent = errorMessages.emailRequired;
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isRegexValid = emailRegex.test(emailValue);

  if (!isRegexValid) {
    emailError.textContent = errorMessages.invalidEmail;
    return false;
  } else {
    return true;
  }
}

function validatePhoneNumber() {
  const phoneNumberInput = document.getElementById("phoneNumber");
  const phoneNumberValue = phoneNumberInput.value;
  const phoneNumberError = document.getElementById("phoneNumberError");
  phoneNumberError.textContent = "";

  const regexFrenchNumber = /^(\+33|0)(\s?\d{1}\s?|\s?\d{2}\s?)(\d{2}\s?){4}$/;
  const isFrenchNumberValid = regexFrenchNumber.test(phoneNumberValue);

  const regexInternationalNumber =
    /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{8,14}$/;

  const isInternationalNumberValid =
    regexInternationalNumber.test(phoneNumberValue);

  if (
    phoneNumberValue !== "" &&
    !(isFrenchNumberValid || isInternationalNumberValid)
  ) {
    phoneNumberError.textContent = errorMessages.invalidPhoneNumber;
    return false;
  } else {
    return true;
  }
}

function validateMessage() {
  const messageInput = document.getElementById("message");
  const messageValue = messageInput.value;
  const messageError = document.getElementById("messageError");
  messageError.textContent = "";

  if (messageValue === "") {
    messageError.textContent = errorMessages.messageRequired;
    return false;
  } else {
    return true;
  }
}

function validateConditions() {
  const conditionsCheckbox = document.getElementById("checkbox");
  const conditionsError = document.getElementById("checkboxError");
  conditionsError.textContent = "";

  if (!conditionsCheckbox.checked) {
    conditionsError.textContent = errorMessages.conditionsRequired;
    return false;
  } else {
    return true;
  }
}
