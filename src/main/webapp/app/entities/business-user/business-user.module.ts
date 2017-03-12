import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';
import { FoodAppetencyAdminModule } from '../../admin/admin.module';

import {
    BusinessUserService,
    BusinessUserPopupService,
    BusinessUserComponent,
    BusinessUserDetailComponent,
    BusinessUserDialogComponent,
    BusinessUserPopupComponent,
    BusinessUserDeletePopupComponent,
    BusinessUserDeleteDialogComponent,
    businessUserRoute,
    businessUserPopupRoute,
    BusinessUserResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...businessUserRoute,
    ...businessUserPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        FoodAppetencyAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BusinessUserComponent,
        BusinessUserDetailComponent,
        BusinessUserDialogComponent,
        BusinessUserDeleteDialogComponent,
        BusinessUserPopupComponent,
        BusinessUserDeletePopupComponent,
    ],
    entryComponents: [
        BusinessUserComponent,
        BusinessUserDialogComponent,
        BusinessUserPopupComponent,
        BusinessUserDeleteDialogComponent,
        BusinessUserDeletePopupComponent,
    ],
    providers: [
        BusinessUserService,
        BusinessUserPopupService,
        BusinessUserResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyBusinessUserModule {}
