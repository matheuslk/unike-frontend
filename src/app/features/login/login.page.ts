import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { LOGIN_FORM_ERROR_MESSAGES } from './data/consts/form-error-messages.const';
import { ILoginRequest } from './data/interfaces/login.interface';
import { getFormErrorMessage } from 'src/app/shared/data/functions/get-form-error-message.function';
import { LoginService } from './data/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  isLoading$!: BehaviorSubject<boolean>;

  form!: FormGroup;
  formErrors!: {
    [key: string]: string;
  };

  constructor(
    private builder: FormBuilder,
    private authFacade: AuthFacade,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.isLoading$.unsubscribe();
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.isLoading$ = new BehaviorSubject(false);
    this.initForm();
  }

  initForm(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    Object.keys(this.form.controls).forEach((key, index) => {
      if (index === 0) {
        this.formErrors = {
          [key]: '',
        };
        return;
      }
      this.formErrors[key] = '';
    });
  }

  setListeners(): void {
    this.setIsLoadingListener();
    this.setFormErrorsListener();
  }

  setIsLoadingListener(): void {
    this.isLoading$
      .pipe(skip(1), takeUntil(this.viewDestroyed$))
      .subscribe(isLoading => {
        isLoading ? this.form.disable() : this.form.enable();
      });
  }

  setFormErrorsListener(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.controls[key];
      control.valueChanges
        .pipe(takeUntil(this.viewDestroyed$))
        .subscribe(() => {
          this.formErrors[key] =
            getFormErrorMessage(
              key,
              control.errors,
              LOGIN_FORM_ERROR_MESSAGES
            ) ?? '';
        });
    });
  }

  login(): void {
    this.isLoading$.next(true);
    this.loginService
      .login(this.form.value as ILoginRequest)
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(response => {
        this.authFacade.authenticate(response);
        this.redirectToHome();
      })
      .add(() => {
        this.isLoading$.next(false);
      });
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
