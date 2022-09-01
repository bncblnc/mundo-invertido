import { getSubscribes, subscribeToClub } from './firebase/club';
import {
  renderSpinner,
  renderModal,
  openModal,
  getTotalNumber,
} from './view.js';

const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtCharacter = document.getElementById('txtCharacter');
const txtLevel = document.getElementById('txtLevel');
const subscribeModal = document.querySelector('.modal-subscribe');

export async function subscribe() {
  // prettier-ignore
  if (!validateDatas(txtName.value, txtEmail.value, txtLevel.value, txtCharacter.value)) return;

  const subscription = {
    name: txtName.value,
    email: txtEmail.value,
    level: txtLevel.value,
    character: txtCharacter.value,
    date: new Date(),
  };

  renderSpinner();

  try {
    await subscribeToClub(subscription);
    await getTotalNumber();
    clearInputs();
    renderModal('sucess');
  } catch (err) {
    renderModal('error');
  } finally {
    openModal(subscribeModal);
  }
}

export async function getHTML() {
  const subs = await getSubscribes();
  const subsSorted = subs.sort((a, b) => b.date - a.date);
  subsSorted.splice(10);

  let html = `
    <tr class="table-title">
      <td>Nome:</td>
      <td>Level:</td>
      <td>Personagem:</td>
    </tr>`;

  subsSorted.forEach(sub => {
    let character =
      sub.character.length > 24
        ? `${sub.character.slice(0, 24)}...`
        : sub.character;
    character = captalized(character);
    let firstName = sub.name.split(' ')[0];
    firstName = captalized(firstName);

    html += `
      <tr class="table-normal">
        <td>${firstName}</td>
        <td>${sub.level}</td>
        <td>${character}</td>
      </tr>`;
  });

  return html;
}

function validateDatas(name, email, level, character) {
  resetInvalid();
  let control = true;

  if (name === '') {
    txtName.classList.add('invalid');
    txtName.placeholder = '*Digite o nome';
    control = false;
  }
  if (email === '') {
    txtEmail.classList.add('invalid');
    txtEmail.placeholder = '*Digite o e-mail';
    control = false;
  }
  if (level === '' || level < 0) {
    txtLevel.value = '';
    txtLevel.classList.add('invalid');
    txtLevel.placeholder = '*Digite o level';
    control = false;
  }
  if (character === '') {
    txtCharacter.classList.add('invalid');
    txtCharacter.placeholder = '*Digite seu personagem';
    control = false;
  }

  return control;
}

function resetInvalid() {
  // prettier-ignore
  txtName.placeholder = txtEmail.placeholder = txtLevel.placeholder = txtCharacter.placeholder = '';
  txtName.classList.remove('invalid');
  txtEmail.classList.remove('invalid');
  txtLevel.classList.remove('invalid');
  txtCharacter.classList.remove('invalid');
}

function clearInputs() {
  txtName.value = txtEmail.value = txtLevel.value = txtCharacter.value = '';
  txtCharacter.blur();
}

function captalized(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
