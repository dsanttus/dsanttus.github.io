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
    element.classList.add('error'); 
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
}

// Função para remover mensagens de erro
function clearErrorMessages(form) {
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error'); 
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove(); 
        }
    });
}

// Função para validar o formulário
function validateForm(event) {
    event.preventDefault(); 
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
        
    }
}

// Aguarda o carregamento completo do DOM antes de adicionar o ouvinte de evento
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', validateForm); // Adiciona o ouvinte de evento para o envio do formulário
    }
});
