import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DiningTableComponent } from './dining-table.component';
import { DiningTableDetailComponent } from './dining-table-detail.component';
import { DiningTablePopupComponent } from './dining-table-dialog.component';
import { DiningTableDeletePopupComponent } from './dining-table-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class DiningTableResolvePagingParams implements Resolve<any> {

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

export const diningTableRoute: Routes = [
  {
    path: 'dining-table',
    component: DiningTableComponent,
    resolve: {
      'pagingParams': DiningTableResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.diningTable.home.title'
    }
  }, {
    path: 'dining-table/:id',
    component: DiningTableDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.diningTable.home.title'
    }
  }
];

export const diningTablePopupRoute: Routes = [
  {
    path: 'dining-table-new',
    component: DiningTablePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.diningTable.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'dining-table/:id/edit',
    component: DiningTablePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.diningTable.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'dining-table/:id/delete',
    component: DiningTableDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.diningTable.home.title'
    },
    outlet: 'popup'
  }
];
