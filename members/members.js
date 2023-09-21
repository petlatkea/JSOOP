main();

async function main() {
  await buildMembersList();
  displayMembers(members);
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for(const orgobj of originalObjects) {
    const memberObj = constructMember(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for(const member of members) {
    const html = /*html*/`
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td class="date">${member.birthday.toLocaleString("da", {month: "short", day: "numeric", year: "numeric"})}</td>
      <td>${member.getAge()}</td>
      <td>${member.isJunior()}</td>
      <td>${member.isSenior()}</td>
      <td>${member.email}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function constructMember(memberdata) {
  const MemberObject = {
    name: memberdata.firstName,
    active: memberdata.isActiveMember,
    competitive: memberdata.isCompetitive,
    birthday: new Date(memberdata.dateOfBirth),
    email: memberdata.email,
    gender: memberdata.gender,
    image: memberdata.image,
    hasPayed: memberdata.hasPayed,
    getAge() {
      const diff = Date.now() - this.birthday.getTime();
      const years = Math.floor(diff/1000/60/60/24/365);
      return years;
    },
    isJunior() {
      return this.getAge() < 18;
    },
    isSenior() {
      return this.getAge() >= 18;
    }
  }

  return MemberObject;
}

