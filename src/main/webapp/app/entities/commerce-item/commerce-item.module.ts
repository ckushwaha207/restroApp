import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    CommerceItemService,
    CommerceItemPopupService,
    CommerceItemComponent,
    CommerceItemDetailComponent,
    CommerceItemDialogComponent,
    CommerceItemPopupComponent,
    CommerceItemDeletePopupComponent,
    CommerceItemDeleteDialogComponent,
    commerceItemRoute,
    commerceItemPopupRoute,
    CommerceItemResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...commerceItemRoute,
    ...commerceItemPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommerceItemComponent,
        CommerceItemDetailComponent,
        CommerceItemDialogComponent,
        CommerceItemDeleteDialogComponent,
        CommerceItemPopupComponent,
        CommerceItemDeletePopupComponent,
    ],
    entryComponents: [
        CommerceItemComponent,
        CommerceItemDialogComponent,
        CommerceItemPopupComponent,
        CommerceItemDeleteDialogComponent,
        CommerceItemDeletePopupComponent,
    ],
    providers: [
        CommerceItemService,
        CommerceItemPopupService,
        CommerceItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyCommerceItemModule {}
