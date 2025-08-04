import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { NgFor, NgForOf, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf, RouterLink, ImgUrlPipe, SubscriberCardComponent, AsyncPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
profileService = inject(ProfileService)

subscribers$ = this.profileService.getSubscribersShortList(5)

me = this.profileService.me

menuItems = [
  {
    label: 'My Page',
    icon: 'home',
    link: 'profile/me'
  },

  {
    label: 'Chats',
    icon: 'chat',
    link: 'chats'
  },

  {
    label: 'Search',
    icon: 'search',
    link: 'search'
  }
]

ngOnInit(){
  this.profileService.getMe().subscribe();
}
}
