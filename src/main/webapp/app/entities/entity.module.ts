import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FoodAppetencyMenuItemModule } from './menu-item/menu-item.module';
import { FoodAppetencyBusinessUserModule } from './business-user/business-user.module';
import { FoodAppetencyCustomerModule } from './customer/customer.module';
import { FoodAppetencyDiningTableModule } from './dining-table/dining-table.module';
import { FoodAppetencyLocationModule } from './location/location.module';
import { FoodAppetencyMenuModule } from './menu/menu.module';
import { FoodAppetencyMenuCategoryModule } from './menu-category/menu-category.module';
import { FoodAppetencyCommerceItemModule } from './commerce-item/commerce-item.module';
import { FoodAppetencyOrderModule } from './order/order.module';
import { FoodAppetencyOrganizationModule } from './organization/organization.module';
import { FoodAppetencyPaymentModule } from './payment/payment.module';
import { FoodAppetencyStoreModule } from './store/store.module';
import { FoodAppetencyStoreGroupModule } from './store-group/store-group.module';
import { FoodAppetencyTableQRModule } from './table-qr/table-qr.module';
import { FoodAppetencyTransactionStatusModule } from './transaction-status/transaction-status.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FoodAppetencyMenuItemModule,
        FoodAppetencyBusinessUserModule,
        FoodAppetencyCustomerModule,
        FoodAppetencyDiningTableModule,
        FoodAppetencyLocationModule,
        FoodAppetencyMenuModule,
        FoodAppetencyMenuCategoryModule,
        FoodAppetencyCommerceItemModule,
        FoodAppetencyOrderModule,
        FoodAppetencyOrganizationModule,
        FoodAppetencyPaymentModule,
        FoodAppetencyStoreModule,
        FoodAppetencyStoreGroupModule,
        FoodAppetencyTableQRModule,
        FoodAppetencyTransactionStatusModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FoodAppetencyEntityModule {}
