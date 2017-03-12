import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TableQRComponent } from './table-qr.component';
import { TableQRDetailComponent } from './table-qr-detail.component';
import { TableQRPopupComponent } from './table-qr-dialog.component';
import { TableQRDeletePopupComponent } from './table-qr-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class TableQRResolvePagingParams implements Resolve<any> {

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

export const tableQRRoute: Routes = [
  {
    path: 'table-qr',
    component: TableQRComponent,
    resolve: {
      'pagingParams': TableQRResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.tableQR.home.title'
    }
  }, {
    path: 'table-qr/:id',
    component: TableQRDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.tableQR.home.title'
    }
  }
];

export const tableQRPopupRoute: Routes = [
  {
    path: 'table-qr-new',
    component: TableQRPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.tableQR.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'table-qr/:id/edit',
    component: TableQRPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.tableQR.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'table-qr/:id/delete',
    component: TableQRDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.tableQR.home.title'
    },
    outlet: 'popup'
  }
];
