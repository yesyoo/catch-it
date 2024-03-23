import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IItemDB } from '../../../../../../models/interfaces/items';
import { BookmarkService } from '../../../../../../services/bookmark/bookmark.service';

@Component({
  selector: 'app-board-card-visitor-panel',
  templateUrl: './board-card-visitor-panel.component.html',
  styleUrls: ['./board-card-visitor-panel.component.scss']
})
export class BoardCardVisitorPanelComponent implements OnInit, AfterViewInit {
  
  @Input() item: IItemDB
  ID = this.auth.ID()
  @ViewChild('heartIcon') heart: ElementRef<HTMLElement> | undefined

  constructor(private auth: AuthService,
              private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    // if(this.ID) {
    //   if(this.item.bookmark === true) {
    //     this.heart?.nativeElement.classList.add('red')
    //   }
    // }
  };

  ngAfterViewInit(): void {
    // if(this.ID) {
    //   if(this.item.bookmark === true) {
    //     this.heart?.nativeElement.classList.add('red')
    //   }
    // }
  };

  bookmark() {
    this.bookmarkService.sendBookmark(this.item).then((res) => {
      if(res === false) {
        this.item.bookmark = false
        // this.heart?.nativeElement.classList.remove('red')
      } else {
        this.item.bookmark = true
        // this.heart?.nativeElement.classList.add('red')
        
      }
    })
  }
}
