import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from '../../../models/interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private ID: string;
  user: IUser

  showForm: boolean = false
  showSettings: boolean = false;
  showMessages: boolean = false;

  constructor(private userService: UserService,
              private navigationService: NavigationService,
              private boardService: BoardService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.loadUser().then((user) => {
      this.user = user;
      this.ID = this.authService.ID()
    });
  };

  addForm() {
    this.boardService.render('owner-storage')
    this.navigationService.profile(this.ID)
    setTimeout(() => {this.showForm = true}, 400)
  };

  openBoard() {
    const location = this.navigationService.checkLocation(this.ID)
    switch(location) {
      case 'owner-board':
        this.navigationService.home();
        break;
      case 'home-page': 
        this.boardService.setSelectedUserId(this.ID)
        this.navigationService.profile(this.ID)
        break;
      case 'any':
        this.navigationService.home();
        break
    }
  };

  logout() {
    this.authService.logout()
    this.boardService.showAuthModal(true)
    this.navigationService.auth()
  }
 
  openSettings() {
    setTimeout(() => {this.showSettings = true}, 400)
  };

  openMessages() {
    setTimeout(() => {this.showMessages = true}, 400)
  };

}
