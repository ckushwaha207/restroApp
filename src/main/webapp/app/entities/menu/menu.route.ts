import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MenuComponent } from './menu.component';
import { MenuDetailComponent } from './menu-detail.component';
import { MenuPopupComponent } from './menu-dialog.component';
import { MenuDeletePopupComponent } from './menu-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MenuResolvePagingParams implements Resolve<any> {

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

export const menuRoute: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    resolve: {
      'pagingParams': MenuResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menu.home.title'
    }
  }, {
    path: 'menu/:id',
    component: MenuDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menu.home.title'
    }
  }
];

export const menuPopupRoute: Routes = [
  {
    path: 'menu-new',
    component: MenuPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menu.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu/:id/edit',
    component: MenuPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menu.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu/:id/delete',
    component: MenuDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menu.home.title'
    },
    outlet: 'popup'
  }
];
