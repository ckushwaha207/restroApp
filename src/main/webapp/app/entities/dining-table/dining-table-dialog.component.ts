import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DiningTable } from './dining-table.model';
import { DiningTablePopupService } from './dining-table-popup.service';
import { DiningTableService } from './dining-table.service';
import { Store, StoreService } from '../store';
@Component({
    selector: 'jhi-dining-table-dialog',
    templateUrl: './dining-table-dialog.component.html'
})
export class DiningTableDialogComponent implements OnInit {

    diningTable: DiningTable;
    authorities: any[];
    isSaving: boolean;

    stores: Store[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private diningTableService: DiningTableService,
        private storeService: StoreService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['diningTable']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.storeService.query().subscribe(
            (res: Response) => { this.stores = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.diningTable.id !== undefined) {
            this.diningTableService.update(this.diningTable)
                .subscribe((res: DiningTable) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.diningTableService.create(this.diningTable)
                .subscribe((res: DiningTable) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DiningTable) {
        this.eventManager.broadcast({ name: 'diningTableListModification', content: 'OK'});
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

    trackStoreById(index: number, item: Store) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dining-table-popup',
    template: ''
})
export class DiningTablePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private diningTablePopupService: DiningTablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.diningTablePopupService
                    .open(DiningTableDialogComponent, params['id']);
            } else {
                this.modalRef = this.diningTablePopupService
                    .open(DiningTableDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
