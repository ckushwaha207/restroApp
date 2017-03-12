import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TransactionStatusComponent } from './transaction-status.component';
import { TransactionStatusDetailComponent } from './transaction-status-detail.component';
import { TransactionStatusPopupComponent } from './transaction-status-dialog.component';
import { TransactionStatusDeletePopupComponent } from './transaction-status-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class TransactionStatusResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const transactionStatusRoute: Routes = [
  {
    path: 'transaction-status',
    component: TransactionStatusComponent,
    resolve: {
      'pagingParams': TransactionStatusResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
    }
  }, {
    path: 'transaction-status/:id',
    component: TransactionStatusDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
    }
  }
];

export const transactionStatusPopupRoute: Routes = [
  {
    path: 'transaction-status-new',
    component: TransactionStatusPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'transaction-status/:id/edit',
    component: TransactionStatusPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'transaction-status/:id/delete',
    component: TransactionStatusDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.transactionStatus.home.title'
    },
    outlet: 'popup'
  }
];
