//Definindo as constantes para economizar codigo
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// utilizando o map para percorrer todo o objeto pizzaJson e clonar o html
// 'pizza-item'
pizzaJson.map((item, index) => {
  let pizzaItem = c('.pizza-item').cloneNode(true)
  // definindo a constante de preço
  const pizzaPrice = item.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  //preencher as info das pizzas
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `${pizzaPrice}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
  //inserido evento de click para aparecer o modal com efeito
  //utilizando o timeout
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;
    }, 200);


  })





  //inserindo o clone de acordo com o map na area das pizza
  c('.pizza-area').append(pizzaItem)
})