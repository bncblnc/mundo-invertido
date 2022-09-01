import app from "./firebase/app.js";
import { closeModal, initAudio, renderTotal, switchTheme } from "./view.js";
import { subscribe } from "./helpers.js";
import { audioControl } from "./audio.js";

const btnInverted = document.getElementById("switch-theme-button");
const btnSubscribe = document.getElementById("btn-subscribe");
const btnAudio = document.getElementById("btn-audio");
const btnCloseModal = document.querySelectorAll(".btn-close-modal");
const totalSubs = document.getElementById("total-subscribe");

const overlay = document.querySelector(".overlay");
const modalSubs = document.querySelector(".modal-subscribe");
const modalTotal = document.querySelector(".modal-total");

btnInverted.addEventListener("click", switchTheme);
btnSubscribe.addEventListener("click", subscribe);
btnAudio.addEventListener("click", audioControl);
totalSubs.addEventListener("click", renderTotal);
btnCloseModal.forEach((btn) => btn.addEventListener("click", closeModal));
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    (!modalSubs.classList.contains("hidden") ||
      !modalTotal.classList.contains("hidden"))
  ) {
    closeModal();
  }
});

initAudio();
