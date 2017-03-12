
const enum Diet {
    'VEG',
    'NON_VEG',
    'EGG'

};
export class MenuItem {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public preparationTime?: number,
        public ingredient?: string,
        public imageUrl?: string,
        public description?: string,
        public diet?: Diet,
        public categoryId?: number,
    ) {
    }
}
