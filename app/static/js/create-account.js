// uploading pridle picture
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        }

        reader.readAsDataURL(file);
    }
});

// password toggle
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    const icon = element.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}

// validate form on submit
const form = document.getElementById("createAccountForm");

const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const phoneFormat = document.getElementById("phone-format");
const barangay = document.getElementById("Barangay");
const city = document.getElementById("City/Municipality");
const gender = document.getElementById("Gender");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("matchMessage");
const homeAddress = document.getElementById("home-address");
const termsCheckbox = document.getElementById("terms");

function showError(input, msg = "This field is required") {
    input.classList.add("input-error");
    input.classList.remove("input-success");

    let error = input.parentElement.querySelector(".error");
    if (!error) {
        error = document.createElement("div");
        error.classList.add("error");
        input.parentElement.appendChild(error);
    }
    error.textContent = msg;
}

function showBorderError(input) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
}

function showSuccess(input) {
    input.classList.remove("input-error");
    input.classList.add("input-success");

    let error = input.parentElement.querySelector(".error");
    if (error) error.textContent = "";
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelectorAll(".input-error, .input-success").forEach(el => {
        el.classList.remove("input-error", "input-success");
    });
    const termsError = document.getElementById("terms-error");
    if (termsError) termsError.textContent = "";
    phoneFormat.textContent = "";
    message.textContent = "";
}

// email validation
function isValidEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

// phone validation (Philippines format basic)
function isValidPhone(number) {
    return /^09\d{9}$/.test(number) && number.length === 11;
}

// name validation (no numbers allowed)
function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

// input restrictions
fName.addEventListener("input", function (e) {
    this.value = this.value.replace(/[0-9]/g, '');
});

lName.addEventListener("input", function (e) {
    this.value = this.value.replace(/[0-9]/g, '');
});

contact.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').substring(0, 11);
});

// check password match (real-time validation)
function checkPasswordMatch() {
    const pwdValue = password.value;
    const confirmPwdValue = confirmPassword.value;

    // If both fields are empty, clear styling
    if (pwdValue === "" && confirmPwdValue === "") {
        password.classList.remove("input-error", "input-success");
        confirmPassword.classList.remove("input-error", "input-success");
        message.textContent = "";
        return;
    }

    // If only confirm password has value but password is empty
    if (pwdValue === "" && confirmPwdValue !== "") {
        confirmPassword.classList.add("input-error");
        confirmPassword.classList.remove("input-success");
        message.textContent = "Enter password first";
        message.style.color = "red";
        return;
    }

    // If confirm password is empty, don't show error yet
    if (confirmPwdValue === "") {
        confirmPassword.classList.remove("input-error", "input-success");
        message.textContent = "";
        return;
    }

    // check pass length 
    if (pwdValue === confirmPwdValue && pwdValue.length >= 6) {
        password.classList.add("input-success");
        password.classList.remove("input-error");
        confirmPassword.classList.add("input-success");
        confirmPassword.classList.remove("input-error");
        message.textContent = "Passwords match ✓";
        message.style.color = "green";
    } else if (pwdValue !== confirmPwdValue) {
        confirmPassword.classList.add("input-error");
        confirmPassword.classList.remove("input-success");
        message.textContent = "Passwords do not match";
        message.style.color = "red";
    } else if (pwdValue.length < 6) {
        password.classList.add("input-error");
        password.classList.remove("input-success");
        confirmPassword.classList.remove("input-error", "input-success");
        message.textContent = "Password must be at least 6 characters";
        message.style.color = "red";
    }
}

// validate form on submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();
    let valid = true;

    // First Name Validation
    if (fName.value.trim() === "") {
        showBorderError(fName);
        valid = false;
    } else if (fName.value.trim().length < 2) {
        showBorderError(fName);
        valid = false;
    } else if (!isValidName(fName.value.trim())) {
        showError(fName, "First name cannot contain numbers");
        valid = false;
    } else {
        showSuccess(fName);
    }

    // Last Name Validation
    if (lName.value.trim() === "") {
        showBorderError(lName);
        valid = false;
    } else if (lName.value.trim().length < 2) {
        showBorderError(lName);
        valid = false;
    } else if (!isValidName(lName.value.trim())) {
        showError(lName, "Last name cannot contain numbers");
        valid = false;
    } else {
        showSuccess(lName);
    }

    // Email Validation
    if (email.value.trim() === "") {
        showBorderError(email);
        valid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        valid = false;
    } else {
        showSuccess(email);
    }

    // Contact (Phone) Validation
    if (contact.value.trim() === "") {
        showBorderError(contact);
        valid = false;
    } else if (contact.value.length !== 11) {
        showError(contact, "Phone number must be exactly 11 digits");
        valid = false;
    } else if (!isValidPhone(contact.value)) {
        showError(contact, "Invalid phone number format");
        valid = false;
    } else {
        showSuccess(contact);
        phoneFormat.textContent = "";
    }

    // Home Address Validation
    if (homeAddress.value.trim() === "") {
        showBorderError(homeAddress);
        valid = false;
    } else if (homeAddress.value.trim().length < 5) {
        showError(homeAddress, "Please enter a complete address");
        valid = false;
    } else {
        showSuccess(homeAddress);
    }

    // Barangay Validation
    if (barangay.value.trim() === "") {
        showBorderError(barangay);
        valid = false;
    } else {
        showSuccess(barangay);
    }

    // City/Municipality Validation
    if (city.value.trim() === "") {
        showBorderError(city);
        valid = false;
    } else {
        showSuccess(city);
    }

    // Gender Validation
    if (gender.value === "") {
        showBorderError(gender);
        valid = false;
    } else {
        showSuccess(gender);
    }

    // Password Validation
    if (password.value === "") {
        showBorderError(password);
        valid = false;
    } else if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        valid = false;
    } else {
        showSuccess(password);
    }

    // Confirm Password Validation
    if (confirmPassword.value === "") {
        showBorderError(confirmPassword);
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        valid = false;
    } else {
        showSuccess(confirmPassword);
    }

    // Terms and Conditions Validation
    const termsError = document.getElementById("terms-error");
    if (!termsCheckbox.checked) {
        if (termsError) {
            termsError.textContent = "You must agree to the terms and conditions";
        }
        valid = false;
    } else if (termsError) {
        termsError.textContent = "";
    }

    // Final check 
    if (valid) {
        console.log("Form validation passed, showing alert");
        alert("Account created successfully!");
        form.reset();
        clearErrors();
    } else {
        console.log("Form validation failed");
    }
});

password.addEventListener("input", checkPasswordMatch);
confirmPassword.addEventListener("input", checkPasswordMatch);