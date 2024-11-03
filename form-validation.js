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




function validate () {
  const isNameValid = validateNameAndLastName("name")
  const isSurnameValid = validateNameAndLastName("surname")

 return isNameValid && isSurnameValid
}

function validateNameAndLastName(nameOrSurname) {
  const inputElement = document.getElementById(nameOrSurname);
  const inputValue = inputElement.value;

  const errorID = nameOrSurname + 'Error'
  const surnameError = document.getElementById(errorID); 
  surnameError.textContent = "";

  if (inputValue === null || inputValue === "" || inputValue.length === 1) {
    
    
    surnameError.textContent = errorMessages.nameOrSurname;
    return false;
  }

  return true 
};




