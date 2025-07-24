import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  baseAPIUrl = 'https://icherniakov.ru/yt-course/'

    getTestAccounts(){
return this.http.get<Profile[]>(`${this.baseAPIUrl}account/test_accounts`)
}

getMe() {
  return this.http.get<Profile>(`${this.baseAPIUrl}account/me`)
}
}
