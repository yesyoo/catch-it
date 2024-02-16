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
  ID: string = this.auth.ID()
  showCheckbox: boolean;
  userBookmarks: any;
  owner: boolean = false
  @ViewChild('heart') heart: ElementRef<HTMLElement> | undefined

  constructor(private bookmarkService: BookmarkService,
              private auth: AuthService,
              private cardsService: CardsService) { }

  ngOnInit(): void {
    if(this.item.user == this.ID) {
      this.owner = true
    };
    this.cardsService.checkbox$.subscribe(res => this.showCheckbox = res);
    this.setClassActive()
  };

  ngAfterViewInit(): void {
    this.setClassActive();
  };

  setClassActive() {
    if(this.ID) {
      if(this.item.bookmark === true) {
        this.heart?.nativeElement.classList.add('red')
      }
    }
  };

  // bookmark() {
  //   this.bookmarkService.sendBookmark(this.item._id, this.item.collection, this.item.item.title).then((res) => {
  //     if(res === true) {
  //       this.heart?.nativeElement.classList.add('red')
  //     } else {
  //       this.heart?.nativeElement.classList.remove('red')
  //     }
  //   })
  // }
    bookmark() {
    this.bookmarkService.sendBookmark(this.item).then((res) => {
      if(res === false) {
        this.item.bookmark = false
        this.heart?.nativeElement.classList.remove('red')
      } else {
        this.item.bookmark = true
        this.heart?.nativeElement.classList.add('red')
        
      }
    })
  }
  

}
