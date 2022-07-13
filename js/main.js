let user = {
  name: '',
  email: '',
  pass: ''
}







let next = document.querySelector('.next');
let inputs = document.querySelector('.inputs');
let submit = document.querySelector('.submit');
let count = 0;
let name = document.querySelector('#user');
let email = document.querySelector('#email');
let pass = document.querySelector('#pass');
let apass = document.querySelector('#apass');

let validName = /^[a-zA-Z ]{2,30}$/;
let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let validPass = /^[A-Za-z](\w|\d){7,14}$/;




if (window.localStorage.User) {
  user = JSON.parse(window.localStorage.User)
  document.querySelector('.done').classList.add('active');
  document.querySelector('.user_data').classList.add('active');
  setTimeout(() => document.querySelector('.done').classList.remove('active'), 1000);
  document.querySelector('.user_name').textContent = user.name;
  document.querySelector('.user_email').textContent = user.email;
}




inputs.children[0].querySelector('input').focus();
next.onclick = swip;

submit.onclick = signup;
inputs.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', function() {
    if (this.id == 'user') {
      check(validName.test(name.value), document.querySelector('.regex_name'))
    } else if (this.id == 'email') {
      check(validEmail.test(this.value), document.querySelector('.regex_email'))
    } else if (this.id == 'pass') {
      check(validPass.test(pass.value), document.querySelector('.regex_pass'))
    } else {
      if (pass.value == apass.value) {
        check(validPass.test(apass.value), document.querySelector('.regex_apass'))
      }
    }
  })
})

document.querySelector('.singout').onclick = () => {
  window.localStorage.removeItem('User');
    document.querySelector('.user_data').classList.remove('active');

  setTimeout(() => window.location.reload(), 2000);
}

function swip() {
  if (count < inputs.children.length - 1) count++;

  if (count == inputs.children.length - 1) {
    submit.classList.add('active');
    next.classList.add('rm')
  }
  else {
    submit.classList.remove('active')
    next.classList.remove('rm')
  }
  setTimeout(() => inputs.children[count].querySelector('input').focus(), 1000);
  inputs.scrollTo({
    left: inputs.offsetWidth * count,
    behavior: "smooth"
  });

}

function signup() {
  if (valid()) {
    user.name = name.value;
    user.email = email.value;
    user.pass = pass.value;
    console.log(user)
    document.querySelector('.done').classList.add('active')
    window.localStorage.User = JSON.stringify(user);
    window.location.reload();
  }
}

function valid() {
  return validName.test(name.value) && validPass.test(pass.value) && validPass.test(apass.value) && validEmail.test(email.value);
}

function check(test, span) {
  if (test) {
    console.log(1)
    span.textContent = span.dataset.valid
    span.classList.remove('no')
    span.classList.remove('he')
    span.classList.add('acc')
  } else {
    console.log(2)
    span.textContent = span.dataset.novalid
    span.classList.add('no')
    span.classList.remove('acc')
    span.classList.remove('he')
  }
  setTimeout(() => span.classList.add('he'), 4000)

}