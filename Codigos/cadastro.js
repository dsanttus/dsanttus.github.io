function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function showErrorMessage(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
}

function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    let valid = true;

    clearErrorMessages(form);

    // Validating name
    if (nameInput.value.trim().split(' ').filter(Boolean).length < 2 || nameInput.value.length < 2) {
        showErrorMessage(nameInput, 'Por favor, insira um nome e sobrenome válido.');
        valid = false;
    }

    // Validating email
    if (!validateEmail(emailInput.value)) {
        showErrorMessage(emailInput, 'Por favor, insira um e-mail válido.');
        valid = false;
    }

    // Validating password
    if (passwordInput.value.length < 5) {
        showErrorMessage(passwordInput, 'A senha deve ter pelo menos 5 caracteres.');
        valid = false;
    }

    if (valid) {
        form.submit();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', validateForm);
    }
});