import { Component } from '@angular/core';
import { RequestUserClientDto } from '../../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest: RequestUserClientDto = {userName:'',password:'',firstName:'',lastName:'',email:'',dateOfBirth:'',address:'',
  gender:'',roleId:0,photoRoute:'',description:''};
  errorMsg: Array<string> = [];


  constructor(
      private router: Router,
      private authService: AuthenticationService
  ){

  }
  register(){
    this.errorMsg=[];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next:()=>{
        this.router.navigate(['activate-account']);
      },
      error: (err)=>{
        this.errorMsg=err.error.validationErrors;
      }
    })
  }
  
}
