import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BusinessUserComponent } from './business-user.component';
import { BusinessUserDetailComponent } from './business-user-detail.component';
import { BusinessUserPopupComponent } from './business-user-dialog.component';
import { BusinessUserDeletePopupComponent } from './business-user-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class BusinessUserResolvePagingParams implements Resolve<any> {

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

export const businessUserRoute: Routes = [
  {
    path: 'business-user',
    component: BusinessUserComponent,
    resolve: {
      'pagingParams': BusinessUserResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.businessUser.home.title'
    }
  }, {
    path: 'business-user/:id',
    component: BusinessUserDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.businessUser.home.title'
    }
  }
];

export const businessUserPopupRoute: Routes = [
  {
    path: 'business-user-new',
    component: BusinessUserPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.businessUser.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'business-user/:id/edit',
    component: BusinessUserPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.businessUser.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'business-user/:id/delete',
    component: BusinessUserDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.businessUser.home.title'
    },
    outlet: 'popup'
  }
];
