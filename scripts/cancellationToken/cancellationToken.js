class CancellationToken {
    constructor() {
        this.cancelled = false;
    }

    get isCancelled() {
        return this.cancelled;
    }

    cancel = () => {
        this.cancelled = true;
    }
}