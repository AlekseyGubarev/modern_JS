'use strict'

const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

// Чтобы сократить запись функции можно убрать фигурные скобки и return.
const getProductHTMLString = (title, price, 
  img = 'https://novabiz.ru/files/contents/2969/3662/src_200x150.jpg') => 
    `<div class="product-item">
    <img src="${img}" alt="picture">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="by-btn">Добавить</button>
    </div>`;

//Для того, чтобы убрать запятые можно добавить метод join.
const renderProducts = (productList) => {
  const list = productList.map((good) => getProductHTMLString(good.title, good.price)).join('');

  document.querySelector('.products').innerHTML = list;
    // console.log(list);
}

renderProducts(products);
