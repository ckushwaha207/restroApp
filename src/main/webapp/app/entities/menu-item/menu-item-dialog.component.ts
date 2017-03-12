import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MenuItem } from './menu-item.model';
import { MenuItemPopupService } from './menu-item-popup.service';
import { MenuItemService } from './menu-item.service';
import { MenuCategory, MenuCategoryService } from '../menu-category';
@Component({
    selector: 'jhi-menu-item-dialog',
    templateUrl: './menu-item-dialog.component.html'
})
export class MenuItemDialogComponent implements OnInit {

    menuItem: MenuItem;
    authorities: any[];
    isSaving: boolean;

    menucategories: MenuCategory[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private menuItemService: MenuItemService,
        private menuCategoryService: MenuCategoryService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuItem', 'diet']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.menuCategoryService.query().subscribe(
            (res: Response) => { this.menucategories = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.menuItem.id !== undefined) {
            this.menuItemService.update(this.menuItem)
                .subscribe((res: MenuItem) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.menuItemService.create(this.menuItem)
                .subscribe((res: MenuItem) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MenuItem) {
        this.eventManager.broadcast({ name: 'menuItemListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-menu-item-popup',
    template: ''
})
export class MenuItemPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuItemPopupService: MenuItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.menuItemPopupService
                    .open(MenuItemDialogComponent, params['id']);
            } else {
                this.modalRef = this.menuItemPopupService
                    .open(MenuItemDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
