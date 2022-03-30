// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  delayAmaunt: document.querySelector('[name="amount"]'),
}

refs.form.addEventListener('submit', clickForm)

function clickForm(event) {
  event.preventDefault()

  let delay = Number(refs.delay.value);
  let delayStep = Number(refs.delayStep.value);
  let delayAmount = Number(refs.delayAmaunt.value);
  for (let position = 1; position <= delayAmount; position += 1) {
    createPromise(position, delay)
      .then(onSuccess)
      .catch(onError)
      delay += delayStep;
  }

}
  
function onSuccess (value) {
  Notify.success(`✅ Fulfilled promise ${value.position} in ${value.delay}ms`);
}

function onError (error) {
  Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
}


function createPromise(position, delay) {
      const shouldResolve = Math.random() > 0.3;

 return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay);
})
}




