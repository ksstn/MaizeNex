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

// password match validation
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("matchMessage");

function checkPasswordMatch() {
    if (confirmPassword.value === "") {
        confirmPassword.classList.remove("input-error", "input-success");
        message.textContent = "";
        return;
    }

    if (password.value === confirmPassword.value) {
        confirmPassword.classList.remove("input-error");
        confirmPassword.classList.add("input-success");
        message.textContent = "Passwords match";
        message.style.color = "green";
    } else {
        confirmPassword.classList.remove("input-success");
        confirmPassword.classList.add("input-error");
        message.textContent = "Passwords do not match";
        message.style.color = "red";
    }
}

password.addEventListener("input", checkPasswordMatch);
confirmPassword.addEventListener("input", checkPasswordMatch);