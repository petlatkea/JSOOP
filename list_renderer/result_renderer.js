const disciplines = {
    breaststroke: "bryst",
    butterfly: "butterfly",
    backstroke: "ryg",
    freestyle: "freestyle",
};

export const ResultRenderer = {
    render(result) {
        const html = /*html*/ `
        <tr>
            <td>${result.date.toLocaleString("da", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            })}</td>
            <td>${result.member?.name ?? "-ukendt medlem-"}</td>
            <td>${disciplines[result.discipline]}</td>
            <td>${result.isTraining ? "træning" : "stævne"}</td>
            <td>${result.getTimeString()}</td>
        </tr>`;
    return html;
    },
};
