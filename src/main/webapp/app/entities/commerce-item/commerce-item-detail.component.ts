import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { CommerceItem } from './commerce-item.model';
import { CommerceItemService } from './commerce-item.service';

@Component({
    selector: 'jhi-commerce-item-detail',
    templateUrl: './commerce-item-detail.component.html'
})
export class CommerceItemDetailComponent implements OnInit, OnDestroy {

    commerceItem: CommerceItem;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private commerceItemService: CommerceItemService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['commerceItem', 'itemState']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.commerceItemService.find(id).subscribe(commerceItem => {
            this.commerceItem = commerceItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
