import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { BoardService } from 'src/app/services/board/board.service';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private ID: string;
  public button: 'Logout' | 'Login';
  public showBoardHeader: boolean;
  
  constructor(private authService: AuthService,
              private router: Router,
              private boardService: BoardService) { }

  ngOnInit(): void {
    this.ID = this.authService.getUserIdFromLocalStorage()
    this.router.url.includes('user') ? this.showBoardHeader = false : this.showBoardHeader = true
    this.router.events.subscribe((event: Event) => {
      event instanceof NavigationEnd && event.url.includes('user') ? this.showBoardHeader = false : this.showBoardHeader = true
      
    });
    if(this.ID) {
      this.button = 'Logout'
      this.authService.setRootPath('home')
    } else {
      this.button = 'Login'
      this.authService.setRootPath('')
    }
  
  };

  auth(): void {
    this.boardService.showAuthModal(true)
    if(this.ID) {
      this.authService.logout()
    }
    this.router.navigateByUrl('/auth')
  };
}
