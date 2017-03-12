import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MenuCategoryComponent } from './menu-category.component';
import { MenuCategoryDetailComponent } from './menu-category-detail.component';
import { MenuCategoryPopupComponent } from './menu-category-dialog.component';
import { MenuCategoryDeletePopupComponent } from './menu-category-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MenuCategoryResolvePagingParams implements Resolve<any> {

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

export const menuCategoryRoute: Routes = [
  {
    path: 'menu-category',
    component: MenuCategoryComponent,
    resolve: {
      'pagingParams': MenuCategoryResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuCategory.home.title'
    }
  }, {
    path: 'menu-category/:id',
    component: MenuCategoryDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuCategory.home.title'
    }
  }
];

export const menuCategoryPopupRoute: Routes = [
  {
    path: 'menu-category-new',
    component: MenuCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuCategory.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-category/:id/edit',
    component: MenuCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuCategory.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'menu-category/:id/delete',
    component: MenuCategoryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'foodAppetencyApp.menuCategory.home.title'
    },
    outlet: 'popup'
  }
];
