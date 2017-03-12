import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TransactionStatus } from './transaction-status.model';
import { TransactionStatusService } from './transaction-status.service';

@Component({
    selector: 'jhi-transaction-status-detail',
    templateUrl: './transaction-status-detail.component.html'
})
export class TransactionStatusDetailComponent implements OnInit, OnDestroy {

    transactionStatus: TransactionStatus;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private transactionStatusService: TransactionStatusService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['transactionStatus']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.transactionStatusService.find(id).subscribe(transactionStatus => {
            this.transactionStatus = transactionStatus;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
