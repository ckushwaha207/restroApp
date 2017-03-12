import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TableQR } from './table-qr.model';
import { TableQRPopupService } from './table-qr-popup.service';
import { TableQRService } from './table-qr.service';

@Component({
    selector: 'jhi-table-qr-delete-dialog',
    templateUrl: './table-qr-delete-dialog.component.html'
})
export class TableQRDeleteDialogComponent {

    tableQR: TableQR;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tableQRService: TableQRService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tableQR']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tableQRService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tableQRListModification',
                content: 'Deleted an tableQR'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-table-qr-delete-popup',
    template: ''
})
export class TableQRDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tableQRPopupService: TableQRPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tableQRPopupService
                .open(TableQRDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
