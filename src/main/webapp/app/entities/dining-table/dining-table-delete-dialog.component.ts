import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DiningTable } from './dining-table.model';
import { DiningTablePopupService } from './dining-table-popup.service';
import { DiningTableService } from './dining-table.service';

@Component({
    selector: 'jhi-dining-table-delete-dialog',
    templateUrl: './dining-table-delete-dialog.component.html'
})
export class DiningTableDeleteDialogComponent {

    diningTable: DiningTable;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private diningTableService: DiningTableService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['diningTable']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.diningTableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diningTableListModification',
                content: 'Deleted an diningTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dining-table-delete-popup',
    template: ''
})
export class DiningTableDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private diningTablePopupService: DiningTablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.diningTablePopupService
                .open(DiningTableDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
