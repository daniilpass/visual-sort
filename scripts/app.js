class App {
    constructor(containerNode) {
        this.containerNode = containerNode;

        this.arrayItemWidth = 10;
        this.arrayItemPadding = 5;
        
        
        this.array = []
        this.arrayCopy = [];
        
        this.colors = {
            default: "#2d2de6",
            current: "#2de66e",
            next: "#2d91e6",
            border: "#1212b1"
        }
        
        this.highlightTimeout = 1000/40;
        //this.transitionTimeout = 2000;
    }
    
    //
    // Array functions
    //
    initArray = (size) => {
        this.array = [];
        for (let index = 0; index < size; index++) {        
            let value = Math.ceil(Math.random() * 100) + 1;  
            let item = this.createDomItem(value, this.arrayItemWidth);
            this.array[index] = {};
            this.array[index].value = value;
            this.array[index].node  = item;
        }    
    }
    
    saveArrayCopy = () => {
        this.arrayCopy = [];
        for (let i = 0; i < this.array.length; i++) {
            this.arrayCopy[i] = {
                value: this.array[i].value,
                node: this.array[i].node,
            };
        }
    }
    
    restoreArrayFromCopy = () => {
        this.array = [];
        for (let i = 0; i < this.arrayCopy.length; i++) {
            this.array[i] = {
                value: this.arrayCopy[i].value,
                node: this.arrayCopy[i].node,
            };
        }
    }
    
    //
    // DOM manipulations
    //
    createDomItem = (height, width) => {
        let item = document.createElement("div");
        item.classList.add("array-item");
        item.style.height = height + "px";
        return item;
    }
    
    drawArrayItems = (clear = true) => {
        if (clear)
            this.containerNode.innerHTML = '';

        for (let index = 0; index < this.array.length; index++) {
            let item = this.array[index].node
            let left =  index * (this.arrayItemWidth + this.arrayItemPadding);
            item.style.left = left + "px";

            if (clear)
                this.containerNode.appendChild(item);  
        } 
    }
    
    redrawArrayItems = () => {
        this.drawArrayItems(false);
    }
    
    setItemColor = (index, color) =>{
        this.array[index].node.style.background = color;
    }
    
    setItemOpacity = (index, value) =>{
        this.array[index].node.style.opacity = value;
    }
    
    async highlightArrayItemsAsync(i1, i2, i3) {
        this.setItemColor(i1, this.colors.current);
        this.setItemColor(i2, this.colors.next);
        i3 && this.setItemColor(i3, this.colors.border);
    
        await new Promise(r => setTimeout(r, this.highlightTimeout));
    
        this.setItemColor(i1, this.colors.default);
        this.setItemColor(i2, this.colors.default);
        i3 && this.setItemColor(i3, this.colors.default);
    }
    
    setArrayItemsOpacity = (visibleStart, visibleEnd) => {
        for (let i = 0; i < this.array.length; i++) {
            let value = i >= visibleStart && i <= visibleEnd ? 1 : 0.4;
            this.setItemOpacity(i, value);       
        }
    }    

    checkResult = (arr) => {
        let good = true;
        for (let i = 0; i < arr.length - 2; i++) {        
            if (arr[i+1].value < arr[i].value) {
                good = false;
                
            }
        }
        if (good) {
            console.log("CORRECT RESULT");
        } else {
            console.log("WRONG RESULT");
        }
    }

    //
    // Main methods
    //
    randomize = () => {
        this.initArray(50);
        this.saveArrayCopy();
        this.drawArrayItems();
    }

    undoSorting = () => {
        this.restoreArrayFromCopy();
        this.drawArrayItems();
    }

    async executeAndMeasureAyncAction (acyncAction) {
        let t0 = performance.now();
        await acyncAction();
        let t1 = performance.now();
        let timeElapsed = Math.floor(t1 - t0);

        console.log(`Time elapsed: ${timeElapsed} ms.`);
        return timeElapsed;
    }


    async bubbleSort() {
        await this.executeAndMeasureAyncAction(async () => {
            await new BubbleSort(this.highlightArrayItemsAsync.bind(this), this.redrawArrayItems).sort(this.array);
        })
        
        this.checkResult(this.array);
    }

    async quickSort() {
        await this.executeAndMeasureAyncAction(async () => {
            await new QuickSort(this.highlightArrayItemsAsync.bind(this), this.setArrayItemsOpacity, this.redrawArrayItems).sort(this.array, 0, this.array.length - 1);
        })

        this.checkResult(this.array);
    }
}