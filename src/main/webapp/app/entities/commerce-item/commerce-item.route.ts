import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CommerceItemComponent } from './commerce-item.component';
import { CommerceItemDetailComponent } from './commerce-item-detail.component';
import { CommerceItemPopupComponent } from './commerce-item-dialog.component';
import { CommerceItemDeletePopupComponent } from './commerce-item-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CommerceItemResolvePagingParams implements Resolve<any> {

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

export const commerceItemRoute: Routes = [
  {
    path: 'commerce-item',
    component: CommerceItemComponent,
    resolve: {
      'pagingParams': CommerceItemResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.commerceItem.home.title'
    }
  }, {
    path: 'commerce-item/:id',
    component: CommerceItemDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.commerceItem.home.title'
    }
  }
];

export const commerceItemPopupRoute: Routes = [
  {
    path: 'commerce-item-new',
    component: CommerceItemPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.commerceItem.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'commerce-item/:id/edit',
    component: CommerceItemPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.commerceItem.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'commerce-item/:id/delete',
    component: CommerceItemDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.commerceItem.home.title'
    },
    outlet: 'popup'
  }
];
