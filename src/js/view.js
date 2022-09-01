import { playAudio } from "./audio.js";
import { getSubscribes } from "./firebase/club.js";
import { getHTML } from "./helpers.js";
import { async } from "regenerator-runtime";

const normalAudio = document.getElementById("normal-world");
const invertedAudio = document.getElementById("inverted-world");

const subscribeModal = document.querySelector(".modal-subscribe");
const totalModal = document.querySelector(".modal-total");
const overlay = document.querySelector(".overlay");
const subscribeStatus = document.getElementById("subscribe-status");
const totalSubs = document.getElementById("total-subscribe");
const spinner = document.querySelector(".spinner");
const tableSubs = document.querySelector(".result-subscribe");

export function initAudio() {
  playAudio(normalAudio);
}

export async function switchTheme() {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  const theme = document.body.classList[0];
  const music = theme === "light-theme" ? normalAudio : invertedAudio;

  playAudio(music);
}

export function renderSpinner() {
  overlay.classList.remove("hidden");
  const markup = `<img src="${require("../images/icons/load.png")}" alt="Loading"/>`;

  spinner.insertAdjacentHTML("afterbegin", markup);
}

export function renderModal(status) {
  const img = document.getElementById("img-subscribe");

  if (status === "sucess") {
    subscribeStatus.textContent = "Inscrição realizada com sucesso!";
    img.src = require("../images/modal/sucess.png");
  }

  if (status === "error") {
    subscribeStatus.textContent = "Algo deu errado! Tente novamente.";
    img.src = require("../images/modal/error.png");
    totalSubs.classList.add("hidden");
  }
}

export function openModal(modal) {
  modal.classList.remove("hidden");
  spinner.innerHTML = "";
}

export function closeModal() {
  subscribeModal.classList.add("hidden");
  totalModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

export async function getTotalNumber() {
  const subs = await getSubscribes();
  totalSubs.textContent = `Total de inscritos: ${subs.length}`;
}

export async function renderTotal() {
  closeModal();
  renderSpinner();

  const html = await getHTML();
  tableSubs.innerHTML = "";
  tableSubs.insertAdjacentHTML("beforeend", html);

  openModal(totalModal);
}
