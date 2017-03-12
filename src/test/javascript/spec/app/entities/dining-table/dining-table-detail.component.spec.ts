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
import { DiningTableDetailComponent } from '../../../../../../main/webapp/app/entities/dining-table/dining-table-detail.component';
import { DiningTableService } from '../../../../../../main/webapp/app/entities/dining-table/dining-table.service';
import { DiningTable } from '../../../../../../main/webapp/app/entities/dining-table/dining-table.model';

describe('Component Tests', () => {

    describe('DiningTable Management Detail Component', () => {
        let comp: DiningTableDetailComponent;
        let fixture: ComponentFixture<DiningTableDetailComponent>;
        let service: DiningTableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DiningTableDetailComponent],
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
                    DiningTableService
                ]
            }).overrideComponent(DiningTableDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiningTableDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiningTableService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DiningTable(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.diningTable).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
