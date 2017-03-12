import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MenuCategory } from './menu-category.model';
import { MenuCategoryPopupService } from './menu-category-popup.service';
import { MenuCategoryService } from './menu-category.service';

@Component({
    selector: 'jhi-menu-category-delete-dialog',
    templateUrl: './menu-category-delete-dialog.component.html'
})
export class MenuCategoryDeleteDialogComponent {

    menuCategory: MenuCategory;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuCategoryService: MenuCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['menuCategory']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.menuCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'menuCategoryListModification',
                content: 'Deleted an menuCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-category-delete-popup',
    template: ''
})
export class MenuCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private menuCategoryPopupService: MenuCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.menuCategoryPopupService
                .open(MenuCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
