const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const smallElement = formControl.querySelector('small');
  smallElement.innerText = message;
};

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

const getFieldName = id => {
  return `${id.charAt(0).toUpperCase()}${id.slice(1)}`;
};

const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input.id)} is required`);
    }
  });
};

const checkLen = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input.id)} too short (${min} characters min)`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input.id)} too long (${max} characters max)`);
  } else {
    showSuccess(input);
  }
};

// Email validation - also validate on server side for security
const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim().toLowerCase()))) {
    showSuccess(input);
  } else if (input.value !== '') {
    showError(input, 'Email is invalid');
  }
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value && input2.value !== '') {
    showError(input2, 'Passwords do not match');
  } else if (input1.value === input2.value && input1.value !== '' && input2.value !== '') {
    showSuccess(input2);
  }
};

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLen(username, 5, 15);
  checkLen(password, 8, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
