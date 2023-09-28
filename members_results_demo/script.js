import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";

window.addEventListener("load", initApp);

let members = [];
let results = [];

async function initApp() {
  initTabs();

  // load data-objects
  await buildMemberList();
  await buildResultList();

  // show sort-possibilities
  populateMemberSortSelector();
  populateResultSortSelector();

  // display lists
  displayMemberList(members);
  displayResultList(results);

  window.results = results;
  window.members = members;
}

function populateMemberSortSelector() {
  const selector = document.querySelector("select#member-sort");

  // create an option for each property of member:
  // Grab a random member (the first one)
  const member = members[0];
  // loop through all the properties
  for (const propertyName in member) {
    // create an <option> with this propertyName
    const html = `<option>${propertyName}</option>`;
    selector.insertAdjacentHTML("beforeend", html);
  }

  selector.addEventListener("change", selectMemberSort);
}

function selectMemberSort(event) {
  const selector = document.querySelector("select#member-sort");
  const sortBy = selector.value;
  console.log("sortby: " + sortBy);

  members.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else {
      return -1;
    }
  });
  displayMemberList(members);
}

function populateResultSortSelector() {}

// *****************************************************************

export function getMember(memberId) {
  return members.find(member => member.id === memberId);
}

function displayMemberList(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const html = /*html*/ `
      <tr>
        <td>${member.name}</td>
        <td>${member.active ? "aktiv" : "ikke aktiv"}</td>
        <td>${member.birthday.toLocaleString("da", { month: "short", day: "numeric", year: "numeric" })}</td>
        <td>${member.age}</td>
        <td>${member.isJunior ? "Junior" : "Senior"}</td>
      </tr>`;
    table.insertAdjacentHTML("beforeend", html);

    const element = table.lastElementChild;
    element.addEventListener("click", () => clickMember(member));
  }
}

function displayResultList(results) {
  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";

  const disciplines = {
    breaststroke: "bryst",
    butterfly: "butterfly",
    backstroke: "ryg",
    freestyle: "freestyle",
  };

  for (const result of results) {
    let name = "-ukendt medlem-";
    if (result.member !== undefined) {
      name = result.member.name;
    }
    let træningElStævne = "stævne";
    if (result.isTraining()) {
      træningElStævne = "træning";
    }

    const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da", {weekday: "short", month: "short", day: "numeric", year: "numeric"})}</td>
      <td>${name}</td>
      <td>${disciplines[result.discipline]}</td>
      <td>${træningElStævne}</td>
      <td>${result.getTimeString()}</td>
    </tr>`;
    table.insertAdjacentHTML("beforeend", html);
  }
}

async function buildMemberList() {
  const originalData = await fetchMembers();
  members = originalData.map(member.construct);
}

async function buildResultList() {
  const originalData = await fetchResults();
  results = originalData.map(result.construct);
}

async function fetchMembers() {
  return await fetch("data/members.json").then(resp => resp.json());
}

async function fetchResults() {
  return await fetch("data/results.json").then(resp => resp.json());
}
