/* Steps To solve  */
/* 
=> on sign up button click 
  [1] check if the password and confirm password values mach 
  [2] check if the password meet the regex (one uppercase , one lowercase , one number , one alphanumaric char at least )
  [3] if both true check if the data is not in the local storage 
  [4] if not push new user to the local storage 
  [5] pop out (sucess)
  [6] if true pop out ("user already exsit ... sign in insted ")

=> on sign in button click 
  [1] check if the intered data is in the local storage 
  [2] if true check if valid
  [3] if not valid pop out (user name or password incorrect)
  [4] if valid pop out (sucsess)
  [5] if not pop out user dont exsit pop out (sign up insted)
*/

/* Selectors */

/* Sign Up form */
const singUp = document.querySelector(".container.signup");
const signUpUserName = document.querySelector(".sing-up-username");
const email = document.querySelector(".email");
const pass = document.querySelector(".sing-up-password");
const confirmPass = document.querySelector(".conf-pass");
const sginUpButton = document.querySelector(".sing-up button");
const switchToSignIn = document.querySelector(".sing-up a");
const userNameError = document.querySelector(".user.error");
const mailError = document.querySelector(".mail.error");
const passError = document.querySelector(".pass.error");
const conPassError = document.querySelector(".passcon.error");

/* Sign In form */
const signIn = document.querySelector(".container.signin");
const signInUsername = document.querySelector(".sign-in-username");
const signInUserError = document.querySelector(".sign-in-user.error");
const signInPassword = document.querySelector(".sign-in-password");
const signInPassError = document.querySelector(".sign-in-pass.error");
const signInError = document.querySelector(".sign-in-error");
const sginInButton = document.querySelector(".sign-in button");
const switchToSignUp = document.querySelector(".sign-in a");



/* toggle forms */

switchToSignIn.onclick = function (e) {
  e.preventDefault();
  singUp.classList.add("upslide");
  signIn.classList.add("inslide");
};
switchToSignUp.onclick = function (e) {
  e.preventDefault();
  singUp.classList.remove("upslide");
  signIn.classList.remove("inslide");
};

/* Create users array */

let users = [];
if (window.localStorage.getItem("users") == null) {
  window.localStorage.setItem("users", JSON.stringify(users));
} else {
  users = JSON.parse(window.localStorage.getItem("users"));
}
window.onload = function () {
  signUpUserName.focus();
};

/* validate sign up form  */

/* validate user name input  */
signUpUserName.onblur = function () {
  if (this.value == "") {
    signUpUserName.classList.add("invalid");
    userNameError.innerText = `Name Cannot Be Empty`;
  } else if (userRegex(this.value) == true) {
    if (checkUserName(this.value) == false) {
      signUpUserName.classList.add("valid");
      signUpUserName.classList.remove("invalid");
      userNameError.innerText = ``;
      email.focus();
    } else {
      signUpUserName.classList.remove("valid");
      signUpUserName.classList.add("invalid");
      userNameError.innerText = `Name Already Exsists`;
    }
  } else {
    signUpUserName.classList.remove("valid");
    signUpUserName.classList.add("invalid");
    userNameError.innerText = `Name Should be 8 to 15 charachters `;
  }
};

/* Validate Email Input */
email.onblur = function () {
  if (this.value == "") {
    email.classList.add("invalid");
    mailError.innerText = `Email Cannot Be Empty`;
  } else if (mailRegex(this.value) == true) {
    if (checkEmail(this.value) == false) {
      email.classList.add("valid");
      email.classList.remove("invalid");
      mailError.innerText = ``;
      pass.focus();
    } else {
      email.classList.remove("valid");
      email.classList.add("invalid");
      mailError.innerText = `Email Already Exsists`;
    }
  } else {
    email.classList.remove("valid");
    email.classList.add("invalid");
    mailError.innerText = `Example :  username@MailServer.Domain`;
  }
};

