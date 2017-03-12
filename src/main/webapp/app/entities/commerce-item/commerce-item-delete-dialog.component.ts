import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { CommerceItem } from './commerce-item.model';
import { CommerceItemPopupService } from './commerce-item-popup.service';
import { CommerceItemService } from './commerce-item.service';

@Component({
    selector: 'jhi-commerce-item-delete-dialog',
    templateUrl: './commerce-item-delete-dialog.component.html'
})
export class CommerceItemDeleteDialogComponent {

    commerceItem: CommerceItem;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private commerceItemService: CommerceItemService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['commerceItem', 'itemState']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.commerceItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commerceItemListModification',
                content: 'Deleted an commerceItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commerce-item-delete-popup',
    template: ''
})
export class CommerceItemDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private commerceItemPopupService: CommerceItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.commerceItemPopupService
                .open(CommerceItemDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
