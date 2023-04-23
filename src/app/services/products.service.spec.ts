import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // arrange
      const mockData: Product[] = generateManyProducts(2);
      // act
      productService.getAllSimple().subscribe((data) => {
        // assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      // arrange
      const mockData: Product[] = generateManyProducts(3);
      // act
      productService.getAll().subscribe((data) => {
        // assert
        expect(data.length).toEqual(mockData.length);
        //expect(data).toEqual(mockData); no son iguales x q data en el servicio se agrega la propiedad taxes, mockdata no tiene la propiedad taxes
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
  it('should return product list with taxes', (doneFn) => {
    // arrange
    const mockData: Product[] = [
      {
        ...generateOneProduct(),
        price: 100, // 100*0.19 = 19
      },
      {
        ...generateOneProduct(),
        price: 200, // 200*0.19 = 38
      },
    ];
    // act
    productService.getAll().subscribe((data) => {
      // assert
      expect(data.length).toEqual(mockData.length);
      expect(data[0].taxes).toEqual(19);
      expect(data[1].taxes).toEqual(38);
      doneFn();
    });
    // http config
    const url = `${environment.API_URL}/api/v1/products`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
    httpController.verify();
  });
});
