import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const dataObj = { email: '', message: '' };

checkStorage(localStorage, formEl);

formEl.addEventListener('input', throttle(inputsListener, 500));
formEl.addEventListener('submit', formSubmit);

function inputsListener(ev) {
  if (ev.target.name === 'email') {
    dataObj.email = ev.target.value;
  } else dataObj.message = ev.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(dataObj));
}

function checkStorage(dataValue, form) {
  const dataObj = dataValue.getItem('feedback-form-state');
  if (dataObj) {
    const dataObjParsed = JSON.parse(dataObj);
    if (dataObjParsed.email) {
      form.elements.email.value = dataObjParsed.email;
    }
    if (dataObjParsed.message) {
      form.elements.message.value = dataObjParsed.message;
    }
  }
}

function formSubmit(ev) {
  ev.preventDefault();
  console.dir(dataObj);
  ev.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
