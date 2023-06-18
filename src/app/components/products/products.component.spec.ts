import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, defer } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/products.service';
import { generateManyProducts } from './../../models/product.mock';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getAll',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [{ provide: ProductsService, useValue: productServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOninit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('Tests for getAllProducts', () => {
    it('should return product list from service', () => {
      // arrange
      const productsMock = generateManyProducts(10);
      const countPrev = component.products.length;
      productService.getAll.and.returnValue(of(productsMock));
      // act
      component.getAllProducts();
      fixture.detectChanges();
      // assert
      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
    });

    it('should change "loading" status to "success"', fakeAsync(() => {
      // arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(
        defer(() => Promise.resolve(productsMock))
      );
      //const countPrev = component.products.length;
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(); // exec, obs, setTime, Promise
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('success');
    }));

    it('should change "loading" status to "error"', fakeAsync(() => {
      // arrange
      productService.getAll.and.returnValue(
        defer(() => Promise.reject('error'))
      );
      //const countPrev = component.products.length;
      // act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');
      tick(4000); // exec, obs, setTime, Promise
      fixture.detectChanges();
      // assert
      expect(component.status).toEqual('error');
    }));
  });
});
