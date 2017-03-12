import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { BusinessUser } from './business-user.model';
import { BusinessUserPopupService } from './business-user-popup.service';
import { BusinessUserService } from './business-user.service';
import { User, UserService } from '../../shared';
import { StoreGroup, StoreGroupService } from '../store-group';
import { Store, StoreService } from '../store';
@Component({
    selector: 'jhi-business-user-dialog',
    templateUrl: './business-user-dialog.component.html'
})
export class BusinessUserDialogComponent implements OnInit {

    businessUser: BusinessUser;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    storegroups: StoreGroup[];

    stores: Store[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private businessUserService: BusinessUserService,
        private userService: UserService,
        private storeGroupService: StoreGroupService,
        private storeService: StoreService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['businessUser']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.storeGroupService.query({filter: 'user-is-null'}).subscribe((res: Response) => {
            if (!this.businessUser.storeGroupId) {
                this.storegroups = res.json();
            } else {
                this.storeGroupService.find(this.businessUser.storeGroupId).subscribe((subRes: StoreGroup) => {
                    this.storegroups = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.storeService.query().subscribe(
            (res: Response) => { this.stores = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.businessUser.id !== undefined) {
            this.businessUserService.update(this.businessUser)
                .subscribe((res: BusinessUser) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.businessUserService.create(this.businessUser)
                .subscribe((res: BusinessUser) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: BusinessUser) {
        this.eventManager.broadcast({ name: 'businessUserListModification', content: 'OK'});
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

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackStoreGroupById(index: number, item: StoreGroup) {
        return item.id;
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-business-user-popup',
    template: ''
})
export class BusinessUserPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private businessUserPopupService: BusinessUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.businessUserPopupService
                    .open(BusinessUserDialogComponent, params['id']);
            } else {
                this.modalRef = this.businessUserPopupService
                    .open(BusinessUserDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
