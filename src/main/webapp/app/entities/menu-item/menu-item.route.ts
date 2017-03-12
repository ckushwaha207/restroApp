import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MenuItemComponent } from './menu-item.component';
import { MenuItemDetailComponent } from './menu-item-detail.component';
import { MenuItemPopupComponent } from './menu-item-dialog.component';
import { MenuItemDeletePopupComponent } from './menu-item-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MenuItemResolvePagingParams implements Resolve<any> {

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

export const menuItemRoute: Routes = [
  {
    path: 'menu-item',
    component: MenuItemComponent,
    resolve: {
      'pagingParams': MenuItemResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuItem.home.title'
    }
  }, {
    path: 'menu-item/:id',
    component: MenuItemDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuItem.home.title'
    }
  }
];

export const menuItemPopupRoute: Routes = [
  {
    path: 'menu-item-new',
    component: MenuItemPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuItem.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-item/:id/edit',
    component: MenuItemPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuItem.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-item/:id/delete',
    component: MenuItemDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuItem.home.title'
    },
    outlet: 'popup'
  }
];
