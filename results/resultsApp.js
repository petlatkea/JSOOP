import * as result from "./result.js";

let results = [];

async function start() {
  const jsonData = await fetchResults();
  results = fixResults(jsonData);
  sortResults(results);
  displayResults(results);
}

function fixResults(originalResults) {
  const fixedResults = [];
  // loop through each json object - and create an actual Result object with its' data
  for (const jsonObj of originalResults) {
    const realObject = result.construct(jsonObj);
    fixedResults.push(realObject);
  }
  return fixedResults;
}

function sortResults(results) {
  // only sort by time
  results.sort((a,b) => a.time - b.time);
}

function displayResults(results) {
  const list = document.querySelector("table#results tbody");
  list.innerHTML = "";

  const disciplines = {
    breaststroke: "bryst",
    butterfly: "butterfly",
    backstroke: "ryg",
    freestyle:  "freestyle"
  }

  for(const result of results) {
    const html = /*html*/`
      <tr>
        <td>${result.date.toLocaleString("da", {
          weekday: "short", month: "short", day: "numeric", year: "numeric"
        })}</td>
        <td>${result.member}</td>
        <td>${disciplines[result.discipline]}</td>
        <td>${result.isTraining() ? "træning" : "stævne"}</td>
        <td>${result.getTimeString()}</td>
      </tr>`;
    list.insertAdjacentHTML("beforeend", html);

  }
}

async function fetchResults() {
  const resp = await fetch("data/results.json");
  const data = resp.json();
  return data;
}

start();
