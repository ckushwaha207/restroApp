import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { StoreGroup } from './store-group.model';
import { StoreGroupPopupService } from './store-group-popup.service';
import { StoreGroupService } from './store-group.service';

@Component({
    selector: 'jhi-store-group-delete-dialog',
    templateUrl: './store-group-delete-dialog.component.html'
})
export class StoreGroupDeleteDialogComponent {

    storeGroup: StoreGroup;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private storeGroupService: StoreGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['storeGroup']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.storeGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'storeGroupListModification',
                content: 'Deleted an storeGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-group-delete-popup',
    template: ''
})
export class StoreGroupDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private storeGroupPopupService: StoreGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.storeGroupPopupService
                .open(StoreGroupDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
