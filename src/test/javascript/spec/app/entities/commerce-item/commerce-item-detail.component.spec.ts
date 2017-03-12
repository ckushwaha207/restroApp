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
import { CommerceItemDetailComponent } from '../../../../../../main/webapp/app/entities/commerce-item/commerce-item-detail.component';
import { CommerceItemService } from '../../../../../../main/webapp/app/entities/commerce-item/commerce-item.service';
import { CommerceItem } from '../../../../../../main/webapp/app/entities/commerce-item/commerce-item.model';

describe('Component Tests', () => {

    describe('CommerceItem Management Detail Component', () => {
        let comp: CommerceItemDetailComponent;
        let fixture: ComponentFixture<CommerceItemDetailComponent>;
        let service: CommerceItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CommerceItemDetailComponent],
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
                    CommerceItemService
                ]
            }).overrideComponent(CommerceItemDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommerceItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommerceItemService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CommerceItem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.commerceItem).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
