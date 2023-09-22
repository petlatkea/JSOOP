const disciplines = {
    breaststroke: "bryst",
    butterfly: "butterfly",
    backstroke: "ryg",
    freestyle: "freestyle",
};

export const ResultRenderer = {
    render() {
        const result = this.item;
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
            <td><button data-action="delete">delete</button></td>
        </tr>`;
    return html;
    },
    postRender(element) {
        element.querySelector("[data-action='delete']").addEventListener("click", this.deleteResult.bind(this));
    },
    deleteResult() {
        console.log(this);
        console.log("Delete result: " + this.item.id);
        // TODO: Call external function to delete a result
    }
};
