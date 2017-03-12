import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OrderDetailComponent } from '../../../../../../main/webapp/app/entities/order/order-detail.component';
import { OrderService } from '../../../../../../main/webapp/app/entities/order/order.service';
import { Order } from '../../../../../../main/webapp/app/entities/order/order.model';

describe('Component Tests', () => {

    describe('Order Management Detail Component', () => {
        let comp: OrderDetailComponent;
        let fixture: ComponentFixture<OrderDetailComponent>;
        let service: OrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [OrderDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    OrderService
                ]
            }).overrideComponent(OrderDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Order(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.order).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
