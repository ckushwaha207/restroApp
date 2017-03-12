import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    TableQRService,
    TableQRPopupService,
    TableQRComponent,
    TableQRDetailComponent,
    TableQRDialogComponent,
    TableQRPopupComponent,
    TableQRDeletePopupComponent,
    TableQRDeleteDialogComponent,
    tableQRRoute,
    tableQRPopupRoute,
    TableQRResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...tableQRRoute,
    ...tableQRPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TableQRComponent,
        TableQRDetailComponent,
        TableQRDialogComponent,
        TableQRDeleteDialogComponent,
        TableQRPopupComponent,
        TableQRDeletePopupComponent,
    ],
    entryComponents: [
        TableQRComponent,
        TableQRDialogComponent,
        TableQRPopupComponent,
        TableQRDeleteDialogComponent,
        TableQRDeletePopupComponent,
    ],
    providers: [
        TableQRService,
        TableQRPopupService,
        TableQRResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyTableQRModule {}
