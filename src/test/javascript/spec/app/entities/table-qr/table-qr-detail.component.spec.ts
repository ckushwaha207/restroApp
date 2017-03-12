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
import { TableQRDetailComponent } from '../../../../../../main/webapp/app/entities/table-qr/table-qr-detail.component';
import { TableQRService } from '../../../../../../main/webapp/app/entities/table-qr/table-qr.service';
import { TableQR } from '../../../../../../main/webapp/app/entities/table-qr/table-qr.model';

describe('Component Tests', () => {

    describe('TableQR Management Detail Component', () => {
        let comp: TableQRDetailComponent;
        let fixture: ComponentFixture<TableQRDetailComponent>;
        let service: TableQRService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TableQRDetailComponent],
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
                    TableQRService
                ]
            }).overrideComponent(TableQRDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TableQRDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TableQRService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TableQR(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tableQR).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
