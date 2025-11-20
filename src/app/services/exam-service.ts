import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingRequest } from '../models/paging-request';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  
  constructor(private httpClient:HttpClient) {
    
  }

  apiUrl=environment.apiUrl;

  getExamEntities<TResponse>(request:PagingRequest,controller:string):Observable<BaseResponse<Array<TResponse>>>{

    var fullApiUrl=this.apiUrl+controller+"/list"

    return this.httpClient.get<BaseResponse<Array<TResponse>>>(fullApiUrl)
  }

  getExamEntity<TResponse>(request:PagingRequest,controller:string):Observable<BaseResponse<TResponse>>{

    var fullApiUrl=this.apiUrl+controller+"/list"

    return this.httpClient.get<BaseResponse<TResponse>>(fullApiUrl)
  }

  save<TResponse,TRequest>(request:TRequest,controller:string):Observable<BaseResponse<TResponse>>
  {
    var fullApiUrl=this.apiUrl+controller

    return this.httpClient.put<BaseResponse<TResponse>>(fullApiUrl,request);
  }
}
