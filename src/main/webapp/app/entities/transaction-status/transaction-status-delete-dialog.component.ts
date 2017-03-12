import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TransactionStatus } from './transaction-status.model';
import { TransactionStatusPopupService } from './transaction-status-popup.service';
import { TransactionStatusService } from './transaction-status.service';

@Component({
    selector: 'jhi-transaction-status-delete-dialog',
    templateUrl: './transaction-status-delete-dialog.component.html'
})
export class TransactionStatusDeleteDialogComponent {

    transactionStatus: TransactionStatus;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private transactionStatusService: TransactionStatusService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['transactionStatus']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.transactionStatusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionStatusListModification',
                content: 'Deleted an transactionStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-status-delete-popup',
    template: ''
})
export class TransactionStatusDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private transactionStatusPopupService: TransactionStatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.transactionStatusPopupService
                .open(TransactionStatusDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
