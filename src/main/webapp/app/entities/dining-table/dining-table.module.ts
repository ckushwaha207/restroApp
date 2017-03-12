import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    DiningTableService,
    DiningTablePopupService,
    DiningTableComponent,
    DiningTableDetailComponent,
    DiningTableDialogComponent,
    DiningTablePopupComponent,
    DiningTableDeletePopupComponent,
    DiningTableDeleteDialogComponent,
    diningTableRoute,
    diningTablePopupRoute,
    DiningTableResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...diningTableRoute,
    ...diningTablePopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DiningTableComponent,
        DiningTableDetailComponent,
        DiningTableDialogComponent,
        DiningTableDeleteDialogComponent,
        DiningTablePopupComponent,
        DiningTableDeletePopupComponent,
    ],
    entryComponents: [
        DiningTableComponent,
        DiningTableDialogComponent,
        DiningTablePopupComponent,
        DiningTableDeleteDialogComponent,
        DiningTableDeletePopupComponent,
    ],
    providers: [
        DiningTableService,
        DiningTablePopupService,
        DiningTableResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyDiningTableModule {}
