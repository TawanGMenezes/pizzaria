let modalQt = 1
//Definindo as constantes para economizar codigo
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// utilizando o map para percorrer todo o objeto pizzaJson e clonar o html
// 'pizza-item'
pizzaJson.map((item, index) => {
  let pizzaItem = c('.pizza-item').cloneNode(true)
  // setando o identificador nas pizzas
  pizzaItem.setAttribute('data-key', index)
  //preencheendo as info das pizzas
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
  //inserido evento de click para aparecer o modal
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    //saindo do elemento 'a' e indo para o mais proximo chamado 'pizza-item' para
    //acessar o atributo que foi setado onde identifica qual é a pizza
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    //definindo a quantidade que irá abrir no modal
    modalQt = 1
    //preenchendo as info do modal apos descobrir qual pizza foi clicada
    c('.pizzaBig img').src = pizzaJson[key].img
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
    //reseta a seleção de tamanho ao abrir o modal
    c('.pizzaInfo--size.selected').classList.remove('selected')
    //preenche o tamanho das pizzas no modal
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
      //seta como selecionado toda pizza grande
      if (sizeIndex == 2) {
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    c('.pizzaInfo--qt').innerHTML = modalQt
    //modal com efeito utilizando o timeout
    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1;
    }, 200);


  })
  //inserindo o clone de acordo com o map na area das pizza
  c('.pizza-area').append(pizzaItem)
})

//Eventos do modal
//fechando o modal
const closeModal = () => {
  c('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none'
  }, 500);
}

//selecionando e adicionando o evento de click nos botoes de cancelar
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal)
})

//aumentar e diminuir a qtde
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if (modalQt > 1) {
    modalQt--
    c('.pizzaInfo--qt').innerHTML = modalQt
  }
})

c('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++;
  c('.pizzaInfo--qt').innerHTML = modalQt
})

//Evento de click nos tamanhos, remove dos outros tamanho o selected e add em qual foi clicado
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
  size.addEventListener('click', (e) => {
    c('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})