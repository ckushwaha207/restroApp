import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FoodAppetencySharedModule } from '../../shared';

import {
    MenuCategoryService,
    MenuCategoryPopupService,
    MenuCategoryComponent,
    MenuCategoryDetailComponent,
    MenuCategoryDialogComponent,
    MenuCategoryPopupComponent,
    MenuCategoryDeletePopupComponent,
    MenuCategoryDeleteDialogComponent,
    menuCategoryRoute,
    menuCategoryPopupRoute,
    MenuCategoryResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...menuCategoryRoute,
    ...menuCategoryPopupRoute,
];

@NgModule({
    imports: [
        FoodAppetencySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MenuCategoryComponent,
        MenuCategoryDetailComponent,
        MenuCategoryDialogComponent,
        MenuCategoryDeleteDialogComponent,
        MenuCategoryPopupComponent,
        MenuCategoryDeletePopupComponent,
    ],
    entryComponents: [
        MenuCategoryComponent,
        MenuCategoryDialogComponent,
        MenuCategoryPopupComponent,
        MenuCategoryDeleteDialogComponent,
        MenuCategoryDeletePopupComponent,
    ],
    providers: [
        MenuCategoryService,
        MenuCategoryPopupService,
        MenuCategoryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyMenuCategoryModule {}
