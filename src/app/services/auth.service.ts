import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7104/api/';
  constructor(
    private httpClient:HttpClient
  ) { }

  login(user:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'Auth/login', user);
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
}
