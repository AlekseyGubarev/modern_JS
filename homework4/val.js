"use strict"

const submit = document.querySelector('#button');
//Выражение для проверки поля ввода имени
const regexpName = /^[a-zа-яё]/i;
const firstname = document.querySelector('[name="username"]');
//Выражение для проверки поля ввода номера телефона
const regexpTelephone = /^\+7\(\d{3}\)\d{3}-\d{4}$/i;
const telephone = document.querySelector('[name="phone"]');
//Выражение для проверки поля ввода e-mail
const regexpEmail = /^[a-z.-]+\@mail.ru$/i;
const email = document.querySelector('[name="email"]');
//Выражение для проверки поля ввода текста
const regexpText = /^[a-zа-яё]+./i;
const text = document.querySelector('[name="text"]');

submit.addEventListener('click', event => {
//Условие проверки данных в поле ввода имени
  if (!regexpName.test(firstname.value)) {
    firstname.classList.add('border');
    firstname.parentNode.querySelector('span').classList.add('error');
    firstname.parentNode.querySelector('span').classList.remove('hidden');
  }

  else {
    firstname.classList.remove('border');
    firstname.parentNode.querySelector('span').classList.remove('error');
    firstname.parentNode.querySelector('span').classList.add('hidden');
  };
//Условие проверки данных в поле ввода номера телефона
  if (!regexpTelephone.test(telephone.value)) {
    telephone.classList.add('border');
    telephone.parentNode.querySelector('span').classList.add('error');
    telephone.parentNode.querySelector('span').classList.remove('hidden');
  }

  else {
    telephone.classList.remove('border');
    telephone.parentNode.querySelector('span').classList.remove('error');
    telephone.parentNode.querySelector('span').classList.add('hidden');
  };
//Условие проверки данных в поле ввода e-mail
  if (!regexpEmail.test(email.value)) {
    email.classList.add('border');
    email.parentNode.querySelector('span').classList.add('error');
    email.parentNode.querySelector('span').classList.remove('hidden');
  }
  else {
    email.classList.remove('border');
    email.parentNode.querySelector('span').classList.remove('error');
    email.parentNode.querySelector('span').classList.add('hidden');
  }
//Условие проверки данных в поле ввода текста  
  if (!regexpText.test(text.value)) {
    text.classList.add('border');
    text.parentNode.querySelector('span').classList.add('error');
    text.parentNode.querySelector('span').classList.remove('hidden');
  }
  else {
    text.classList.remove('border');
    text.parentNode.querySelector('span').classList.remove('error');
    text.parentNode.querySelector('span').classList.add('hidden');
  }
  event.preventDefault();
});






