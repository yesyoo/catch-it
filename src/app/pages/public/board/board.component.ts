import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Event, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public authorizedUser: boolean;
  public showBoardSearchPanel: boolean;
  public errorMessage: string | null
  public userIaLoaded: boolean
  public blocked: boolean
  
  constructor(private authService: AuthService,
              private router: Router,
              private boardService: BoardService,
              private userService: UserService ) { }

  ngOnInit(): void {
    if(this.authService.ID()) {
      this.authorizedUser = true
      this.blocked = true
      this.userService.userIsLoaded$.subscribe((res) => {
        if(res === true) {
          this.blocked = false
          console.log('user is loaded and board =>')
        }
      })
    } else {
      this.authorizedUser = false
      this.blocked = false
      console.log('authorized user not found, board =>')
    }
    this.boardService.error$.subscribe(error => this.errorMessage = error);
    this.router.url.includes('user') ? this.showBoardSearchPanel = false : this.showBoardSearchPanel = true
    this.router.events.subscribe((event: Event) => {
      event instanceof NavigationEnd && event.url.includes('user') ? this.showBoardSearchPanel = false : this.showBoardSearchPanel = true
    });
  };

  auth(): void {
    this.boardService.showAuthModal(true)
    this.router.navigateByUrl('/auth')
  };
}
