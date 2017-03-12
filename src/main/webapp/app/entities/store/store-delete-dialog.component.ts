import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Store } from './store.model';
import { StorePopupService } from './store-popup.service';
import { StoreService } from './store.service';

@Component({
    selector: 'jhi-store-delete-dialog',
    templateUrl: './store-delete-dialog.component.html'
})
export class StoreDeleteDialogComponent {

    store: Store;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private storeService: StoreService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['store']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.storeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'storeListModification',
                content: 'Deleted an store'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-delete-popup',
    template: ''
})
export class StoreDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private storePopupService: StorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.storePopupService
                .open(StoreDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
