function showErrorMessage(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    element.classList.add('error');
    element.classList.remove('success');
}

function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    // Remover a classe de erro dos inputs
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.classList.remove('success');
    });
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
    const nameValue = nameInput.value.trim();
    if (nameValue.length < 3) {
        showErrorMessage(nameInput, 'Por favor, insira um nome válido com pelo menos 3 caracteres.');
        valid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(nameValue)) {
        showErrorMessage(nameInput, 'Por favor, insira um nome válido contendo apenas letras, espaços, apóstrofos e hifens.');
        valid = false;
    } else {
        nameInput.classList.add('success'); // Adiciona a classe de sucesso
    }

    // Validating email
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        showErrorMessage(emailInput, 'Por favor, insira um e-mail válido.');
        valid = false;
    } else {
        emailInput.classList.add('success'); // Adiciona a classe de sucesso
    }

    // Validating password
    if (passwordInput.value.length < 8) {
        showErrorMessage(passwordInput, 'A senha deve ter pelo menos 8 caracteres.');
        valid = false;
    } else {
        passwordInput.classList.add('success'); // Adiciona a classe de sucesso
    }

    if (valid) {
        form.submit();
    }

    // Impedir o envio do formulário se houver erros
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', validateForm);

        // Adiciona evento para limpar os erros ao clicar fora do formulário
        document.addEventListener('click', event => {
            if (!signupForm.contains(event.target)) {
                clearErrorMessages(signupForm);
            }
        });
    }
});
