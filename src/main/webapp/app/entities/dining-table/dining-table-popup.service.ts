import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DiningTable } from './dining-table.model';
import { DiningTableService } from './dining-table.service';
@Injectable()
export class DiningTablePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private diningTableService: DiningTableService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.diningTableService.find(id).subscribe(diningTable => {
                this.diningTableModalRef(component, diningTable);
            });
        } else {
            return this.diningTableModalRef(component, new DiningTable());
        }
    }

    diningTableModalRef(component: Component, diningTable: DiningTable): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.diningTable = diningTable;
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
