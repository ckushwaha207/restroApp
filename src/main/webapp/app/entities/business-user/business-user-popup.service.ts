import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessUser } from './business-user.model';
import { BusinessUserService } from './business-user.service';
@Injectable()
export class BusinessUserPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private businessUserService: BusinessUserService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.businessUserService.find(id).subscribe(businessUser => {
                this.businessUserModalRef(component, businessUser);
            });
        } else {
            return this.businessUserModalRef(component, new BusinessUser());
        }
    }

    businessUserModalRef(component: Component, businessUser: BusinessUser): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.businessUser = businessUser;
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
