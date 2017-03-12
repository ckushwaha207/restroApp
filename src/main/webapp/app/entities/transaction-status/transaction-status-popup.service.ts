import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransactionStatus } from './transaction-status.model';
import { TransactionStatusService } from './transaction-status.service';
@Injectable()
export class TransactionStatusPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private transactionStatusService: TransactionStatusService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.transactionStatusService.find(id).subscribe(transactionStatus => {
                this.transactionStatusModalRef(component, transactionStatus);
            });
        } else {
            return this.transactionStatusModalRef(component, new TransactionStatus());
        }
    }

    transactionStatusModalRef(component: Component, transactionStatus: TransactionStatus): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transactionStatus = transactionStatus;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
