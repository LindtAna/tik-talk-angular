import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe} from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, ImgUrlPipe, PostFeedComponent, SvgIconComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
profileService = inject(ProfileService)
route = inject(ActivatedRoute)

me$ = toObservable(this.profileService.me)
subscribers$ = this.profileService.getSubscribersShortList(5)

profile$ = this.route.params
.pipe(
  switchMap(({id}) => {
    if(id === 'me') return this.me$

      return this.profileService.getAccount(id)
  })
)
}
