// B.1. Base de dados
const data = {
    produtos: [
        { id: 1, nome: "Smartphone Galaxy", preco: 2500, categoria: "Celulares", imagem: "https://placehold.co/150/007bff/ffffff?text=Galaxy", descricao: "Um smartphone rápido e com ótima câmera.", emEstoque: true },
        { id: 2, nome: "Notebook Gamer", preco: 4500, categoria: "Notebooks", imagem: "https://placehold.co/150/28a745/ffffff?text=Notebook", descricao: "Notebook potente para jogos e trabalho.", emEstoque: true },
        { id: 3, nome: "Mouse sem fio", preco: 120, categoria: "Acessórios", imagem: "https://placehold.co/150/17a2b8/ffffff?text=Mouse", descricao: "Mouse ergonômico e sem fio.", emEstoque: true },
        { id: 4, nome: "Headset Gamer", preco: 300, categoria: "Acessórios", imagem: "https://placehold.co/150/dc3545/ffffff?text=Headset", descricao: "Som estéreo de alta qualidade.", emEstoque: false },
        { id: 5, nome: "Console X", preco: 3500, categoria: "Games", imagem: "https://placehold.co/150/ffc107/333333?text=Console", descricao: "Console de última geração.", emEstoque: true },
        { id: 6, nome: "Smartphone Pro", preco: 4000, categoria: "Celulares", imagem: "https://placehold.co/150/6610f2/ffffff?text=Pro", descricao: "A versão mais recente com tela OLED.", emEstoque: true },
        { id: 7, nome: "Notebook Ultra", preco: 6000, categoria: "Notebooks", imagem: "https://placehold.co/150/e83e8c/ffffff?text=Ultra", descricao: "Leve e potente para o dia a dia.", emEstoque: false },
        { id: 8, nome: "Jogo Y", preco: 250, categoria: "Games", imagem: "https://placehold.co/150/fd7e14/ffffff?text=Jogo", descricao: "Aventura épica de mundo aberto.", emEstoque: true }
    ]
};

// B.2. Seleção de elementos (DOM)
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// B.3. Funções obrigatórias
function formatPrice(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function renderCategories() {
    const categories = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = "";
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    return data.produtos.filter(produto => {
        const matchesName = produto.nome.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;
        return matchesName && matchesCategory;
    });
}

// B.4. Cards com botões e eventos (addEventListener)
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.setAttribute("data-id", produto.id);
    card.style.border = "1px solid #ddd";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.categoria}</p>
        <p class="price">${formatPrice(produto.preco)}</p>
        <div class="card-buttons">
            <button class="btn-details">Ver detalhes</button>
            <button class="btn-highlight">Destacar</button>
        </div>
    `;

    // Botão Ver detalhes
    const btnDetails = card.querySelector(".btn-details");
    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    // Botão Destacar
    const btnHighlight = card.querySelector(".btn-highlight");
    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlighted");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    
    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

// B.5. Uso de querySelectorAll ocorre após os cards serem inseridos na tela
    imprimirIdsDosCards();
}

function imprimirIdsDosCards() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        console.log(`Card renderizado - ID: ${card.getAttribute('data-id')}`);
    });
}

// Eventos de interação
searchInput.addEventListener("input", () => {
    const filtered = filterProducts();
    renderProducts(filtered);
});

categorySelect.addEventListener("change", () => {
    const filtered = filterProducts();
    renderProducts(filtered);
});

btnRender.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderProducts(data.produtos);
});

// Inicialização da página
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts(data.produtos);
});