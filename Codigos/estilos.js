document.addEventListener("DOMContentLoaded", function() {
    const urlToButtonClass = {
        "/Codigos/index.html": "botao1",
        "/Codigos/index.html1": "botao1",
        "/Codigos/carconnect.html": "botao2",
        "/Codigos/carconnect2.html": "botao2",
        "/Codigos/oficinas.html": "botao3",
        "/Codigos/quemsomos.html": "botao4",
        "/Codigos/faleconosco.html": "botao5",
        "/Codigos/login.html": "botao6",
        "/Codigos/cadastro.html": "botao6"
    };

    function setActiveButton() {
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
                // Remove a classe ativa de todos os botões
                document.querySelectorAll('.botao').forEach(function(btn) {
                    btn.classList.remove('active');
                });
                // Adiciona a classe ativa ao botão correspondente
                botao.classList.add("active");
            }
        }
    }

    setActiveButton();

    // Adiciona eventos de clique a todos os botões para armazenar o último botão clicado
    const botoes = document.querySelectorAll(".botao");
    botoes.forEach(function(botao) {
        botao.addEventListener("click", function() {
            localStorage.setItem('lastButtonClicked', botao.className.split(' ')[1]);
        });
    });

    // Escuta o evento de navegação de volta no histórico
    window.addEventListener('popstate', function() {
        setActiveButton();
    });
});

/***************************** ESTILIZAÇAO DA PAGINA INDEX1.HTML ******************************************/

document.addEventListener('DOMContentLoaded', () => {
    const changeImage = (src, element) => {
        const mainImage = document.querySelector('.gallery-section_mainImage img');
        mainImage.src = src;

        const buttons = document.querySelectorAll('.gallery-section_buttonTeste');
        buttons.forEach(btn => btn.classList.remove('gallery-section_active'));
        element.classList.add('gallery-section_active');
    };

    const buttons = document.querySelectorAll('.gallery-section_buttonTeste');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const src = this.querySelector('img').src;
            changeImage(src, this);
        });
    });
});

let currentIndex = 0;
const images = [
    { src: "/imagens/carro-bancos1.webp", alt: "Interior do carro com destaque para acabamento premium no painel, portas e bancos." },
    { src: "/imagens/carro-detalhe1.webp", alt: "Detalhe para traseira do carro na cor branca com destaque para escapamento duplo da versão Blackhawk." },
    { src: "/imagens/carro-frente1.webp", alt: "Vista dianteira no nível do chão na cor branca em via asfaltada com vegetação baixa nas laterais." },
    { src: "/imagens/carro-grade1.webp", alt: "Visão dianteira do carro na cor branca, com destaque para nova grade." },
    { src: "/imagens/carro-interno1.webp", alt: "Interior com destaque para acabamento premium no painel, portas e bancos." },
    { src: "/imagens/carro-roda1.webp", alt: "Roda com detalhe da pinça de freio vermelha." },
    { src: "/imagens/carro-foco1.webp", alt: "Visão dianteira do carro na cor branca sobre areia com mar ao fundo." }
];

function expandImage() {
    var mainImage = document.getElementById('mainImage');
    var expandedDiv = document.createElement('div');
    expandedDiv.className = 'expanded';

    var expandedImage = document.createElement('img');
    expandedImage.src = mainImage.src;
    var altText = document.createElement('div');
    altText.className = 'description';
    altText.innerText = mainImage.alt;

    expandedDiv.appendChild(expandedImage);
    expandedDiv.appendChild(altText);

    // Adicionar setas de navegação //
    var leftArrow = document.createElement('button');
    leftArrow.className = 'arrow arrow-left';
    leftArrow.innerHTML = '&#9664;'; // Unicode para seta para a esquerda //
    leftArrow.onclick = function(event) {
        event.stopPropagation();
        navigateImages(-1);
    };

    var rightArrow = document.createElement('button');
    rightArrow.className = 'arrow arrow-right';
    rightArrow.innerHTML = '&#9654;'; // Unicode para seta para a direita //
    rightArrow.onclick = function(event) {
        event.stopPropagation();
        navigateImages(1);
    };

    expandedDiv.appendChild(leftArrow);
    expandedDiv.appendChild(rightArrow);

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 37) { // Tecla de seta para a esquerda
            navigateImages(-1);
        } else if (event.keyCode === 39) { // Tecla de seta para a direita
            navigateImages(1);
        }
    });

    // Adicionar botões Conectar, Voltar e Sair//
    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    var connectButton = document.createElement('button');
    connectButton.innerText = 'Conectar';
    connectButton.onclick = function(event) {
        event.stopPropagation();
        window.location.href = '/Codigos/login.html';
    };

    var voltarButton = document.createElement('button');
    voltarButton.innerText = 'Voltar';
    voltarButton.onclick = function(event) {
        event.stopPropagation();
        window.location.href = '/Codigos/index.html';
    };

    var backButton = document.createElement('button');
    backButton.innerText = 'Sair';
    backButton.onclick = function(event) {
        event.stopPropagation();
        document.body.removeChild(expandedDiv);
    };

    buttonsDiv.appendChild(connectButton);
    buttonsDiv.appendChild(voltarButton);
    buttonsDiv.appendChild(backButton);

    expandedDiv.appendChild(buttonsDiv);

    // Escuta o evento de navegação de volta no histórico
    window.addEventListener('popstate', function() {
        setActiveButton();
    });

    // Fechar imagem expandida ao clicar fora da imagem //
    expandedDiv.addEventListener('click', function() {
        document.body.removeChild(expandedDiv);
    });

    document.body.appendChild(expandedDiv);

    // Fechar imagem expandida ao pressionar a tecla ESC //
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (document.body.contains(expandedDiv)) {
                document.body.removeChild(expandedDiv);
            }
        }
    });

    function navigateImages(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        var expandedImage = document.querySelector('.expanded img');
        var altText = document.querySelector('.expanded .description');
        expandedImage.src = images[currentIndex].src;
        altText.innerText = images[currentIndex].alt;
    }

    function changeImage(index) {
        currentIndex = index;
        var mainImage = document.getElementById('mainImage');
        mainImage.src = images[currentIndex].src;
        mainImage.alt = images[currentIndex].alt;
    }
}
