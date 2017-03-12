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
import { MenuCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/menu-category/menu-category-detail.component';
import { MenuCategoryService } from '../../../../../../main/webapp/app/entities/menu-category/menu-category.service';
import { MenuCategory } from '../../../../../../main/webapp/app/entities/menu-category/menu-category.model';

describe('Component Tests', () => {

    describe('MenuCategory Management Detail Component', () => {
        let comp: MenuCategoryDetailComponent;
        let fixture: ComponentFixture<MenuCategoryDetailComponent>;
        let service: MenuCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MenuCategoryDetailComponent],
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
                    MenuCategoryService
                ]
            }).overrideComponent(MenuCategoryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuCategoryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MenuCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.menuCategory).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
