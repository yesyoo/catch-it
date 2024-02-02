import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser, IUserResponse } from '../../../../../interfaces/user';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  item: IUserResponse
  items: any[]
  constructor(private boardService: BoardService,
              private userService: UserService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    const id = this.boardService.getTargetUserId()
    if(id) {
      this.userService.getUserById(id).subscribe(data => {
        this.item = data;
        this.itemService.getAllItemsByUserId(id).subscribe(data => {
          this.boardService.setCards(data)
        })
      })
    } else { 
      //snapshot(id) => req 
    }
  };

}
