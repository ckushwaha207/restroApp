import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Component({
    selector: 'jhi-order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit, OnDestroy {

    order: Order;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['order', 'orderState']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.orderService.find(id).subscribe(order => {
            this.order = order;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
