import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IJWT } from 'src/app/core/data/interfaces/jwt.interface';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { environment } from 'src/environments/environment';
import { ILoginRequest } from './data/interfaces/login.interface';
import { LoginService } from './data/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
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
  }

  initData(): void {
    this.viewDestroyed = new Subject();
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login(): void {
    const request = this.form.value as ILoginRequest;
    this.loginService
      .login(request)
      .pipe(
        tap(response => {
          this.authFacade.authenticate(response);
          this.router.navigateByUrl('/home');
        }),
        takeUntil(this.viewDestroyed)
      )
      .subscribe();
  }
}
