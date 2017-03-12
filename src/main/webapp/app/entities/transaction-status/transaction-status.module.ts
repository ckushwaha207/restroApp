import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    TransactionStatusService,
    TransactionStatusPopupService,
    TransactionStatusComponent,
    TransactionStatusDetailComponent,
    TransactionStatusDialogComponent,
    TransactionStatusPopupComponent,
    TransactionStatusDeletePopupComponent,
    TransactionStatusDeleteDialogComponent,
    transactionStatusRoute,
    transactionStatusPopupRoute,
    TransactionStatusResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...transactionStatusRoute,
    ...transactionStatusPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TransactionStatusComponent,
        TransactionStatusDetailComponent,
        TransactionStatusDialogComponent,
        TransactionStatusDeleteDialogComponent,
        TransactionStatusPopupComponent,
        TransactionStatusDeletePopupComponent,
    ],
    entryComponents: [
        TransactionStatusComponent,
        TransactionStatusDialogComponent,
        TransactionStatusPopupComponent,
        TransactionStatusDeleteDialogComponent,
        TransactionStatusDeletePopupComponent,
    ],
    providers: [
        TransactionStatusService,
        TransactionStatusPopupService,
        TransactionStatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyTransactionStatusModule {}
