import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { CreateProductDTO, Product } from '../models/product.model';
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

  afterEach(() => {
    httpController.verify();
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
      {
        ...generateOneProduct(),
        price: 0, // 0*0.19 = 0
      },
      {
        ...generateOneProduct(),
        price: -100, // -100*0.19 = 0
      },
    ];
    // act
    productService.getAll().subscribe((data) => {
      // assert
      expect(data.length).toEqual(mockData.length);
      expect(data[0].taxes).toEqual(19);
      expect(data[1].taxes).toEqual(38);
      expect(data[2].taxes).toEqual(0);
      expect(data[3].taxes).toEqual(0);
      doneFn();
    });
    // http config
    const url = `${environment.API_URL}/api/v1/products`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
  });
  it('should send query params with limit = 10 and offset = 3', (doneFn) => {
    //Arrange
    const mockData: Product[] = generateManyProducts(3);
    const limit = 10;
    const offset = 3;
    //Act
    productService.getAll(limit, offset).subscribe((data) => {
      //Assert
      expect(data.length).toEqual(mockData.length);
      doneFn();
    });

    // http config
    const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
    const params = req.request.params;
    expect(params.get('limit')).toEqual(`${limit}`);
    expect(params.get('offset')).toEqual(`${offset}`);
  });

  describe('Tests for create', () => {
    it('should return new product', (doneFn) => {
      // arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'Iphone',
        price: 1500,
        images: ['img'],
        description: 'Iphone for rat fan boys',
        categoryId: 4,
      };
      // act
      // se envia como {... dto} para evitar problemas de mutacion del objeto
      // siempre usar para pruebas con objetos y arrays
      productService.create({ ...dto }).subscribe((data) => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });
});
