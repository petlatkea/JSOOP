import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import * as ListRenderer from "./listrenderer.js";
import { MemberRenderer } from "./member_renderer.js";
import { ResultRenderer} from "./result_renderer.js";

window.addEventListener("load", initApp);

let members = [];
let results = [];

async function initApp() {
  initTabs();

  // load data-objects
  await buildMemberList()
  await buildResultList();

  // create lists
  const memberList = ListRenderer.construct(members, "table#members tbody", MemberRenderer);
  const resultList = ListRenderer.construct(results, "table#results tbody", ResultRenderer);

  // display lists
  memberList.render();
  resultList.render();

  // make headlines sort the lists
  document.querySelectorAll("table#members thead [data-action=sort]")
  .forEach(sortButton => sortButton.addEventListener("click", ()=>{
    memberList.sort(sortButton.dataset.sortBy);
  }));

  document.querySelectorAll("table#results thead [data-action=sort]")
  .forEach(sortButton => sortButton.addEventListener("click", ()=>{
    resultList.sort(sortButton.dataset.sortBy);
  }))

  window.results = results;
  window.members = members;
}

export function getMember(memberId) {
  return members.find(member => member.id === memberId );
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
