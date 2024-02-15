import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { UserService } from 'src/app/services/user/user.service';
import { IItemDB } from '../../../../../../interfaces/items';

@Component({
  selector: 'app-board-card-visitor-panel',
  templateUrl: './board-card-visitor-panel.component.html',
  styleUrls: ['./board-card-visitor-panel.component.scss']
})
export class BoardCardVisitorPanelComponent implements OnInit, AfterViewInit {
  
  @Input() item: IItemDB
  ID = this.auth.getAuthUserID()
  @ViewChild('heart') heart: ElementRef<HTMLElement> | undefined

  constructor(private auth: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.ID) {
      this.userService.userIsLoaded$.subscribe(() => {
          if(this.item.bookmark === true) {
            this.heart?.nativeElement.classList.add('red')
          }
      })
    }
  };
  ngAfterViewInit(): void {
    if(this.ID) {
      this.userService.userIsLoaded$.subscribe(() => {
          if(this.item.bookmark === true) {
            this.heart?.nativeElement.classList.add('red')
          }
      })
    }
  };

  bookmark() {
    console.log('add bookmark =>')
  };
}
