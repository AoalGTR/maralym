const products = [
  {
    id: 1,
    name: "Белая женская рубашка Classic Fit",
    category: "shirts",
    badge: "Рубашка",
    price: 2490,
    description: "Лёгкая женская рубашка из хлопка для офиса и повседневных образов.",
    tags: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    name: "Голубая женская рубашка Linen Line",
    category: "shirts",
    badge: "Рубашка",
    price: 2790,
    description: "Воздушная рубашка с мягкой посадкой и аккуратным воротником.",
    tags: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Чёрные женские брюки Urban Slim",
    category: "pants",
    badge: "Брюки",
    price: 3190,
    description: "Строгие брюки для современного и чистого силуэта.",
    tags: ["40", "42", "44", "46"]
  },
  {
    id: 4,
    name: "Светлые женские джинсы Relaxed",
    category: "pants",
    badge: "Брюки",
    price: 2990,
    description: "Комфортные джинсы с универсальной посадкой на каждый день.",
    tags: ["40", "42", "44", "46"]
  },
  {
    id: 5,
    name: "Чёрное женское платье Evening Mood",
    category: "dresses",
    badge: "Платье",
    price: 4590,
    description: "Элегантное вечернее платье для особых случаев и мероприятий.",
    tags: ["XS", "S", "M", "L"]
  },
  {
    id: 6,
    name: "Платье Rose Satin",
    category: "dresses",
    badge: "Платье",
    price: 3890,
    description: "Мягкий сатиновый блеск и плавный силуэт для яркого выхода.",
    tags: ["XS", "S", "M", "L"]
  },
  {
    id: 7,
    name: "Кожаная женская куртка Black Edge",
    category: "outerwear",
    badge: "Куртка",
    price: 7990,
    description: "Смелая базовая куртка, которая собирает образ и добавляет характер.",
    tags: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Бежевая женская куртка Soft Warm",
    category: "outerwear",
    badge: "Куртка",
    price: 6990,
    description: "Утеплённая модель для прохладной погоды и спокойных образов.",
    tags: ["S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Рубашка Stripe Office",
    category: "shirts",
    badge: "Рубашка",
    price: 2290,
    description: "Полосатая женская рубашка с деловым характером и лёгким акцентом.",
    tags: ["XS", "S", "M", "L"]
  },
  {
    id: 10,
    name: "Женские брюки Wide Comfort",
    category: "pants",
    badge: "Брюки",
    price: 3390,
    description: "Широкий крой и удобная посадка для современного гардероба.",
    tags: ["40", "42", "44", "46"]
  },
  {
    id: 11,
    name: "Платье Day Light",
    category: "dresses",
    badge: "Платье",
    price: 3690,
    description: "Лаконичное платье на каждый день с мягким и женственным силуэтом.",
    tags: ["XS", "S", "M", "L"]
  },
  {
    id: 12,
    name: "Джинсовая женская куртка Blue Denim",
    category: "outerwear",
    badge: "Куртка",
    price: 4190,
    description: "Классическая джинсовая куртка, которая не выходит из моды.",
    tags: ["S", "M", "L", "XL"]
  }
];

const productsRoot = document.getElementById('products');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalTitleVisual = document.getElementById('modalTitleVisual');
const modalMiniText = document.getElementById('modalMiniText');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalMeta = document.getElementById('modalMeta');
const modalCategoryBadge = document.getElementById('modalCategoryBadge');
const modalVisual = document.getElementById('modalVisual');
const closeModalBtn = document.getElementById('closeModal');
const buyBtn = document.getElementById('buyBtn');

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' сом';
}

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(product => product.category === filter);
  productsRoot.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-visual">
        <div class="badge">${product.badge}</div>
        <div class="mannequin"></div>
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${product.name}</h3>
          <div class="price">${formatPrice(product.price)}</div>
        </div>
        <p>${product.description}</p>
        <div class="product-actions">
          <button class="small-btn primary" data-id="${product.id}">Подробнее</button>
          <button class="small-btn" data-scroll="contacts">Заказать</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-id]').forEach(button => {
    button.addEventListener('click', () => openModal(Number(button.dataset.id)));
  });

  document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById(button.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function openModal(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  modalTitle.textContent = product.name;
  modalTitleVisual.textContent = product.name;
  modalMiniText.textContent = product.description;
  modalDescription.textContent = product.description + ' Отлично подходит для стильной витрины женского магазина одежды.';
  modalPrice.textContent = formatPrice(product.price);
  modalCategoryBadge.textContent = product.badge;
  modalMeta.innerHTML = product.tags.map(tag => `<span class="chip">${tag}</span>`).join('');
  modalVisual.style.background = getGradient(product.category);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function getGradient(category) {
  const gradients = {
    shirts: 'linear-gradient(160deg, #f0d9df, #c88a9b)',
    pants: 'linear-gradient(160deg, #e6dfd8, #b8a79a)',
    dresses: 'linear-gradient(160deg, #efc6d2, #b26a85)',
    outerwear: 'linear-gradient(160deg, #d9dde4, #8792a3)'
  };
  return gradients[category] || 'linear-gradient(160deg, #f0d9df, #c88a9b)';
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});
buyBtn.addEventListener('click', () => {
  alert('Оставьте свой номер телефона или перейдите в контакты для заказа.');
});

renderProducts();
