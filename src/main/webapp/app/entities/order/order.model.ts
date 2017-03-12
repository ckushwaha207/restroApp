
const enum OrderState {
    'SUBMITTED',
    'FAILED',
    'APPROVED',
    'PROCESSING',
    'PROCESSED',
    'AMENDED',
    'FAILED_APPROVAL',
    'FAILED_AMENDMENT',
    'PENDING_CUSTOMER_ACTION',
    'PENDING_MERCHANT_ACTION',
    'NO_PENDING_ACTION'

};
export class Order {
    constructor(
        public id?: number,
        public orderNumber?: string,
        public state?: OrderState,
        public total?: number,
        public subTotal?: number,
        public itemsId?: number,
        public paymentsId?: number,
        public profileId?: number,
    ) {
    }
}
