import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import {MessageService, Message} from 'primeng/api';
declare var toastr :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {


  constructor(public appservice: AppService, private messageService :MessageService) {}
  
  ngOnInit() {
  }
  
  loginUser(event){
    event.preventDefault();
    const target = event.target;
    const namauser = target.querySelector('#namauser').value;
    const password = target.querySelector('#password').value;

    var dataPost ={
      "username" :namauser,
      "password" :password
    }
    this.appservice.postLogin('admin/login',dataPost).subscribe(data => {
      console.log(data);
      // thistoastr.success();

  })
  }
}