import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { StoreComponent } from './store.component';
import { StoreDetailComponent } from './store-detail.component';
import { StorePopupComponent } from './store-dialog.component';
import { StoreDeletePopupComponent } from './store-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class StoreResolvePagingParams implements Resolve<any> {

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

export const storeRoute: Routes = [
  {
    path: 'store',
    component: StoreComponent,
    resolve: {
      'pagingParams': StoreResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.store.home.title'
    }
  }, {
    path: 'store/:id',
    component: StoreDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.store.home.title'
    }
  }
];

export const storePopupRoute: Routes = [
  {
    path: 'store-new',
    component: StorePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.store.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'store/:id/edit',
    component: StorePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.store.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'store/:id/delete',
    component: StoreDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.store.home.title'
    },
    outlet: 'popup'
  }
];
