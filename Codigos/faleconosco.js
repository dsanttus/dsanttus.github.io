// Função para validar o formato do e-mail
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Função para exibir mensagens de erro dentro das caixas de formulário
function showErrorMessage(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (!errorElement) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        input.parentNode.appendChild(errorElement);
    } else {
        errorElement.innerText = message;
    }
}

// Função para exibir mensagens de erro
function showErrorMessage(element, message) {
    element.classList.add('error'); // Adiciona a classe 'error' ao elemento
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
}

// Função para exibir mensagens de sucesso
function showSuccessMessage(message, form) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerText = message;
    form.parentNode.insertBefore(successElement, form.nextSibling); // Adiciona a mensagem de sucesso após o formulário
    setTimeout(() => {
        successElement.remove(); // Remove a mensagem de sucesso após um período de tempo
    }, 3000); // Tempo em milissegundos (3 segundos)
}

// Função para remover mensagens de erro
function clearErrorMessages(form) {
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error'); // Remove a classe 'error' dos elementos com erro
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove(); // Remove a mensagem de erro associada ao elemento
        }
    });
}

// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    const form = event.target;
    const nameInput = form.querySelector('input[name="nome"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="mensagem"]');
    let valid = true;

    clearErrorMessages(form); // Limpa as mensagens de erro antes de revalidar o formulário

    // Validação do nome
    if (nameInput.value.trim().length < 3) {
        showErrorMessage(nameInput, 'Por favor, insira um nome válido (mínimo de 3 caracteres).');
        valid = false;
    }

    // Validação do e-mail
    if (!validateEmail(emailInput.value)) {
        showErrorMessage(emailInput, 'Por favor, insira um e-mail válido.');
        valid = false;
    }

    // Validação da mensagem
    if (messageInput.value.trim().length < 10) {
        showErrorMessage(messageInput, 'A mensagem deve ter pelo menos 10 caracteres.');
        valid = false;
    }

    if (valid) {
        console.log('Formulário válido, pronto para enviar.');
        showSuccessMessage('Formulário enviado com sucesso!', form);
        form.reset(); // Limpa o formulário após o envio
    }
}

// Função para remover a mensagem de sucesso quando o botão "Refazer" é clicado
function removeSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.remove();
    }
}

// Aguarda o carregamento completo do DOM antes de adicionar os ouvintes de eventos
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');
    const resetButton = document.querySelector('.button-reset');

    if (contactForm) {
        contactForm.addEventListener('submit', validateForm); // Adiciona o ouvinte de evento para o envio do formulário
    }

    if (resetButton) {
        resetButton.addEventListener('click', removeSuccessMessage); // Adiciona o ouvinte de evento para o botão "Refazer"
    }
});
