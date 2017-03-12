import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    MenuItemService,
    MenuItemPopupService,
    MenuItemComponent,
    MenuItemDetailComponent,
    MenuItemDialogComponent,
    MenuItemPopupComponent,
    MenuItemDeletePopupComponent,
    MenuItemDeleteDialogComponent,
    menuItemRoute,
    menuItemPopupRoute,
    MenuItemResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...menuItemRoute,
    ...menuItemPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MenuItemComponent,
        MenuItemDetailComponent,
        MenuItemDialogComponent,
        MenuItemDeleteDialogComponent,
        MenuItemPopupComponent,
        MenuItemDeletePopupComponent,
    ],
    entryComponents: [
        MenuItemComponent,
        MenuItemDialogComponent,
        MenuItemPopupComponent,
        MenuItemDeleteDialogComponent,
        MenuItemDeletePopupComponent,
    ],
    providers: [
        MenuItemService,
        MenuItemPopupService,
        MenuItemResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyMenuItemModule {}
