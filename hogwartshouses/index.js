import * as Student from "./student.js";

window.addEventListener("load", main);

let students = [];

async function main() {
  students = await fetchStudents();
  
  setupSortButtons();

  displayStudents(students);
}

function setupSortButtons() {
  document.querySelector("th#sort-firstname").addEventListener("click", () => sortBy("firstName"));
  document.querySelector("th#sort-middlename").addEventListener("click", () => sortBy("middleName"));
  document.querySelector("th#sort-lastname").addEventListener("click", () => sortBy("lastName"));
  document.querySelector("th#sort-house").addEventListener("click", () => sortBy("house"));
}

async function fetchStudents() {
  const response = await fetch("students.json");
  const rawJSON = await response.json();

  return rawJSON.map(Student.construct);
}

function sortBy(property) {
  students.sort((a,b) => a[property].localeCompare(b[property]));
  displayStudents(students);
}

function displayStudents(students) {
  const table = document.querySelector("table#students tbody");
  table.innerHTML = "";

  for(const student of students) {
    let middleName = "";
    if( student.hasMiddleName() ) {
      middleName = student.middleName
    }
    const html = /*html*/`
    <tr>
      <td>${student.firstName}</td>
      <td>${middleName}</td>
      <td>${student.lastName}</td>
      <td>${student.house}</td>
    </tr>`
    table.insertAdjacentHTML("beforeend", html);
  }
}