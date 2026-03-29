// Dados dos produtos
const products = [
    // CLUBES BRASILEIROS
    { id: 1, team: 'Flamengo', emoji: '🔴', category: 'brasileiros', clubId: 'flamengo', priceVendedor: 180, priceJogador: 220 },
    { id: 2, team: 'Botafogo', emoji: '⚫', category: 'brasileiros', clubId: 'botafogo', priceVendedor: 180, priceJogador: 220 },
    { id: 3, team: 'Vasco da Gama', emoji: '⚪', category: 'brasileiros', clubId: 'vasco', priceVendedor: 180, priceJogador: 220 },
    { id: 4, team: 'Fluminense', emoji: '💚', category: 'brasileiros', clubId: 'fluminense', priceVendedor: 180, priceJogador: 220 },
    { id: 5, team: 'São Paulo', emoji: '⚪', category: 'brasileiros', clubId: 'sao-paulo', priceVendedor: 180, priceJogador: 220 },
    { id: 6, team: 'Palmeiras', emoji: '💚', category: 'brasileiros', clubId: 'palmeiras', priceVendedor: 180, priceJogador: 220 },
    { id: 7, team: 'Corinthians', emoji: '⚪', category: 'brasileiros', clubId: 'corinthians', priceVendedor: 180, priceJogador: 220 },
    { id: 8, team: 'Santos', emoji: '⚪', category: 'brasileiros', clubId: 'santos', priceVendedor: 180, priceJogador: 220 },
    { id: 9, team: 'Grêmio', emoji: '💙', category: 'brasileiros', clubId: 'gremio', priceVendedor: 180, priceJogador: 220 },
    { id: 10, team: 'Internacional', emoji: '🔴', category: 'brasileiros', clubId: 'internacional', priceVendedor: 180, priceJogador: 220 },
    
    // CLUBES EUROPEUS
    { id: 11, team: 'Manchester United', emoji: '🔴', category: 'europeus', clubId: 'manchester-united', priceVendedor: 180, priceJogador: 220 },
    { id: 12, team: 'Liverpool', emoji: '🔴', category: 'europeus', clubId: 'liverpool', priceVendedor: 180, priceJogador: 220 },
    { id: 13, team: 'Barcelona', emoji: '🔵', category: 'europeus', clubId: 'barcelona', priceVendedor: 180, priceJogador: 220 },
    { id: 14, team: 'Real Madrid', emoji: '⚪', category: 'europeus', clubId: 'real-madrid', priceVendedor: 180, priceJogador: 220 },
    { id: 15, team: 'Bayern Munique', emoji: '🔴', category: 'europeus', clubId: 'bayern', priceVendedor: 180, priceJogador: 220 },
    { id: 16, team: 'Paris Saint-Germain', emoji: '🔴', category: 'europeus', clubId: 'psg', priceVendedor: 180, priceJogador: 220 },
    { id: 17, team: 'Chelsea', emoji: '💙', category: 'europeus', clubId: 'chelsea', priceVendedor: 180, priceJogador: 220 },
    { id: 18, team: 'Milan', emoji: '🔴', category: 'europeus', clubId: 'milan', priceVendedor: 180, priceJogador: 220 },
    
    // SELEÇÕES
    { id: 19, team: 'Brasil', emoji: '🟡', category: 'selecoes', clubId: 'brasil-sel', priceVendedor: 180, priceJogador: 220 },
    { id: 20, team: 'Argentina', emoji: '🔵', category: 'selecoes', clubId: 'argentina', priceVendedor: 180, priceJogador: 220 },
    { id: 21, team: 'França', emoji: '🔵', category: 'selecoes', clubId: 'franca', priceVendedor: 180, priceJogador: 220 },
    { id: 22, team: 'Alemanha', emoji: '⚫', category: 'selecoes', clubId: 'alemanha', priceVendedor: 180, priceJogador: 220 },
    { id: 23, team: 'Espanha', emoji: '🔴', category: 'selecoes', clubId: 'espanha', priceVendedor: 180, priceJogador: 220 },
    { id: 24, team: 'Portugal', emoji: '🔴', category: 'selecoes', clubId: 'portugal', priceVendedor: 180, priceJogador: 220 },
];

let cart = [];
let currentCategory = 'brasileiros';
let currentClub = null;
let filteredProducts = products.filter(p => p.category === currentCategory);

// ===== FUNÇÕES PRINCIPAIS =====

// Inicializar
function init() {
    renderProducts();
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('search-input');
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterBySearch(query);
    });

    // Fechar modal ao clicar fora
    document.getElementById('cart-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') {
            toggleCart();
        }
    });

    // ESC para fechar carrinho
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cartModal = document.getElementById('cart-modal');
            if (cartModal?.classList.contains('active')) {
                toggleCart();
            }
        }
    });
}

