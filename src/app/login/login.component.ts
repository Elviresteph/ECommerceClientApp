import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Utilisateur } from '../utilisateur';
import { Login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient) { }

  connexion:Login = {
    login: '',
    password: ''
  }
  
  isUpdate = false
  showError = false;
  showErrorPasw = false;

  login(){

    const conex = JSON.stringify(this.connexion);
    console.log(conex);

    this.http.post<Array<Utilisateur>>("http://localhost:64243/api/Login",conex,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }).subscribe(response => {
      if(response.length != 0){
        response.forEach((element) => {
          if(element.password == this.connexion.password){
            window.location.href = "/";
          }else{
            this.showError = true;
            this.showErrorPasw = false;
          }
        });
      }else{
        this.showError = false;
        this.showErrorPasw = true;
      }   
    },
      err => {    
        console.log(err);
    });
  } 
}
  


