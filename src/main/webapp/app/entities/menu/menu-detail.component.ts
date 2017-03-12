import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';

@Component({
    selector: 'jhi-menu-detail',
    templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent implements OnInit, OnDestroy {

    menu: Menu;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuService: MenuService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['menu']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.menuService.find(id).subscribe(menu => {
            this.menu = menu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
