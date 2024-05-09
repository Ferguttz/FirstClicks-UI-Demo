import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message:string='';
  isOkay:boolean=true;
  submitted:boolean=false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){

  }

  onCodeCompleted(token:string){
    this.confirmAccount(token)
  }

  redireccionLogin(){
    this.router.navigate(['login']);
  }

  confirmAccount(token:string){
    this.authService.confirm({token}).subscribe({
      next:()=>{ this.message="Tu cuenta ha sido activada correctamente.";
      this.submitted=true;
      this.isOkay=true;
    },
      error:()=>{
        this.message="Token caducado o invalido";
        this.submitted=true;
        this.isOkay=false;
      }
    })
  }
}
