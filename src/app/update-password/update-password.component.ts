import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Utilisateur } from '../utilisateur';
import { Login } from '../login';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  constructor(private http: HttpClient) { }
  user : Utilisateur ={
    login: '',
    password: '',
    nom: '',
    prenom: '',
    adresse: '',
    isAdmin: false,
    date_naissance: undefined,
    e_mail: ''
  }

  
  confirmPw ='';
  showError=false;
  showErrorPasw = false;

  message: string;

  isValidPw(Pw1,Pw2){
    if(Pw1 === Pw2 && Pw1 !==""){
      return true;
    }
    return false;
  }

  update(){
    
    let pass = this.isValidPw(this.confirmPw,this.user.password);

    if(pass){
      this.checkIfLoginExiste();
    }else{
      this.showErrorPasw = true;
    }
   

  }

  checkIfLoginExiste(){
    let checkuser = { 
      login: this.user.login,
      password: this.user.password,
    }

    const conex = JSON.stringify(checkuser);

    this.http.post<Array<Utilisateur>>("http://localhost:64243/api/Login",conex,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }).subscribe(response => {
      response.forEach((element) => {
        if(response.length != 0){
          if(element.login === this.user.login){
            this.user.login = this.user.login;
            this.user.password = this.user.password;
            this.user.nom = element.nom;
            this.user.prenom = element.prenom;
            this.user.adresse = element.adresse;
            this.user.isAdmin = element.isAdmin;
            this.user.date_naissance = element.date_naissance;
            this.user.e_mail = element.e_mail;
          }
          const body = JSON.stringify(this.user);
          console.log("body",body);

          this.http.put("http://localhost:64243/api/Utilisateurs", body, {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
          }).
            subscribe(response => { 
              this.message = "update ok"
              this.showError=false;
              this.showErrorPasw = false;
              alert("Votre mot de passe a été reinitialisé");
              window.location.href = "/login";
            },
      
              err => {
                this.message = "update KO"
              });

              console.log(this.user);
          }else{
            this.showError=true;
            this.showErrorPasw = false;
          }
        });
    },
      err => {    
        console.log(err);
    });
  }
}

