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
import { MenuItemDetailComponent } from '../../../../../../main/webapp/app/entities/menu-item/menu-item-detail.component';
import { MenuItemService } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.service';
import { MenuItem } from '../../../../../../main/webapp/app/entities/menu-item/menu-item.model';

describe('Component Tests', () => {

    describe('MenuItem Management Detail Component', () => {
        let comp: MenuItemDetailComponent;
        let fixture: ComponentFixture<MenuItemDetailComponent>;
        let service: MenuItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MenuItemDetailComponent],
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
                    MenuItemService
                ]
            }).overrideComponent(MenuItemDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MenuItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MenuItemService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MenuItem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.menuItem).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
