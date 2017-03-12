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
import { StoreGroupDetailComponent } from '../../../../../../main/webapp/app/entities/store-group/store-group-detail.component';
import { StoreGroupService } from '../../../../../../main/webapp/app/entities/store-group/store-group.service';
import { StoreGroup } from '../../../../../../main/webapp/app/entities/store-group/store-group.model';

describe('Component Tests', () => {

    describe('StoreGroup Management Detail Component', () => {
        let comp: StoreGroupDetailComponent;
        let fixture: ComponentFixture<StoreGroupDetailComponent>;
        let service: StoreGroupService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [StoreGroupDetailComponent],
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
                    StoreGroupService
                ]
            }).overrideComponent(StoreGroupDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreGroupDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreGroupService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new StoreGroup(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.storeGroup).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
