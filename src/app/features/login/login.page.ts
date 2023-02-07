import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ILoginRequest } from './data/interfaces/login.interface';
import { LoginService } from './data/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  isLoading$!: BehaviorSubject<boolean>;
  viewDestroyed!: Subject<void>;
  constructor(
    private builder: FormBuilder,
    private authFacade: AuthFacade,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.viewDestroyed.next();
    this.viewDestroyed.complete();
    this.isLoading$.unsubscribe();
  }

  initData(): void {
    this.isLoading$ = new BehaviorSubject(false);
    this.viewDestroyed = new Subject();
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login(): void {
    this.isLoading$.next(true);
    this.form.disable();
    const request = this.form.value as ILoginRequest;
    this.loginService
      .login(request)
      .pipe(
        tap(response => {
          this.authFacade.authenticate(response);
          this.redirectToHome();
        }),
        takeUntil(this.viewDestroyed)
      )
      .subscribe()
      .add(() => {
        this.isLoading$.next(false);
        this.form.enable();
      });
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
