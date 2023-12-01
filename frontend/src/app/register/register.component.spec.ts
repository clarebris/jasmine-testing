import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserDetails } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['createUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });



  it('should initialize the form ', () => {
    expect(component.registerUser.value).toEqual({
      username: '',
      email: '',
      password: '',
    });
  });

  it('should createUser and navigate to login', () => {
    const userDetails: UserDetails = {
      username: 'clare',
      email: 'clare@gmail.com',
      password: 'testpass',
    };
    component.registerUser.setValue(userDetails);
    


    component.createUser();


    expect(authServiceSpy.createUser).toHaveBeenCalledWith(userDetails);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
