let cart = []
let modalQt = 1
let modalKey = 0
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
    //definindo a pizza selecionana na variavel global para ser utilizada no carrinho
    modalKey = key
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
  size.addEventListener('click', () => {
    c('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})
//evento de add no cart
c('.pizzaInfo--addButton').addEventListener('click', () => {
  //pegando qual a pizza
  let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'))
  //criando um identificador de pizza e tamanho no cart
  let identifier = pizzaJson[modalKey].id + '@' + size
  //verificando se pizza/tam ja tem no cart
  let key = cart.findIndex((item) => item.identifier == identifier)
  //caso ja tem a pizza/tam altera a qtde ou insere
  if (key > -1) {
    cart[key].qt += modalQt
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size: size,
      qt: modalQt
    })
  }
  updateCart()
  closeModal()
})
//abrindo o cart no mobile
c('.menu-openner').addEventListener('click', () => {
  if (cart.length > 0) {
    c('aside').style.left = '0'
  }
})
//fehcando o cart no mobile
c('.menu-closer').addEventListener('click', () => {
  c('aside').style.left = '100vw'
}
)


function updateCart() {
  c('.menu-openner span').innerHTML = cart.length


  if (cart.length > 0) {
    c('aside').classList.add('show')
    c('.cart').innerHTML = ''
    let subtotal = 0
    let desconto = 0
    let total = 0


    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
      subtotal = pizzaItem.price * cart[i].qt

      let cartItem = c('.models .cart--item').cloneNode(true)
      let pizzaSizeName;
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = 'P'
          break;
        case 1:
          pizzaSizeName = 'M'
          break;
        case 2:
          pizzaSizeName = 'G'
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`
      //preenchendo o cart
      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        if (cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
        }
        updateCart()
      })
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        cart[i].qt++
        updateCart()
      })


      c('.cart').append(cartItem)
    }
    //add as info de valores do cart
    desconto = subtotal * 0.1
    total = subtotal - desconto

    c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
    c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
    c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
  } else {
    c('aside').classList.remove('show')
    c('aside').style.left = '100vw'
  }
}