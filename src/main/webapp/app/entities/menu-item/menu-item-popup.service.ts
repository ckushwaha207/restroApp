import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from './menu-item.model';
import { MenuItemService } from './menu-item.service';
@Injectable()
export class MenuItemPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private menuItemService: MenuItemService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.menuItemService.find(id).subscribe(menuItem => {
                this.menuItemModalRef(component, menuItem);
            });
        } else {
            return this.menuItemModalRef(component, new MenuItem());
        }
    }

    menuItemModalRef(component: Component, menuItem: MenuItem): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.menuItem = menuItem;
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
