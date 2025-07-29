import { Component, inject, effect, ViewChild } from '@angular/core';
import { ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
// import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { AuthService } from '../../auth/auth.service';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';


@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, SvgIconComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})

export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService);
  authService = inject(AuthService)

  //  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: ['']
  });


  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    });
  }

  // ngAfterViewInit( ) {
  //     this.avatarUploader.avatar
  //   }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
//@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

    // if (this.avatarUploader.avatar) {
    //   firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    // }

    

  splitStack(stack: string | null | string[] | undefined) {
//splitStack(stack: string | null | string[] | undefined ): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack;

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    //splitStack(stack: string | null | string[] ): string[] {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',');

    return stack
  }

  onLogoutAccount() {
    console.log('You are logged out')
    this.authService.logout()
  }

  onDeleteAccount() {
    console.log('Account successfully deleted')
    this.authService.delete()
  }
}
