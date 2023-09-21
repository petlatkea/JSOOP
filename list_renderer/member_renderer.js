export const MemberRenderer = {
    render(member) {
        const html = /*html*/`
            <tr>
              <td>${member.name}</td>
              <td>${member.active?"aktiv":"ikke aktiv"}</td>
              <td>${member.birthday.toLocaleString("da", {month: "short", day: "numeric", year: "numeric"})}</td>
              <td>${member.age}</td>
              <td>${member.isJunior?"Junior":"Senior"}</td>
            </tr>`;
        return html;
    }
}