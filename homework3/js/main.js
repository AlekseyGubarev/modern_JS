const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// переписать на промис (!!!!!!!не fetch !!!!!!!!!!)
// Далее НЕ ИСПОЛЬЗОВАТЬ В КОДЕ!
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) reject(
          console.log('Error'));
        else resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
};

// ---------------------------------

class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];

    // this.fetchGoods();
    // this.render();

    this.getProducts()
      .then((data) => {
        this.goods = data;
        this.render();
      });
  }

  // fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log(data);
  //     this.goods = JSON.parse(data);
  //     this.render();
  //   });
  // }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  render() {
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      this.productObjects.push(productObject);
      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.id = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

class BasketList {
  constructor(container = '.basket') {
    this.container = document.querySelector(container);
    this.basketGoods = [];
    this.basketProducts = [];
    this.getBasket()
      .then((data) => {
        this.basketGoods = data;
        this.renderBasket();
      });

    this.deleteFromBasket();
    this.addToBasket();

  }

  getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  renderBasket() {
    for (const basketGood of this.basketGoods.contents) {
      const basketProducts = new BasketItem(basketGood);
      this.basketProducts.push(basketProducts);
      this.container
      .insertAdjacentHTML('beforeend', basketProducts.getHTMLString());
    }
  }
  
  addToBasket() {
    fetch(`${API}/addToBasket.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result == 1) {
          const buyBtn = document.querySelector('.products');
          buyBtn.addEventListener('click', event => {
            if (!event.target.closest('.buy-btn')) {
              return;
            }
            const basketElGoods = document.querySelector('.basket');   
            basketElGoods.append(event.target.parentNode.parentNode
            .cloneNode(true));
            basketElGoods.querySelector('.buy-btn').textContent = 'Удалить';
            basketElGoods.querySelector('.buy-btn')
            .insertAdjacentHTML('beforebegin',
            '<p>Количество:${this.quantity} \шт.</p>');
            basketElGoods.querySelector('.buy-btn').classList.add('del_btn');
            basketElGoods.querySelector('.buy-btn').classList.remove('buy-btn');
          });

        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }

  
  deleteFromBasket() {
    fetch(`${API}/deleteFromBasket.json`)
      .then((response) => { return response.json(); })
      .then((data) => {
        if (data.result == 1) {
          const delBtn = document.querySelector('.basket');
          delBtn.addEventListener('click', event => {
            if (!event.target.closest('.del_btn')) {
              return;
            }
            const basketGoods = document.querySelector('.basket');
            basketGoods.querySelector('.product-item').remove();
          });
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }
}


class BasketItem extends ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150', quantity) {
    super(product, img = 'https://via.placeholder.com/200x150')
    this.quantity = product.quantity;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <p>Количество:${this.quantity} \шт.</p>
                    <button class="del_btn">Удалить</button>
                </div>
            </div>`;
  }
}

new BasketList();