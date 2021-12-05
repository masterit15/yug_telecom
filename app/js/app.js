
function phoneFormat(){
  let a = [...document.getElementsByTagName("a")]
  a.forEach(link => {
    if (link.getAttribute("href").indexOf("tel:") !== -1) {
      let phone = link.getAttribute("href").split(':')[1]
      let phoneLength = phone.length
      let tt = phone.split('')
      if(phoneLength == 11){
        tt.splice(1,"", " (");
        tt.splice(5,"", ") ");
        tt.splice(9,"", "-");
        tt.splice(12,"", "-");
      } else if(phoneLength == 12){
          tt.splice(2,"", " (");
          tt.splice(6,"", ") ");
          tt.splice(10,"", "-");
          tt.splice(13,"", "-");
      }else if(phoneLength == 13){
          tt.splice(3,"", " (");
          tt.splice(7,"", ") ");
          tt.splice(11,"", "-");
          tt.splice(14,"", "-");
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

// TweenMax.to('.speed_arrow', 4, { score: 20, onUpdate: updateHandler, onUpdateParams: [i] });

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
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}