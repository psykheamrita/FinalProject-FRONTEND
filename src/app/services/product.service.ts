import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:7104/api/';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + 'products/getall';
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsByCategoryId(
    categoryId: number
  ): Observable<ListResponseModel<Product>> {
    let newPath =
      this.apiUrl + 'Products/getbycategory?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  
  addProduct(product:Product):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "products/add", product);
  }
}
