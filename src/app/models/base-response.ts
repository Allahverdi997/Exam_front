import { Error } from "./error";
import { PagingResponse } from "./paging-response";

export class BaseResponse<T>{
    data?:T;
    errors?:Error[];
    success:Boolean=false;
    pagingResponse?:PagingResponse;
}