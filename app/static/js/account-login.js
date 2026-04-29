// Password toggle function
function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const icon = iconElement.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

// Forgot password function
function forgotPassword() {
    alert('Forgot password functionality not implemented yet. Please contact support.');
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error by adding red border
function showError(input) {
    input.classList.add('input-error');
}

// Clear error by removing red border
function clearError(input) {
    input.classList.remove('input-error');
}

// Login function
function login(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = document.getElementById('remember').checked;

    let isValid = true;

    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);

    if (!email) {
        showError(emailInput);
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput);
        isValid = false;
    }

    if (!password) {
        showError(passwordInput);
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Simulate login
    alert('Login successful!');

    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
}

// Load remembered email on page load
window.onload = function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
};