class BubbleSort {
    constructor (highlightItemsAsync, redraw, cancellationToken) {
        this.highlightItemsAsync = highlightItemsAsync;
        this.redraw = redraw;
        this.cancellationToken = cancellationToken;
    }

    async sort(array) {
        for (let i = 0; i < array.length; i++) {
            for (let k = 0; k < array.length - i - 1; k++) {
                //Check cancellation
                if (this.cancellationToken.isCancelled) {
                    return;
                }

                await this.highlightItemsAsync(k, k + 1);
    
                if (array[k].value > array[k + 1].value) {
                    this.swap(array, k, k+1);
                }
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