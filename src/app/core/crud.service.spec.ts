import { Inject } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CrudService } from "./crud.service";

describe('CrudService', () => {
  

  let service: CrudService;
  
  let setup = () => {
    service = Inject(CrudService);
  }

 
  beforeEach(() => {
    console.log('beforeEach');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService],
    });
    service = TestBed.inject(CrudService);
  });

  it('CrudService should exist.', () => {
    expect(service).toBeTruthy();
  });

});
/*
import { HttpClient } from "@angular/common/http";
import { CrudService } from "./crud.service";

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let crudService: CrudService;
let endPoint = 'https://nanosoft.co.nz';
beforeEach(() => {
  // TODO: spy on other methods too

  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  crudService = new CrudService(endPoint, spy: httpClientSpy);
});

it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
  const expectedHeroes: Hero[] =
    [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

  httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

  crudService.getHeroes().subscribe({
    next: heroes => {
      expect(heroes)
        .withContext('expected heroes')
        .toEqual(expectedHeroes);
      done();
    },
    error: done.fail
  });
  expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
});

it('should return an error when the server returns a 404', (done: DoneFn) => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  crudService.getHeroes().subscribe({
    next: heroes => done.fail('expected an error, not heroes'),
    error: error  => {
      expect(error.message).toContain('test 404 error');
      done();
    }
  });
});
*/