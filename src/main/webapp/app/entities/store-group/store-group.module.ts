import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    StoreGroupService,
    StoreGroupPopupService,
    StoreGroupComponent,
    StoreGroupDetailComponent,
    StoreGroupDialogComponent,
    StoreGroupPopupComponent,
    StoreGroupDeletePopupComponent,
    StoreGroupDeleteDialogComponent,
    storeGroupRoute,
    storeGroupPopupRoute,
    StoreGroupResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...storeGroupRoute,
    ...storeGroupPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        StoreGroupComponent,
        StoreGroupDetailComponent,
        StoreGroupDialogComponent,
        StoreGroupDeleteDialogComponent,
        StoreGroupPopupComponent,
        StoreGroupDeletePopupComponent,
    ],
    entryComponents: [
        StoreGroupComponent,
        StoreGroupDialogComponent,
        StoreGroupPopupComponent,
        StoreGroupDeleteDialogComponent,
        StoreGroupDeletePopupComponent,
    ],
    providers: [
        StoreGroupService,
        StoreGroupPopupService,
        StoreGroupResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyStoreGroupModule {}
