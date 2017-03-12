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
import { BusinessUserDetailComponent } from '../../../../../../main/webapp/app/entities/business-user/business-user-detail.component';
import { BusinessUserService } from '../../../../../../main/webapp/app/entities/business-user/business-user.service';
import { BusinessUser } from '../../../../../../main/webapp/app/entities/business-user/business-user.model';

describe('Component Tests', () => {

    describe('BusinessUser Management Detail Component', () => {
        let comp: BusinessUserDetailComponent;
        let fixture: ComponentFixture<BusinessUserDetailComponent>;
        let service: BusinessUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BusinessUserDetailComponent],
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
                    BusinessUserService
                ]
            }).overrideComponent(BusinessUserDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BusinessUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessUserService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BusinessUser(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.businessUser).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
