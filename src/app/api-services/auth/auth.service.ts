import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { TOKEN_KEY } from '../../shared/constants/keys/application-keys.constants';
import { AUTH_API_ROUTE } from '../../shared/constants/routes/api/api.routes.constants';
import { AUTH_ROUTE } from '../../shared/constants/routes/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private router:Router){}

  createUser(formData:any){
    return this.http.post(`${environment.apiBaseUrl}/${AUTH_API_ROUTE.signup}`,formData);
  }

  loginUser(formData:any){
    return this.http.post(`${environment.apiBaseUrl}/${AUTH_API_ROUTE.signin}`, formData);
  }

  isLoggedIn(){
    return localStorage.getItem(TOKEN_KEY) != null;
  }

  getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }

  saveAccessToken(token:string){
    localStorage.setItem(TOKEN_KEY, token);
  }

  logoutUser(){
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl(`/${AUTH_ROUTE.login}`);
  }

  getClaims(){
    return JSON.parse(window.atob(this.getToken()!.split(".")[1]));
  }
}
