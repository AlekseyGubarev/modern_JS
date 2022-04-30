"use strict"

class Param {
    constructor(element) {
        this.name = element.id;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}

class Burger {
    constructor(size, ingredients, toppings) {
        this.size = new Param(this.select(size));
        this.ingredients = new Param(this.select(ingredients));
        this.toppings = this.getToppings(toppings);
    }

    select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    getToppings(name) {
        let result = [];
        this.selectAll(name).forEach(el => result.push(new Param(el)));
        return result;
    }

    selectAll = (name) =>
        Array.from(document.querySelectorAll(`input[name="${name}"]:checked`));


    sumPrice() {
        let result = this.size.price + this.ingredients.price;
        this.toppings.forEach(topping => result += topping.price);
        return result;
    }

    sumCalories() {
        let result = this.size.calories + this.ingredients.calories;
        this.toppings.forEach(topping => result += topping.calories);
        return result;
    }

    showSum(price, calories) {
        document.querySelector(price).innerText = this.sumPrice();
        document.querySelector(calories).innerText = this.sumCalories();
    }
}
window.onload = () => {
    document.getElementById('check').addEventListener('click', () => {
        let burger = new Burger('size', 'ingredients', 'toppings');
        burger.showSum('#price', '#calories');
    })
}