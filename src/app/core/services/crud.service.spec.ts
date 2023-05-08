import { Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';

describe('CrudService', () => {
  let service: CrudService;

  let setup = () => {
    service = Inject(CrudService);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService]
    });
    service = TestBed.inject(CrudService);
  });

  it('CrudService should exist.', () => {
    expect(service).toBeTruthy();
  });

  it('API Url is ', () => {
    expect(service.endPoint).toBeTruthy();
  });

  it('GetFusionResults returns results', () => {

    let rsp: string;
    let obj: Observable<ArrayBuffer> = service.getFusionResults();
    obj.subscribe((response) => {
      console.log('rsp', response);
      expect(obj).toBeTruthy();
    });
  });
});
