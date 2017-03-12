import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { BusinessUser } from './business-user.model';
import { BusinessUserService } from './business-user.service';

@Component({
    selector: 'jhi-business-user-detail',
    templateUrl: './business-user-detail.component.html'
})
export class BusinessUserDetailComponent implements OnInit, OnDestroy {

    businessUser: BusinessUser;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private businessUserService: BusinessUserService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['businessUser']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.businessUserService.find(id).subscribe(businessUser => {
            this.businessUser = businessUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
