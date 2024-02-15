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

  public userIsAuth: boolean;
  public showBoardSearchPanel: boolean;
  public errorMessage: string | null
  
  constructor(private authService: AuthService,
              private router: Router,
              private boardService: BoardService) { }

  ngOnInit(): void {
    this.authService.getAuthUserID() ? this.userIsAuth = true : this.userIsAuth = false;
    this.boardService.error$.subscribe(error => this.errorMessage = error);

    this.router.url.includes('user') ? this.showBoardSearchPanel = false : this.showBoardSearchPanel = true
    this.router.events.subscribe((event: Event) => {
      event instanceof NavigationEnd && event.url.includes('user') ? this.showBoardSearchPanel = false : this.showBoardSearchPanel = true
    });
    // if(this.ID) {
      //   this.bookmarkClassActive = this.card.bookmarksId
      //   if(this.card.bookmarksId) {
      //     this.card.setClassActiveFor(this.items, this.bookmarkClassActive)
      //     console.log('list get active bookmarks', this.bookmarkClassActive )
      //   };
      //   this.card.bookmarkItemId$.subscribe(array => {
      //     console.log('arr', array)
      //     this.bookmarkClassActive = this.card.setClassActiveFor(this.items, array)
      //     console.log('bookmarks itemid rx', this.bookmarkClassActive )
      //   })
      // };
  };

  auth(): void {
    this.boardService.showAuthModal(true)
    this.router.navigateByUrl('/auth')
  };
}
