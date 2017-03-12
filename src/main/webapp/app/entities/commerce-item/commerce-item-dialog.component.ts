import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { CommerceItem } from './commerce-item.model';
import { CommerceItemPopupService } from './commerce-item-popup.service';
import { CommerceItemService } from './commerce-item.service';
import { MenuItem, MenuItemService } from '../menu-item';
import { Order, OrderService } from '../order';
@Component({
    selector: 'jhi-commerce-item-dialog',
    templateUrl: './commerce-item-dialog.component.html'
})
export class CommerceItemDialogComponent implements OnInit {

    commerceItem: CommerceItem;
    authorities: any[];
    isSaving: boolean;

    products: MenuItem[];

    orders: Order[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private commerceItemService: CommerceItemService,
        private menuItemService: MenuItemService,
        private orderService: OrderService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['commerceItem', 'itemState']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.menuItemService.query({filter: 'commerceitem-is-null'}).subscribe((res: Response) => {
            if (!this.commerceItem.productId) {
                this.products = res.json();
            } else {
                this.menuItemService.find(this.commerceItem.productId).subscribe((subRes: MenuItem) => {
                    this.products = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.orderService.query().subscribe(
            (res: Response) => { this.orders = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.commerceItem.id !== undefined) {
            this.commerceItemService.update(this.commerceItem)
                .subscribe((res: CommerceItem) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.commerceItemService.create(this.commerceItem)
                .subscribe((res: CommerceItem) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: CommerceItem) {
        this.eventManager.broadcast({ name: 'commerceItemListModification', content: 'OK'});
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

    trackOrderById(index: number, item: Order) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-commerce-item-popup',
    template: ''
})
export class CommerceItemPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private commerceItemPopupService: CommerceItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.commerceItemPopupService
                    .open(CommerceItemDialogComponent, params['id']);
            } else {
                this.modalRef = this.commerceItemPopupService
                    .open(CommerceItemDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
