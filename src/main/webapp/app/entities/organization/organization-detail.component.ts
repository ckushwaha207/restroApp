import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';

@Component({
    selector: 'jhi-organization-detail',
    templateUrl: './organization-detail.component.html'
})
export class OrganizationDetailComponent implements OnInit, OnDestroy {

    organization: Organization;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private organizationService: OrganizationService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['organization']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.organizationService.find(id).subscribe(organization => {
            this.organization = organization;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
