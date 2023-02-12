import { startApp } from "./startApp.js";

export const container = document.querySelector(".container");

export function clearContainer() {
  container.innerHTML = "";
}

startApp();
