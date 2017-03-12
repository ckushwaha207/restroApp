import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MenuCategory } from './menu-category.model';
import { MenuCategoryPopupService } from './menu-category-popup.service';
import { MenuCategoryService } from './menu-category.service';
import { MenuItem, MenuItemService } from '../menu-item';
import { Menu, MenuService } from '../menu';
@Component({
    selector: 'jhi-menu-category-dialog',
    templateUrl: './menu-category-dialog.component.html'
})
export class MenuCategoryDialogComponent implements OnInit {

    menuCategory: MenuCategory;
    authorities: any[];
    isSaving: boolean;

    menuitems: MenuItem[];

    menus: Menu[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private menuCategoryService: MenuCategoryService,
        private menuItemService: MenuItemService,
        private menuService: MenuService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuCategory']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.menuItemService.query().subscribe(
            (res: Response) => { this.menuitems = res.json(); }, (res: Response) => this.onError(res.json()));
        this.menuService.query().subscribe(
            (res: Response) => { this.menus = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.menuCategory.id !== undefined) {
            this.menuCategoryService.update(this.menuCategory)
                .subscribe((res: MenuCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.menuCategoryService.create(this.menuCategory)
                .subscribe((res: MenuCategory) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MenuCategory) {
        this.eventManager.broadcast({ name: 'menuCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackMenuItemById(index: number, item: MenuItem) {
        return item.id;
    }

    trackMenuById(index: number, item: Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-menu-category-popup',
    template: ''
})
export class MenuCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuCategoryPopupService: MenuCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.menuCategoryPopupService
                    .open(MenuCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.menuCategoryPopupService
                    .open(MenuCategoryDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
