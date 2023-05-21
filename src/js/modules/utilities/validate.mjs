/**
 * Validates the provided data based on the specified type.
 * @param {Object} data - The data to validate.
 * @param {string} type - The type of validation to perform ("register" or "login").
 * @returns {boolean} True if the data is valid, false otherwise.
 */

export default function validate(data, type) {
    
    let valid = 0;
  
    const emailError = document.querySelector("#emailError");
    const loginError = document.querySelector("#loginError");
  
    const email = data.email;
    const regex = /[a-w.]+@stud.noroff.no/g;
    const result = regex.test(email);
  
    if (!result && type === "register") {
      emailError.classList.remove("hidden");
      valid++;
    } else if (!result) {
      loginError.classList.remove("hidden");
      valid++;
    } else {
      emailError.classList.add("hidden");
      loginError.classList.add("hidden");
    }
  
    //Check password length
    const passError = document.querySelector("#passwordError");
  
    if (data.password.length < 8) {
      passError.classList.remove("hidden");
      valid++;
    } else {
      passError.classList.add("hidden");
    }
  
    if (type === "register") {
      //Make sure the passwords match
      const confError = document.querySelector("#confirmError");
  
      if (data.password !== data.confirm) {
        confError.classList.remove("hidden");
        valid++;
      } else {
        confError.classList.add("hidden");
      }
  
      //Make sure a username is entered;
      const usernameError = document.querySelector("#usernameError");
  
      if (data.name.length < 2) {
        usernameError.classList.remove("hidden");
        valid++;
      } else {
        usernameError.classList.add("hidden");
      }
    }
    if (valid === 0) {
      return true;
    } else {
      return false;
    }
  }