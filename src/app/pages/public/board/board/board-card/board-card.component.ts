import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { IUser } from '../../../../../interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  item: any
  user: IUser | null
  owner: boolean
  other: boolean

  constructor(private boardService: BoardService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.item = this.boardService.getTargetCard()
    if(!this.item) {      
      //snapshot(id) => req
    }
    this.user = this.userService.getUser()
    if(this.user) {
      this.user.id === this.item.userId ? this.owner = true : this.other = true
    } 
  };

  login() {
    this.router.navigateByUrl('/auth')
  };
  goToUser(id: string) {
    this.boardService.setTargetUserId(id)
    this.router.navigateByUrl(`/home/user/${id}`)
  };

}
