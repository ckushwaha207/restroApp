
const enum PaymentMethod {
    'CASH',
    'CREDIT_CARD',
    'DEBIT_CARD',
    'NET_BANKING',
    'MOBILE_BANKING',
    'PAYTM'

};

const enum PaymentState {
    'INITIAL',
    'AUTHORIZED',
    'AUTHORIZED_FAILED',
    'CREDIT_FAILED',
    'REMOVED',
    'SETTLE_FAILED',
    'SETTLED'

};
export class Payment {
    constructor(
        public id?: number,
        public method?: PaymentMethod,
        public state?: PaymentState,
        public amount?: number,
        public authorizedAmount?: number,
        public authorizationStatusId?: number,
        public orderId?: number,
    ) {
    }
}
