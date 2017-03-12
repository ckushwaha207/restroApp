export class TransactionStatus {
    constructor(
        public id?: number,
        public transactionId?: string,
        public transactionSuccess?: boolean,
        public amount?: number,
        public errorCode?: string,
        public errorMessage?: string,
        public paymentId?: number,
    ) {
        this.transactionSuccess = false;
    }
}
