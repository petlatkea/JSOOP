export function construct(list, container, itemRenderer) {
    const ListRenderer = {
      //list: list,
      //itemRenderer: itemRenderer,
      renderers: list.map( item => Object.create(itemRenderer, { item: { value: item } })),
      container: document.querySelector(container),
      clear() {
        this.container.innerHTML = "";
      },
      render() {
        for(const renderer of this.renderers) {
            const html = renderer.render();
            
            this.container.insertAdjacentHTML("beforeend", html);
            const element = this.container.lastElementChild;

            if(renderer.postRender) {
                renderer.postRender(element);
            }
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

        this.renderers.sort((a,b) => {
            if( typeof a.item[this.sortBy] === "string") {
                if( a.item[this.sortBy] > b.item[this.sortBy]) {
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
                    return a.item[this.sortBy] - b.item[this.sortBy];
                } else {
                    return b.item[this.sortBy] - a.item[this.sortBy];
                }
            }
        });
        this.clear();
        this.render();
      }
    }

    // build internal list of itemRenderer objects?


    return ListRenderer;
}

