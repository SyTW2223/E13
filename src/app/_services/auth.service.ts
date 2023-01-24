import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://e13-production.up.railway.app';
  //private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper:JwtHelperService ){}

  login(nombre: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.URL}/login`,{nombre,contraseña})
  }
  register(nombre: string, contraseña: string): Observable<any> {
    return this.http.post(`${this.URL}/register`,{nombre,contraseña,});
  }
  cal_dmg(tipo1A:string, tipo2A: string, tipo1D:string, tipo2D: string, power:number, moveType:string, statsA: string[], statsD: string[], cat:string): Observable<any> {
    return this.http.post(`${this.URL}/damage`, {tipo1A, tipo2A, tipo1D, tipo2D, power,moveType, statsA, statsD,cat });
  }
  save_team(id: string, equipo: string[]): Observable<any> {
    if (this.isAuth()) {
      let cookies = document.cookie.split(';');
      let token = cookies.find(cookie => cookie.startsWith(" token="));
      token = token.substring(7);
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
      httpOptions.params = httpOptions.params.set('id', id);
      return this.http.patch(`${this.URL}/usuario`,{equipo}, httpOptions);
    } else {
      return null;
    }
  }

  isAuth(): boolean {
    let cookies = document.cookie.split(';');
    let token = cookies.find(cookie => cookie.startsWith(" token="));
    if(token==undefined){
      return false;
    }else {
      token = token.substring(7);
    }
    if(token=="" || this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }
}
