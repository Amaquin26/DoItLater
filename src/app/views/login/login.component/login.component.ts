import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {TuiAlertContext, TuiAppearance, TuiButton, TuiError, TuiIcon, TuiLink, TuiNotification, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiPassword} from '@taiga-ui/kit';
import {TuiCardLarge, TuiHeader} from '@taiga-ui/layout';
import { AuthService } from '../../../api-services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AUTH_ROUTE, ROUTES } from '../../../shared/constants/routes/routes.constants';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiHeader,
    TuiLink,
    TuiTitle,
    TuiTextfield,
    TuiPassword,
    TuiError,
    TuiIcon,
    TuiFieldErrorPipe,
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    TuiNotification,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router){}

  @ViewChild('toastAlertTemplate')
  protected toastAlertTemplate?: TemplateRef<TuiAlertContext>;

  isSubmitting = signal(false);
  isNotificationVisible = signal(false);
  errorMessage = signal("");

  registerFormLink = ['/',...AUTH_ROUTE.register.split('/')];

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl(ROUTES.home);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  setNotificationVisibility(show: boolean){
    this.isNotificationVisible.set(show)
  }

  async handleSubmitForm(){
    this.isSubmitting.set(true);
    this.setNotificationVisibility(false);
    this.errorMessage.set("");
    if (!this.loginForm.valid){
      // TODO: trigger a toast/message
      return; 
    }

    this.authService
      .loginUser(this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          this.authService.saveAccessToken(res.token);
          this.router.navigateByUrl(ROUTES.home);
        },
        error: err => {
          console.log(err)
          this.setNotificationVisibility(true);
          this.errorMessage.set(err?.error?.message || "Something went wrong")
        }
      });

      this.isSubmitting.set(false);
  }
}
