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
      },
      sortBy: undefined,
      sortDir: "asc",
      sort(sortBy) {
        if(this.sortBy === sortBy) {
            // toggle direction
            if(this.sortDir === "asc") {
                this.sortDir = "desc";
            } else {
                this.sortDir = "asc";
            }
        } else {
            this.sortBy = sortBy;
            this.sortDir = "asc";
        }

        this.list.sort((a,b) => {
            if( typeof a[this.sortBy] === "string") {
                if( a[this.sortBy] > b[this.sortBy]) {
                    if( this.sortDir === "asc") {
                        return 1;
                    } else {
                        return -1;
                    }
                    
                } else {
                    if( this.sortDir === "asc") {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            } else {
                if( this.sortDir === "asc") {
                    return a[this.sortBy] - b[this.sortBy];
                } else {
                    return b[this.sortBy] - a[this.sortBy];
                }
            }
        });
        this.clear();
        this.render();
      }
    }
    return ListRenderer;
}

