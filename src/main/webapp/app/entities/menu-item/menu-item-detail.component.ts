import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MenuItem } from './menu-item.model';
import { MenuItemService } from './menu-item.service';

@Component({
    selector: 'jhi-menu-item-detail',
    templateUrl: './menu-item-detail.component.html'
})
export class MenuItemDetailComponent implements OnInit, OnDestroy {

    menuItem: MenuItem;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuItemService: MenuItemService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['menuItem', 'diet']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.menuItemService.find(id).subscribe(menuItem => {
            this.menuItem = menuItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
