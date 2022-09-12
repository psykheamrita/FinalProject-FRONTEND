import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServie: AuthService,
    private toastrService: ToastrService,
    ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      //console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value);
      this.authServie.login(loginModel).subscribe((response)=>{
        this.toastrService.info(response.message, "Login Successful");
        localStorage.setItem("token",response.data.token);
        console.log(response);
      },(responseError)=>{
        this.toastrService.error(responseError.error, "Login Failed")
      }
      )
    }
  }
}
