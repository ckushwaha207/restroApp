import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TableQR } from './table-qr.model';
import { TableQRPopupService } from './table-qr-popup.service';
import { TableQRService } from './table-qr.service';
import { DiningTable, DiningTableService } from '../dining-table';
import { Store, StoreService } from '../store';
@Component({
    selector: 'jhi-table-qr-dialog',
    templateUrl: './table-qr-dialog.component.html'
})
export class TableQRDialogComponent implements OnInit {

    tableQR: TableQR;
    authorities: any[];
    isSaving: boolean;

    tables: DiningTable[];

    stores: Store[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tableQRService: TableQRService,
        private diningTableService: DiningTableService,
        private storeService: StoreService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tableQR']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.diningTableService.query({filter: 'tableqr-is-null'}).subscribe((res: Response) => {
            if (!this.tableQR.tableId) {
                this.tables = res.json();
            } else {
                this.diningTableService.find(this.tableQR.tableId).subscribe((subRes: DiningTable) => {
                    this.tables = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.storeService.query({filter: 'tableqr-is-null'}).subscribe((res: Response) => {
            if (!this.tableQR.storeId) {
                this.stores = res.json();
            } else {
                this.storeService.find(this.tableQR.storeId).subscribe((subRes: Store) => {
                    this.stores = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.tableQR.id !== undefined) {
            this.tableQRService.update(this.tableQR)
                .subscribe((res: TableQR) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.tableQRService.create(this.tableQR)
                .subscribe((res: TableQR) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TableQR) {
        this.eventManager.broadcast({ name: 'tableQRListModification', content: 'OK'});
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

    trackDiningTableById(index: number, item: DiningTable) {
        return item.id;
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-table-qr-popup',
    template: ''
})
export class TableQRPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tableQRPopupService: TableQRPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tableQRPopupService
                    .open(TableQRDialogComponent, params['id']);
            } else {
                this.modalRef = this.tableQRPopupService
                    .open(TableQRDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
