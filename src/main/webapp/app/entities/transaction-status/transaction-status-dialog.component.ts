import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TransactionStatus } from './transaction-status.model';
import { TransactionStatusPopupService } from './transaction-status-popup.service';
import { TransactionStatusService } from './transaction-status.service';
import { Payment, PaymentService } from '../payment';
@Component({
    selector: 'jhi-transaction-status-dialog',
    templateUrl: './transaction-status-dialog.component.html'
})
export class TransactionStatusDialogComponent implements OnInit {

    transactionStatus: TransactionStatus;
    authorities: any[];
    isSaving: boolean;

    payments: Payment[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private transactionStatusService: TransactionStatusService,
        private paymentService: PaymentService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['transactionStatus']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.paymentService.query().subscribe(
            (res: Response) => { this.payments = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.transactionStatus.id !== undefined) {
            this.transactionStatusService.update(this.transactionStatus)
                .subscribe((res: TransactionStatus) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.transactionStatusService.create(this.transactionStatus)
                .subscribe((res: TransactionStatus) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TransactionStatus) {
        this.eventManager.broadcast({ name: 'transactionStatusListModification', content: 'OK'});
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

    trackPaymentById(index: number, item: Payment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transaction-status-popup',
    template: ''
})
export class TransactionStatusPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private transactionStatusPopupService: TransactionStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.transactionStatusPopupService
                    .open(TransactionStatusDialogComponent, params['id']);
            } else {
                this.modalRef = this.transactionStatusPopupService
                    .open(TransactionStatusDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
