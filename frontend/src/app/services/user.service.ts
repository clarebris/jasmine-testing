import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async checkDetails() {
    let token = localStorage.getItem('token') as string

    let res =  await fetch('http://localhost:8900/user/check_user_details', {
      headers: {
        "Content-type": "application/json",
        "token": token
      },
      method: "GET"
    })

    let data = await res.json()
    let role = data.info.role
    console.log(role);

    return role
  }

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>('http://localhost:8900/user', {
      headers: {
        'Content-type': 'application/json',
      }
    })
  }
}
