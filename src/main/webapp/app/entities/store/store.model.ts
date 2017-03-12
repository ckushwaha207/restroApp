export class Store {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public timings?: string,
        public website?: string,
        public email?: string,
        public phoneNumber?: string,
        public mobileNumber?: string,
        public faxNumber?: string,
        public siteUrl?: string,
        public locationId?: number,
        public tablesId?: number,
        public organizationId?: number,
        public storeGroupId?: number,
        public menusId?: number,
    ) {
    }
}
