
const enum ItemState {
    'INITIAL',
    'ITEM_NOT_FOUND',
    'OUT_OF_STOCK',
    'ADDED',
    'REMOVED',
    'PROCESSING',
    'PROCESSED',
    'PENDING_DELIVERY',
    'DELIVERED'

};
export class CommerceItem {
    constructor(
        public id?: number,
        public quantity?: number,
        public state?: ItemState,
        public stateDetail?: string,
        public totalPrice?: number,
        public productId?: number,
        public orderId?: number,
    ) {
    }
}