/* Validate Paaword */
pass.onblur = function () {
  if (passRegex(this.value) == true) {
    pass.classList.remove("invalid");
    pass.classList.add("valid");
    passError.innerText = ``;
    confirmPass.disabled = false;
    confirmPass.focus();
  } else {
    pass.classList.remove("valid");
    pass.classList.add("invalid");
    passError.innerText = ` Pssword should include lowercase, uppercase, sympol, number`;
  }
};
/* Validate Paaword confirmation */
confirmPass.onblur = function () {
  if (this.value == pass.value) {
    confirmPass.classList.remove("invalid");
    confirmPass.classList.add("valid");
    conPassError.innerText = ``;
  } else {
    confirmPass.classList.remove("valid");
    confirmPass.classList.add("invalid");
    conPassError.innerText = `Passwords Dont Match`;
  }
};

/* Validate and send sign up  form */
sginUpButton.onclick = function (e) {
  e.preventDefault();
  if (
    signUpUserName.classList.contains("valid") &&
    email.classList.contains("valid") &&
    pass.classList.contains("valid") &&
    confirmPass.classList.contains("valid")
  ) {
    sginUpButton.style.cssText = `cursor : pointer`;

    users.push({
      name: signUpUserName.value,
      mail: email.value,
      password: pass.value,
    });
    window.localStorage.setItem("users", JSON.stringify(users));
    signUpUserName.value = ``;
    email.value = ``;
    pass.value = ``;
    confirmPass.value = ``;
    switchToSignIn.click();
  }
};

/* validate sign in form  */

/* make sure the sign in user name is not empty  */

signInUsername.onblur = function () {
  if (this.value == "") {
    signInUserError.innerText = `Name Cannot be Empty`;
  }
  else { 
    signInUserError.innerText = ``;
  }
}
 
/* make sure the sign in password is not empty  */

signInPassword.onblur = function () { 
  if (this.value == "") {
    signInPassError.innerText = `Type Your Password`
  } else { 
    signInPassError.innerText=``
  }
}

/* validate user name and password  */

sginInButton.onclick = function (e) { 
  e.preventDefault()
  if (validate(signInUsername.value, signInPassword.value) == true) {
    signInUsername.classList.add("valid")
    signInPassword.classList.add("valid");
    console.log("WELCOME")
  } else { 
    signInError.innerText=`Incorrect UserName or Password `
  }

}

/* Functions  */

/* Check if the user name Exsist */
function checkUserName(name) {
  let found;
  if (users == "") {
    return false;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].name.toLowerCase() == name.toLowerCase()) {
        found = true;
        break;
      } else {
        found = false;
      }
    }
  }
  return found;
}


/* Check if the E-mail Exsist */
function checkEmail(email) {
  let found;
  if (users == "") {
    found = false;
    return found;
  } else {
    users.forEach((user) => {
      user.mail.toLowerCase() == email.toLowerCase()
        ? (found = true)
        : (found = false);
    });
    return found;
  }
}

/* Regex For the user name  */
function userRegex(name) {
  let regex = /[a-z@-_]{8,}/g;
  return regex.test(name);
}

/* Regex For the Email  */
function mailRegex(mail) {
  let regex = /^[a-zA-Z]*@[A-Za-z]{3,8}\.[A-Za-z]{2,5}/gi;
  return regex.test(mail);
}

/* Regex For the Password  */
function passRegex(pass) {
  let regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_+=\.]).{8,32}$/g;
  return regex.test(pass);
}

/* verify log in data  */

function validate(username, password) { 
  let validUser = false, validPassword = false;
  let userIndex=0;
  for (let i = 0; i < users.length; i++) { 
    if (users[i].name == username) { 
      validUser = true
      userIndex = i
      break
    }
    console.lo
  }
  if (users[userIndex].password == password) {
    validPassword = true;
  }

  if (validUser == true && validPassword == true) {
    return true
  } else { 
    return false
  }
}
