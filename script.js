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

// const createLoadingElement = () => {
//   const element = document.createElement('div');
//   element.innerText = 'carregando...';
//   element.className = 'loading';
//   const items = document.querySelector('.container');
//   items.appendChild(element);
// };

// const removeLoadingElement = () => {
//   const element = document.querySelector('.loading');
//   element.remove();
// };

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

const sumPrice = async () => {
  const totalPrice = document.querySelector('.total-price');
  const allCartItems = document.querySelectorAll('.cart__item');
  let finalPrice = 0;
  allCartItems.forEach((item) => {
    const price = item.innerText.split('$').pop();
    finalPrice += parseFloat(price);
  });
  if (allCartItems.length === 0) totalPrice.innerText = 'Carrinho vazio!';
  totalPrice.innerText = `Valor total: R$ ${finalPrice.toFixed(2)}`;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(JSON.stringify(cartList.innerHTML));
  sumPrice();
};

const createCartItemElement = ({ name, salePrice }) => {
  const li = document.createElement('li');
  const removeBtn = document.createElement('div');
  removeBtn.innerText = 'testando o botao pra ver se deu certo';
  removeBtn.className = 'remove-btn';
  li.appendChild(removeBtn);
  li.className = 'cart__item';
  // li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.innerText = `${name} \n \n  Valor: R$${salePrice.toFixed(2)}`;
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
  sumPrice();
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

const emptyButton = () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    cartList.innerText = '';
    localStorage.removeItem('cartItems');
    sumPrice();
  });  
};

window.onload = async () => {
  await createElements();
  cartEventListener();
  getDataFromLocalStorage();
  emptyButton();
  sumPrice();
};