// Renderizar produtos
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const card = createProductCard(product, index);
        grid.appendChild(card);
    });

    // Animar entrada
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.animation = `gridFadeIn 0.6s ease-out ${i * 0.05}s both`;
        });
    }, 0);
}

// Criar card do produto
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <div class="product-team">${product.team}</div>
            <div class="product-versions">
                <div class="version-badge" title="Versão Torcedor">
                    <span class="version-label">TORCEDOR</span>
                    <span class="version-price">R$ ${product.priceVendedor.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="version-badge" title="Versão Jogador">
                    <span class="version-label">JOGADOR</span>
                    <span class="version-price">R$ ${product.priceJogador.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
            <div class="product-buttons">
                <button class="add-btn" onclick="addToCart(${product.id}, 'torcedor')">
                    <span>Torcedor</span>
                </button>
                <button class="add-btn" onclick="addToCart(${product.id}, 'jogador')">
                    <span>Jogador</span>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Trocar categoria
function switchCategory(category) {
    currentCategory = category;
    currentClub = null;
    
    // Atualizar botões de tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // Remover active dos nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Filtrar produtos
    filteredProducts = products.filter(p => p.category === category);
    
    // Renderizar com animação
    const grid = document.getElementById('products-grid');
    grid.style.opacity = '0.5';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
        renderProducts();
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        grid.style.transition = 'all 0.3s ease';
    }, 100);
}

// Filtrar por clube
function filterByClub(clubId) {
    currentClub = clubId;
    
    // Atualizar estado dos nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `filterByClub('${clubId}')`) {
            link.classList.add('active');
        }
    });

    // Filtrar produtos
    filteredProducts = products.filter(p => p.clubId === clubId);
    
    // Renderizar com animação
    const grid = document.getElementById('products-grid');
    grid.style.opacity = '0.5';
    grid.style.transform = 'translateY(10px)';

    setTimeout(() => {
        renderProducts();
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        grid.style.transition = 'all 0.3s ease';
    }, 100);

    // Mostrar notificação
    const clubName = products.find(p => p.clubId === clubId)?.team || clubId;
    showToast(`Mostrando camisetas do ${clubName} ⚽`);
}

// Filtrar por busca
function filterBySearch(query) {
    if (!query.trim()) {
        currentClub = null;
        filteredProducts = products.filter(p => p.category === currentCategory);
    } else {
        filteredProducts = products.filter(p => 
            p.category === currentCategory && 
            p.team.toLowerCase().includes(query)
        );
    }
    renderProducts();
}

// ===== CARRINHO =====

// Adicionar ao carrinho
function addToCart(productId, version) {
    const product = products.find(p => p.id === productId);
    const price = version === 'jogador' ? product.priceJogador : product.priceVendedor;
    
    const cartItem = {
        id: `${productId}-${version}`,
        productId,
        team: product.team,
        emoji: product.emoji,
        version: version === 'jogador' ? 'JOGADOR' : 'TORCEDOR',
        price,
        quantity: 1
    };

    const existingItem = cart.find(item => item.id === cartItem.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }

    showToast(`${product.team} (${cartItem.version}) adicionado! ✅`);
    updateCart();
    animateCartBadge();
}

// Remover do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showToast('Item removido do carrinho ✕');
}

// Atualizar visualização do carrinho
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const subtotal = document.getElementById('subtotal');

    // Atualizar badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">🛒 Seu carrinho está vazio</div>';
        totalPrice.textContent = 'R$ 0,00';
        subtotal.textContent = 'R$ 0,00';
        return;
    }

    // Renderizar itens
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-team">${item.emoji} ${item.team}</div>
                <div class="cart-item-version">${item.version}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')} × ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')">✕</button>
        </div>
    `).join('');

    // Calcular totais
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    subtotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Toggle carrinho
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
}

// Animar badge do carrinho
function animateCartBadge() {
    const badge = document.getElementById('cart-count');
    badge.style.animation = 'none';
    setTimeout(() => {
        badge.style.animation = 'badgePulse 0.5s ease';
    }, 10);
}

// Mostrar notificação toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        showToast('Carrinho vazio! Adicione itens primeiro.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const message = `
🎉 PEDIDO FINALIZADO COM SUCESSO! 🎉

Total: R$ ${total.toFixed(2).replace('.', ',')}

Itens:
${cart.map(item => `- ${item.team} (${item.version}) × ${item.quantity}`).join('\n')}

Obrigado por comprar na DRIP SWAG 7! 👕
    `;

    alert(message);
    
    // Limpar carrinho
    cart = [];
    updateCart();
    toggleCart();
    showToast('Pedido realizado! Acompanhe seu email 📧');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', init);
