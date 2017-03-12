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
import { TransactionStatusDetailComponent } from '../../../../../../main/webapp/app/entities/transaction-status/transaction-status-detail.component';
import { TransactionStatusService } from '../../../../../../main/webapp/app/entities/transaction-status/transaction-status.service';
import { TransactionStatus } from '../../../../../../main/webapp/app/entities/transaction-status/transaction-status.model';

describe('Component Tests', () => {

    describe('TransactionStatus Management Detail Component', () => {
        let comp: TransactionStatusDetailComponent;
        let fixture: ComponentFixture<TransactionStatusDetailComponent>;
        let service: TransactionStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TransactionStatusDetailComponent],
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
                    TransactionStatusService
                ]
            }).overrideComponent(TransactionStatusDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransactionStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionStatusService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TransactionStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.transactionStatus).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
