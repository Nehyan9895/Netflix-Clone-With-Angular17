import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  bgUrl = BG_IMG_URL;
  loginService = inject(LoginService)
  router = inject(Router)
  toastrService = inject(ToastrService)

  ngOnInit(){
    if(this.loginService.isLoggedIn){
      this.router.navigateByUrl('/browse')
    }
  }

  email!:string;
  password!:string;

  onSubmit(){
    if(!this.email||!this.password){
      this.toastrService.error("Provide email or password")
      return;
    }
    this.loginService.login(this.email,this.password) 
    this.toastrService.success('logged in successfully')
    this.router.navigateByUrl('/browse')
  }
  
}
