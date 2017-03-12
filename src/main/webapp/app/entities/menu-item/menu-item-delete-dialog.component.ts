import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MenuItem } from './menu-item.model';
import { MenuItemPopupService } from './menu-item-popup.service';
import { MenuItemService } from './menu-item.service';

@Component({
    selector: 'jhi-menu-item-delete-dialog',
    templateUrl: './menu-item-delete-dialog.component.html'
})
export class MenuItemDeleteDialogComponent {

    menuItem: MenuItem;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuItemService: MenuItemService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuItem', 'diet']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.menuItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'menuItemListModification',
                content: 'Deleted an menuItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-item-delete-popup',
    template: ''
})
export class MenuItemDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuItemPopupService: MenuItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.menuItemPopupService
                .open(MenuItemDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
