import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { StoreGroupComponent } from './store-group.component';
import { StoreGroupDetailComponent } from './store-group-detail.component';
import { StoreGroupPopupComponent } from './store-group-dialog.component';
import { StoreGroupDeletePopupComponent } from './store-group-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class StoreGroupResolvePagingParams implements Resolve<any> {

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

export const storeGroupRoute: Routes = [
  {
    path: 'store-group',
    component: StoreGroupComponent,
    resolve: {
      'pagingParams': StoreGroupResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.storeGroup.home.title'
    }
  }, {
    path: 'store-group/:id',
    component: StoreGroupDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.storeGroup.home.title'
    }
  }
];

export const storeGroupPopupRoute: Routes = [
  {
    path: 'store-group-new',
    component: StoreGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.storeGroup.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'store-group/:id/edit',
    component: StoreGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.storeGroup.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'store-group/:id/delete',
    component: StoreGroupDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.storeGroup.home.title'
    },
    outlet: 'popup'
  }
];
