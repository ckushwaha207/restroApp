import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { StoreGroup } from './store-group.model';
import { StoreGroupPopupService } from './store-group-popup.service';
import { StoreGroupService } from './store-group.service';
import { Store, StoreService } from '../store';
import { Organization, OrganizationService } from '../organization';
import { BusinessUser, BusinessUserService } from '../business-user';
@Component({
    selector: 'jhi-store-group-dialog',
    templateUrl: './store-group-dialog.component.html'
})
export class StoreGroupDialogComponent implements OnInit {

    storeGroup: StoreGroup;
    authorities: any[];
    isSaving: boolean;

    stores: Store[];

    organizations: Organization[];

    businessusers: BusinessUser[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private storeGroupService: StoreGroupService,
        private storeService: StoreService,
        private organizationService: OrganizationService,
        private businessUserService: BusinessUserService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['storeGroup']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.storeService.query().subscribe(
            (res: Response) => { this.stores = res.json(); }, (res: Response) => this.onError(res.json()));
        this.organizationService.query().subscribe(
            (res: Response) => { this.organizations = res.json(); }, (res: Response) => this.onError(res.json()));
        this.businessUserService.query().subscribe(
            (res: Response) => { this.businessusers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.storeGroup.id !== undefined) {
            this.storeGroupService.update(this.storeGroup)
                .subscribe((res: StoreGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.storeGroupService.create(this.storeGroup)
                .subscribe((res: StoreGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: StoreGroup) {
        this.eventManager.broadcast({ name: 'storeGroupListModification', content: 'OK'});
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

    trackOrganizationById(index: number, item: Organization) {
        return item.id;
    }

    trackBusinessUserById(index: number, item: BusinessUser) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-group-popup',
    template: ''
})
export class StoreGroupPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private storeGroupPopupService: StoreGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.storeGroupPopupService
                    .open(StoreGroupDialogComponent, params['id']);
            } else {
                this.modalRef = this.storeGroupPopupService
                    .open(StoreGroupDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
