export function construct(list, container, itemRenderer) {
    const ListRenderer = {
      list: list,
      itemRenderer: itemRenderer,
      container: document.querySelector(container),
      clear() {
        this.container.innerHTML = "";
      },
      render() {
        for(const item of this.list) {
            const html = this.itemRenderer.render(item);
            this.container.insertAdjacentHTML("beforeend", html);
        }
      }
    }
    return ListRenderer;
}

