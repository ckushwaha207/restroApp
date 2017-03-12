import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { BusinessUser } from './business-user.model';
import { BusinessUserPopupService } from './business-user-popup.service';
import { BusinessUserService } from './business-user.service';

@Component({
    selector: 'jhi-business-user-delete-dialog',
    templateUrl: './business-user-delete-dialog.component.html'
})
export class BusinessUserDeleteDialogComponent {

    businessUser: BusinessUser;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private businessUserService: BusinessUserService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['businessUser']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.businessUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'businessUserListModification',
                content: 'Deleted an businessUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-business-user-delete-popup',
    template: ''
})
export class BusinessUserDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private businessUserPopupService: BusinessUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.businessUserPopupService
                .open(BusinessUserDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
