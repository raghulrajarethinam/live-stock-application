import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LiveStockService {
  single_stock_url: string;
  multiple_stocks_url: string;

  constructor(private http: HttpClient) {
    this.single_stock_url = "https://cloud.iexapis.com/stable/stock/";
    this.multiple_stocks_url = 'https://cloud.iexapis.com/stable/stock/market/batch';
  }

  getStockPrice(stock_name: string) {
    if (stock_name.trim().length == 0) {
      return EMPTY;
    }
    return this.http.get(this.single_stock_url + stock_name + "/quote"+"?token=pk_f2ddbfd54b2749b29540afcf0a9c62fc");
  }

  getMultipleStockPrice(stock_list: string[]) {
    if (stock_list.length == 0) {
      return EMPTY;
    }
    let stock_name=stock_list[0];
    for(var i=1;i<stock_list.length;i++){
      stock_name=stock_name+','+stock_list[i];
    }
    return this.http.get(this.multiple_stocks_url + "/quote"+"?token=pk_f2ddbfd54b2749b29540afcf0a9c62fc"+ '&'+stock_name );
  }
}