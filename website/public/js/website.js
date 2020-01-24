//Background image mouse move
const reader = new FileReader();
const el = document.body;
var movementStrength = 50;
var height = movementStrength / window.innerHeight;
var width = movementStrength / window.innerWidth;

const limit = 45;


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//console.log('MOBILE')

el.addEventListener("devicemotion", e => {
  //alert(e)
  // var beta     = e.beta; //x-axis
  // var gamma    = e.gamma; //y-axis

  //   var pageX = beta - window.innerWidth / 2;
  //   var pageY = gamma - window.innerHeight / 2;
  //   var newvalueX = width * pageX * -1 - 25;
  //   var newvalueY = height * pageY * -1 - 50;
  // el.style.backgroundPositionX = newvalueX + "px";
  // el.style.backgroundPositionY = newvalueY + "px";
});

} else {

  el.addEventListener("mousemove", (e) => {
    var pageX = e.pageX - window.innerWidth / 2;
    var pageY = e.pageY - window.innerHeight / 2;
    var newvalueX = width * pageX * -1 - 25;
    var newvalueY = height * pageY * -1 - 50;
  el.style.backgroundPositionX = newvalueX + "px";
  el.style.backgroundPositionY = newvalueY + "px";
});

}

reader.addEventListener('loadend', (e) => {
  const text = e.srcElement.result;
  //console.log(text);
});

document.getElementById('api-select').addEventListener('change',(e) => {
  if(e.target.value == '') {
    document.getElementById('api-gather').innerHTML = '<div class="display-4">Choose an API from the drop down..</div>'
  } else {
    var params = {page:e.target.value}
    //console.log(params)
    fetch('/html-page-router',{
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: JSON.stringify(params)
    })
    .then(resp => resp.blob())
    .then(blob => {
      reader.readAsText(blob);
    })
    .catch(err => {
      //console.log(err)
    })
  }
})

reader.addEventListener('loadend', (e) => {
  htmlRenderer('api-gather',e.srcElement.result)
});

const htmlRenderer = (elementId,html) => {
  document.getElementById(`${elementId}`).innerHTML = html;
}


//Interest Calculator API

const interestFormSubmit = () => {
var formICC = document.getElementById('interestCalculatorForm')
var params = {amount: formICC['amount'].value, apr: formICC['apr'].value, period: formICC['period'].value}
console.log(params)
console.log(formICC['url'])

  fetch(`/api/finance/interest-calculate-cc`,{
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(resp => resp.json())
  .then(data => {
    formICC['textarea'].value = JSON.stringify(data);
  })
  .catch(err => {
    formICC['textarea'].value = err;
  })
}


