document.addEventListener("DOMContentLoaded", function() {
    const urlToButtonClass = {
        "/Codigos/index.html": "botao1",
        "/Codigos/carconnect.html": "botao2",
        "/Codigos/oficinas.html": "botao3",
        "/Codigos/quemsomos.html": "botao4",
        "/Codigos/faleconosco.html": "botao5",
        "/Codigos/login.html": "botao6"
    };

    const currentPath = window.location.pathname;
    let buttonClass = urlToButtonClass[currentPath];

    if (!buttonClass) {
        // Obtém a classe do último botão clicado do localStorage
        buttonClass = localStorage.getItem('lastButtonClicked');
    } else {
        // Armazena a classe do botão atual no localStorage
        localStorage.setItem('lastButtonClicked', buttonClass);
    }

    if (buttonClass) {
        const botao = document.querySelector(`.${buttonClass}`);
        if (botao) {
            botao.classList.add("active");
        }
    }

    // Adiciona eventos de clique a todos os botões para armazenar o último botão clicado
    const botoes = document.querySelectorAll(".botao");
    botoes.forEach(function(botao) {
        botao.addEventListener("click", function() {
            localStorage.setItem('lastButtonClicked', botao.className.split(' ')[1]);
        });
    });
});
