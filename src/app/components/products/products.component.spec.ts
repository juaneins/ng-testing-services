import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

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
  });
});
