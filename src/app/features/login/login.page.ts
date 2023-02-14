import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ILoginRequest } from './data/interfaces/login.interface';
import { LoginService } from './data/services/login.service';
import { getFormErrorMessage } from './data/functions/get-form-error-message.function';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  isLoading$!: BehaviorSubject<boolean>;
  viewDestroyed!: Subject<void>;
  getFormErrorMessage!: (
    field: string,
    errors: ValidationErrors | null
  ) => string | void;

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
    this.viewDestroyed.next();
    this.viewDestroyed.complete();
    this.isLoading$.unsubscribe();
  }

  initData(): void {
    this.isLoading$ = new BehaviorSubject(false);
    this.viewDestroyed = new Subject();
    this.getFormErrorMessage = getFormErrorMessage;
    this.initForm();
  }

  initForm(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  setListeners(): void {
    this.setIsLoadingListener();
  }

  setIsLoadingListener(): void {
    this.isLoading$
      .pipe(skip(1), takeUntil(this.viewDestroyed))
      .subscribe(isLoading => {
        isLoading ? this.form.disable() : this.form.enable();
      });
  }

  login(): void {
    this.isLoading$.next(true);
    const request = this.form.value as ILoginRequest;
    this.loginService
      .login(request)
      .pipe(takeUntil(this.viewDestroyed))
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
