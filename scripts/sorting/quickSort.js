class QuickSort {
    constructor (highlightItemsAsync, setOpacity, redraw) {
        this.highlightItemsAsync = highlightItemsAsync;
        this.redraw = redraw;
        this.setOpacity = setOpacity;
    }

    async sort(arr, low, high) {
        if (low < high) {
            let p = await this.partition(arr, low, high);
            await this.sort(arr, low, p - 1);
            await this.sort(arr, p + 1, high);
            this.setOpacity(0, arr.length - 1);
        }
    }

    async partition(arr, low, high) {
        this.setOpacity(low, high);
        let pivot = arr[high].value;
        let i = low;

        for (let j = low; j <= high - 1; j++) {
            await this.highlightItemsAsync(i, j, high);
            if (arr[j].value <= pivot) {
                this.swap(arr, i, j);
                i = i + 1;
            }          
        }
        
        await this.highlightItemsAsync(i, high);
        this.swap(arr, i, high);
        return i;
    }

    swap(arr, i1, i2) {
        let tmp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp;
        this.redraw();
    }
}