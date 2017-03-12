import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Menu } from './menu.model';
import { MenuPopupService } from './menu-popup.service';
import { MenuService } from './menu.service';
import { MenuCategory, MenuCategoryService } from '../menu-category';
import { Store, StoreService } from '../store';
@Component({
    selector: 'jhi-menu-dialog',
    templateUrl: './menu-dialog.component.html'
})
export class MenuDialogComponent implements OnInit {

    menu: Menu;
    authorities: any[];
    isSaving: boolean;

    menucategories: MenuCategory[];

    stores: Store[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private menuService: MenuService,
        private menuCategoryService: MenuCategoryService,
        private storeService: StoreService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menu']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.menuCategoryService.query().subscribe(
            (res: Response) => { this.menucategories = res.json(); }, (res: Response) => this.onError(res.json()));
        this.storeService.query().subscribe(
            (res: Response) => { this.stores = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.menu.id !== undefined) {
            this.menuService.update(this.menu)
                .subscribe((res: Menu) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.menuService.create(this.menu)
                .subscribe((res: Menu) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Menu) {
        this.eventManager.broadcast({ name: 'menuListModification', content: 'OK'});
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

    trackMenuCategoryById(index: number, item: MenuCategory) {
        return item.id;
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-menu-popup',
    template: ''
})
export class MenuPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuPopupService: MenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.menuPopupService
                    .open(MenuDialogComponent, params['id']);
            } else {
                this.modalRef = this.menuPopupService
                    .open(MenuDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
