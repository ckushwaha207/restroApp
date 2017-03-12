import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StoreGroup } from './store-group.model';
import { StoreGroupService } from './store-group.service';
@Injectable()
export class StoreGroupPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private storeGroupService: StoreGroupService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.storeGroupService.find(id).subscribe(storeGroup => {
                this.storeGroupModalRef(component, storeGroup);
            });
        } else {
            return this.storeGroupModalRef(component, new StoreGroup());
        }
    }

    storeGroupModalRef(component: Component, storeGroup: StoreGroup): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.storeGroup = storeGroup;
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
