import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MenuCategory } from './menu-category.model';
import { MenuCategoryService } from './menu-category.service';

@Component({
    selector: 'jhi-menu-category-detail',
    templateUrl: './menu-category-detail.component.html'
})
export class MenuCategoryDetailComponent implements OnInit, OnDestroy {

    menuCategory: MenuCategory;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private menuCategoryService: MenuCategoryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['menuCategory']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.menuCategoryService.find(id).subscribe(menuCategory => {
            this.menuCategory = menuCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
