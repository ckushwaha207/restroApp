import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { StoreGroup } from './store-group.model';
import { StoreGroupService } from './store-group.service';

@Component({
    selector: 'jhi-store-group-detail',
    templateUrl: './store-group-detail.component.html'
})
export class StoreGroupDetailComponent implements OnInit, OnDestroy {

    storeGroup: StoreGroup;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private storeGroupService: StoreGroupService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['storeGroup']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.storeGroupService.find(id).subscribe(storeGroup => {
            this.storeGroup = storeGroup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
