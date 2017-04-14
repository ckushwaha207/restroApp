import './vendor.ts';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';
import { MaterialModule } from '@angular/material';
import { MdIconRegistry } from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import 'hammerjs';

import { FoodAppetencySharedModule, UserRouteAccessService } from './shared';
import { FoodAppetencyHomeModule } from './home/home.module';
import { FoodAppetencyAdminModule } from './admin/admin.module';
import { FoodAppetencyAccountModule } from './account/account.module';
import { FoodAppetencyEntityModule } from './entities/entity.module';

import { LayoutRoutingModule } from './layouts';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';


@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        MaterialModule.forRoot(),
        FlexLayoutModule,
        FoodAppetencySharedModule,
        FoodAppetencyHomeModule,
        FoodAppetencyAdminModule,
        FoodAppetencyAccountModule,
        FoodAppetencyEntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        MdIconRegistry,
        ProfileService,
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class FoodAppetencyAppModule {}
