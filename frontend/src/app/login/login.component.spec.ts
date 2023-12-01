import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['checkDetails']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful login and navigate to the appropriate route', async () => {

    const userData = { email: 'test@example.com', password: 'testpass' };
    loginServiceSpy.login.and.returnValue(of({ message: 'Logged in successfully' }));
    userServiceSpy.checkDetails.and.returnValue(of('customer'));


    await component.onSubmit();


    expect(component.loggedInState).toBe(false);
    expect(component.loggedIn).toBe(true);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['customer']);
  });

  it('should handle login error and display error message', async () => {

    const userData = { email: 'clare@gmail.com', password: '@Qwerty123' };
    loginServiceSpy.login.and.returnValue(of({ error: 'User details not found' }));


    await component.onSubmit();


    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.loggingIn).toBe(false);
});
