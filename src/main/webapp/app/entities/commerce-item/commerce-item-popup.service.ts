import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommerceItem } from './commerce-item.model';
import { CommerceItemService } from './commerce-item.service';
@Injectable()
export class CommerceItemPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private commerceItemService: CommerceItemService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.commerceItemService.find(id).subscribe(commerceItem => {
                this.commerceItemModalRef(component, commerceItem);
            });
        } else {
            return this.commerceItemModalRef(component, new CommerceItem());
        }
    }

    commerceItemModalRef(component: Component, commerceItem: CommerceItem): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.commerceItem = commerceItem;
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
