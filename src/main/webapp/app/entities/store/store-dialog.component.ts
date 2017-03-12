import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Store } from './store.model';
import { StorePopupService } from './store-popup.service';
import { StoreService } from './store.service';
import { Location, LocationService } from '../location';
import { DiningTable, DiningTableService } from '../dining-table';
import { Organization, OrganizationService } from '../organization';
import { StoreGroup, StoreGroupService } from '../store-group';
import { Menu, MenuService } from '../menu';
@Component({
    selector: 'jhi-store-dialog',
    templateUrl: './store-dialog.component.html'
})
export class StoreDialogComponent implements OnInit {

    store: Store;
    authorities: any[];
    isSaving: boolean;

    locations: Location[];

    diningtables: DiningTable[];

    organizations: Organization[];

    storegroups: StoreGroup[];

    menus: Menu[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private storeService: StoreService,
        private locationService: LocationService,
        private diningTableService: DiningTableService,
        private organizationService: OrganizationService,
        private storeGroupService: StoreGroupService,
        private menuService: MenuService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['store']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.locationService.query({filter: 'store-is-null'}).subscribe((res: Response) => {
            if (!this.store.locationId) {
                this.locations = res.json();
            } else {
                this.locationService.find(this.store.locationId).subscribe((subRes: Location) => {
                    this.locations = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.diningTableService.query().subscribe(
            (res: Response) => { this.diningtables = res.json(); }, (res: Response) => this.onError(res.json()));
        this.organizationService.query().subscribe(
            (res: Response) => { this.organizations = res.json(); }, (res: Response) => this.onError(res.json()));
        this.storeGroupService.query().subscribe(
            (res: Response) => { this.storegroups = res.json(); }, (res: Response) => this.onError(res.json()));
        this.menuService.query().subscribe(
            (res: Response) => { this.menus = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.store.id !== undefined) {
            this.storeService.update(this.store)
                .subscribe((res: Store) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.storeService.create(this.store)
                .subscribe((res: Store) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Store) {
        this.eventManager.broadcast({ name: 'storeListModification', content: 'OK'});
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

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackDiningTableById(index: number, item: DiningTable) {
        return item.id;
    }

    trackOrganizationById(index: number, item: Organization) {
        return item.id;
    }

    trackStoreGroupById(index: number, item: StoreGroup) {
        return item.id;
    }

    trackMenuById(index: number, item: Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-popup',
    template: ''
})
export class StorePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private storePopupService: StorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.storePopupService
                    .open(StoreDialogComponent, params['id']);
            } else {
                this.modalRef = this.storePopupService
                    .open(StoreDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
