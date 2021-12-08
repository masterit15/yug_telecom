
import gsap from "gsap"
import IMask from 'imask'
const tl = gsap.timeline()
function phoneFormat(){
  let a = [...document.getElementsByTagName("a")]
  a.forEach(link => {
    if (link.getAttribute("href").indexOf("tel:") !== -1) {
      let phone = link.getAttribute("href").split(':')[1]
      let phoneLength = phone.length
      let tt = phone.split('')
      if(phoneLength == 11){
        tt.splice(1,"", " (")
        tt.splice(5,"", ") ")
        tt.splice(9,"", "-")
        tt.splice(12,"", "-")
      } else if(phoneLength == 12){
          tt.splice(2,"", " (")
          tt.splice(6,"", ") ")
          tt.splice(10,"", "-")
          tt.splice(13,"", "-")
      }else if(phoneLength == 13){
          tt.splice(3,"", " (")
          tt.splice(7,"", ") ")
          tt.splice(11,"", "-")
          tt.splice(14,"", "-")
      }
      link.classList.add('vadik_kaprizny_designer')
      link.innerHTML = tt.join('')
    }
  });
}
phoneFormat()


let title = document.querySelectorAll('.title')

title.forEach(tl=>{
  let wordsArr = tl.innerHTML.split(' ')
  let span = `<span>${wordsArr[wordsArr.length - 1]}</span>`
  wordsArr.pop()
  wordsArr.push(span)
  tl.innerHTML = wordsArr.join(' ')
})

let popularRates = document.querySelector('.popular')
let popularText = `<span class="popular_text">
                    <svg width="24" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.76l-7.053 3.948 1.575-7.928L.587 8.292l8.027-.952L12 0l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 17.76z" fill="#F4AE86"/></svg>
                    самый популярный
                  </span>`
popularRates.insertAdjacentHTML('afterbegin', popularText)

// tl.to('.speed_arrow', 4, { score: 20, onUpdate: updateHandler, onUpdateParams: [i] });

// function updateHandler(index) {
//   console.log(index);
//   // let numberBlock = document.querySelector('.count_item[data-target="' + index + '"] div');
//   // numberBlock.innerHTML = scores[index].score.toFixed(0);
// }
function animateSpeed(){
  let path = document.querySelectorAll('.speed_arrow')
  path.forEach((p, i)=>{
    let speed = p.closest('.rates_list_item').dataset.speed
    let step = 800
    p.style.transform = `rotate(0deg)`
    setTimeout(()=>{
      p.style.transform = `rotate(240deg)`
    },300)
    setTimeout(()=>{
      p.style.transform = `rotate(${speed}deg)`
    },step)
    setTimeout(()=>{
      p.classList.add('ag-speedometer_needle')
    },1200)
    step += 800
  })
}
let  list = document.querySelector('.rates_list')
window.addEventListener('scroll', ()=>{
  if(elementInViewport(list)){
    animateSpeed()
  }
})
window.addEventListener('load', ()=>{
  if(elementInViewport(list)){
    animateSpeed()
  }
})

function elementInViewport(el) {
  var top = el.offsetTop
  var left = el.offsetLeft
  var width = el.offsetWidth
  var height = el.offsetHeight
  while(el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }
  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}
document.querySelector('.offer_btn').addEventListener('click', ()=>{
  fetch('/form.html').then(function (response) {
    return response.text()
  }).then(function (html) {
    let offer_wrap = document.querySelector('.offer_wrap')

    tl.to(offer_wrap, {opacity: 0, duration: .3}).then(res=>{
      offer_wrap.style.display = 'none'
      let offer = document.querySelector('.offer')
      offer.insertAdjacentHTML('beforeend', html)
      let form = offer.querySelector('.application')
      tl.to(form, {opacity: 1, translateY: '0px', duration: .2})
      let rateItems = form.querySelectorAll('.rates_dd_item')
      let rateInput = form.querySelector('#rate')
      form.querySelector('#rate').onfocus = function() {
        tl.to('.rates_dd_list', {opacity: 1, height: 'auto', duration: .2})
      };
      rateInput.addEventListener('click', (e)=>{
        
      })
      document.addEventListener('click', (e)=>{
        let menu = form.querySelector('.rates_dd_list')
        if(!menu.contains(e.target) && !form.querySelector('#rate').contains(e.target)){
          tl.to('.rates_dd_list', {opacity: 0, height: '0px', duration: .2})
        }
      })
      
      rateItems.forEach(rateItem=>{
        rateItem.addEventListener('click', ()=>{
          tl.to('.rates_dd_list', {opacity: 0, height: '0px', duration: .2})
          form.querySelector('#rate').value = rateItem.innerHTML
          
        })
      })
      
      let phone = IMask(
      form.querySelector('#phone'), {
        mask: '+{7} (000) 000-00-00',
        lazy: false,  // make placeholder always visible
        placeholderChar: '0'     // defaults to '_'
      });
      form.querySelector('.send').addEventListener('click', (event)=>{
        event.preventDefault()
        let fio = form.querySelector('#fio').value
        let address = form.querySelector('#address').value
        let phone = form.querySelector('#phone').value
        let data = {fio,address,phone}
        
        fetch('/ajax.html',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        .then(function (response) {
          return response.json()
        })
        .then(res=>{
          console.log(res);
        })
      })
    })

  }).catch(function (err) {
    console.warn('Какя то ошибка.', err)
  });
})
function replaceAt(str,index, replacement) {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
function phoneMask(phone){
  let tt = phone.split('')
  tt.splice(0,"", "+7")
  tt.splice(1,"", " (")
  tt.splice(5,"", ") ")
  tt.splice(9,"", "-")
  tt.splice(12,"", "-")
  return tt.join('')
}