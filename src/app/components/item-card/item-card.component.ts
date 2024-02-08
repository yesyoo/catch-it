import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { ModalModule } from '../../pages/modal/modal.module';
import { CommonModule } from '@angular/common';
import { throttleTime } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { ItemService } from 'src/app/services/item/item.service';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [
    ModalModule,
    CommonModule
  ]
})
export class ItemCardComponent implements OnInit {
  // у карты есть 4 типаотображения

  user: IUser | null
  
  @Input() type: 'user' 

  item: any

  // @Input() ownerPreview: boolean;
  // @Output() targetCard: any

  // @Output() submit: EventEmitter<boolean> = new EventEmitter()
  // @Output() openUserCardByUserId: EventEmitter<string> = new EventEmitter()


  constructor(private userService: UserService,
              private itemService: ItemService,
              private router: Router,
              private modalService: ModalService,
              private board: BoardService) { }

  ngOnInit(): void {
    
    this.item = this.board.getSelectedCard()
    console.log('карты вызвана', this.item)

    this.user = this.userService.getUser()
    

  //   if(this.user) {
  //     if(this.type !== 'preview') {
  //       this.user._id === this.item.userId ? this.type = 'owner' : this.type = 'user'
  //     }
  //   } else this.type = 'guest'
  //   console.log('type of user:', this.type)
  // };
  }
addBookmark() {

}
sendMessage() {

}
report() {

}
update() {

}
hide() {

}
deleteCard() {
  this.itemService.deleteItemById(this.item._id, this.item.subcategoryType).subscribe(data => {
    this.modalService.show(false)
    console.log('from-server', data.response)
  })
}

// sendData(data: boolean) {
//   this.submit.emit(data)
// }


openUserCard() {
  // this.openUserCardByUserId.emit(this.item.userId)
  this.router.navigateByUrl(`/user/${this.item.userId}`)
  // this.modalService.show(false)
};

login() {
  this.router.navigateByUrl('/auth')
  this.modalService.show(false)
}

}
