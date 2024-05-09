import { Component } from '@angular/core';
import { AuthenticationRequestDto } from '../../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequestDto = {userName:'',password:''};
  errorMsg: Array<string>=[];

  constructor(
    private router:Router,
    private authService: AuthenticationService

  ){

  }

  login(){
    this.errorMsg=[];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next:(()=>{
        this.router.navigate(['']);
      }),
      error: (err) => {
        console.log(err);

        if(err.error.validationErrors){
          this.errorMsg= err.error.validationErrors;
        }else{
          this.errorMsg.push(err.error.errorDescription);
        }
      }
    })
  }

  register(){
    this.router.navigate(['register']);
  }
}
