import {Component} from "@angular/core";
import {Router} from "@angular/router";
@Component({
  selector: 'navbar-cmp',
  templateUrl: './navbar.component.html',
  styleUrls:[
    './navbar.component.scss'
  ]
})

export class NavbarComponent {
  public isLoggedIn: boolean;
  public isAdmin: boolean;
  constructor(private router: Router) {
    this.isAdmin = false;
    this.isLoggedIn = false;
  }
}
