const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(JSON.stringify(cartList.innerHTML));
  // summingCartItemsPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createElements = async () => {
  const items = document.querySelector('.items');
  const { results } = (await fetchProducts('computador'));
  results.forEach(({ id, title, thumbnail }) => {
    items.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

const addToCart = async (itemID) => {
  const product = await fetchItem(itemID);
  const { id: sku, title: name, price: salePrice } = product;
  const returnedItens = createCartItemElement({ sku, name, salePrice });
  cartList.appendChild(returnedItens);
  saveCartItems(JSON.stringify(cartList.innerHTML));
};

const clickEvent = (event) => {
  const clickReceived = event.target.parentNode;
  const getSKU = getSkuFromProductItem(clickReceived);
  addToCart(getSKU);
};

const cartEventListener = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((one) => {
    one.addEventListener('click', clickEvent);
  });
};

const getDataFromLocalStorage = () => {
  const data = JSON.parse(getSavedCartItems());
  cartList.innerHTML = data;
  const allCartItems = document.querySelectorAll('.cart__items');
  allCartItems.forEach((item) => (
    item.addEventListener('click', cartItemClickListener)
  ));
};

window.onload = async () => {
  await createElements();
  cartEventListener();
  getDataFromLocalStorage();
};
