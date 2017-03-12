import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Store } from './store.model';
import { StoreService } from './store.service';

@Component({
    selector: 'jhi-store-detail',
    templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent implements OnInit, OnDestroy {

    store: Store;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private storeService: StoreService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['store']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.storeService.find(id).subscribe(store => {
            this.store = store;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
