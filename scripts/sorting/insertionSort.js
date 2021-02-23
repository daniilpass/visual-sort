class InsertionSort {
    constructor (highlightItemsAsync, redraw, cancellationToken) {
        this.highlightItemsAsync = highlightItemsAsync;
        this.redraw = redraw;
        this.cancellationToken = cancellationToken;
    }

    // async sort(array) {
    //     for (let j = 1; j < array.length; j++) {
    //         if (this.cancellationToken.isCancelled) {
    //             return;
    //         }

    //         const key = array[j];
    //         let i = j - 1;

    //         while (i >= 0 && array[i].value > key.value) {
    //             if (this.cancellationToken.isCancelled) {
    //                 return;
    //             }

    //             await this.highlightItemsAsync(i, i + 1);
    //             //HACK: move insertion node
    //             key.node.style.left = parseInt(array[i].node.style.left.slice(0, -2)) + "px";

    //             array[i + 1] = array[i];
    //             i = i - 1;
                
    //             this.redraw();
    //         }
    //         array[i + 1] = key;
    //         this.redraw();
    //     }  
    //     this.redraw();      
    // }

    async sort(array) {
        for (let i = 1; i < array.length; i++) {
            if (this.cancellationToken.isCancelled) {
                return;
            }

            let j = i;
            await this.highlightItemsAsync(j);

            while (j > 0 && array[j].value < array[j-1].value ) {
                await this.highlightItemsAsync(j, j - 1);
                this.swap(array, j, j-1);
                j = j - 1;
            }
        }    
    }

    swap(arr, i1, i2) {
        let tmp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp;
        this.redraw();
    }
}