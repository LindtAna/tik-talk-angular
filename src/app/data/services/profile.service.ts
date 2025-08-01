import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  baseAPIUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<Profile | null>(null)

    getTestAccounts(){
return this.http.get<Profile[]>(`${this.baseAPIUrl}account/test_accounts`)
}

getMe() {
  return this.http.get<Profile>(`${this.baseAPIUrl}account/me`)
  .pipe(
    tap(res => this.me.set(res))
  )
}

getAccount(id:string){
  return this.http.get<Profile>(`${this.baseAPIUrl}account/${id}`)
}

getSubscribersShortList(subsAmount = 3){
  return this.http.get<Pageble<Profile>>(`${this.baseAPIUrl}account/subscribers/`)
  .pipe(
    map((res: { items: any; }) => res.items.slice(0, subsAmount))
  )
}


patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseAPIUrl}account/me`,
      profile
    )
  }


  uploadAvatar(file: File ){
    const fd = new FormData()
    fd.append('image', file)
    
     return this.http.post<Profile>(
      `${this.baseAPIUrl}account/upload_image`,
      fd
    )
  }

}
