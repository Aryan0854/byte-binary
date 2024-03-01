function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // You can handle the logged in user here, such as sending the user data to your server.
}

function onFailure(error) {
    console.error('Google sign in failed:', error);
}

function renderButton() {
    gapi.signin2.render('googleSignInBtn', {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

// Load the Google API client and sign-in button asynchronously
function handleClientLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init().then(function () {
            renderButton();
        });
    });
}

function displayFormMessage(formElement, messageType, messageContent) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = messageContent;
    messageElement.className = "form__message";
    messageElement.classList.add(`form__message--${messageType}`);
}

function indicateInputError(inputElement, errorMessage) {
    inputElement.classList.add("form__input--error");
    inputElement.nextElementSibling.textContent = errorMessage;
}

function clearInputErrorMessage(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.nextElementSibling.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const signUpForm = document.querySelector("#signUpForm");

    document.querySelector("#linkSignUp").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        signUpForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        signUpForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        // Add login functionality here
        console.log("Logging in with username:", username, "and password:", password);
    });

    signUpForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        // Add sign up functionality here
        console.log("Signing up with username:", username, "email:", email, "and password:", password);
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.value.length > 0 && e.target.value.length < 10) {
                indicateInputError(inputElement, "Username must be at least 10 characters long");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputErrorMessage(inputElement);
        });
    });
});
