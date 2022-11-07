//Definindo as constantes para economizar codigo
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

// utilizando o map para percorrer todo o objeto pizzaJson e clonar o html
// 'pizza-item'
pizzaJson.map((item,index)=>{
  let pizzaItem = c('.pizza-item').cloneNode(true)
  //preencher as info das pizzas


  //inserindo o clone de acordo com o map na area das pizza
  c('.pizza-area').append(pizzaItem)
})