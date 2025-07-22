import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

   baseAPIUrl = 'https://icherniakov.ru/yt-course/auth'

  login(payload: {username:string, password: string}){
    const fd = new FormData()

    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post(`${this.baseAPIUrl}token`,
      fd
    )
  }
}
