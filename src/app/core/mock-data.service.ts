import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, DefaultDataServiceConfig } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { SharepointService } from 'dnp-sharepoint';

// @Injectable() << NOTE - this commented out
export class SharePointEntityDataService extends DefaultDataService<any>{

  constructor( entityName: string,  http: HttpClient, 
     httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig, private backEnd: SharepointService) {
    super(entityName, http, httpUrlGenerator, config);
}
  
getAll(): Observable<any[]>{
  console.log('calling for ',this.entityName);
  return this.backEnd.getAll(this.entityName); // << my custom call 
}

}