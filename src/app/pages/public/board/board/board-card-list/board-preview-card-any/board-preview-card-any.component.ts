import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { IItemDB } from 'src/app/interfaces/items';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardsService } from 'src/app/services/cards/cards.service';
import { UserService } from 'src/app/services/user/user.service';
import { BookmarkService } from '../../../../../../services/bookmark/bookmark.service';

@Component({
  selector: 'app-board-preview-card-any',
  templateUrl: './board-preview-card-any.component.html',
  styleUrls: ['./board-preview-card-any.component.scss']
})
export class BoardPreviewCardAnyComponent implements OnInit, AfterViewInit {

  @Input() item: IItemDB
  ID: string = this.auth.getAuthUserID()
  showCheckbox: boolean;
  @ViewChild('heart') heart: ElementRef<HTMLElement> | undefined

  constructor(private bookmark: BookmarkService,
              private auth: AuthService,
              private userService: UserService,
              private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.showCheckbox = res);
    this.setClassActive()
  };

  ngAfterViewInit(): void {
    this.setClassActive();
  };

  setClassActive() {
    if(this.ID) {
      this.userService.userIsLoaded$.subscribe(() => {
        if(this.item.bookmark === true) {
          this.heart?.nativeElement.classList.add('red')
        }
      })
    }
  };

  addBookmark() {
    this.bookmark.sendBookmark(this.item._id, this.item.collection, this.item.item.title).then(() => {
      console.log('success - add bookmark')
    })
  }

}
