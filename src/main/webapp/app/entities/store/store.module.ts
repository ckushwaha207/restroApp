import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    StoreService,
    StorePopupService,
    StoreComponent,
    StoreDetailComponent,
    StoreDialogComponent,
    StorePopupComponent,
    StoreDeletePopupComponent,
    StoreDeleteDialogComponent,
    storeRoute,
    storePopupRoute,
    StoreResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...storeRoute,
    ...storePopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StoreComponent,
        StoreDetailComponent,
        StoreDialogComponent,
        StoreDeleteDialogComponent,
        StorePopupComponent,
        StoreDeletePopupComponent,
    ],
    entryComponents: [
        StoreComponent,
        StoreDialogComponent,
        StorePopupComponent,
        StoreDeleteDialogComponent,
        StoreDeletePopupComponent,
    ],
    providers: [
        StoreService,
        StorePopupService,
        StoreResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyStoreModule {}
