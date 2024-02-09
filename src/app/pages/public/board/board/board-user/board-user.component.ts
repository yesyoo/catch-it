import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from 'src/app/services/user/user.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit, OnDestroy {

  private authID: string;
  selectedUser: any;
  type: 'owner' | 'visitor';

  constructor(private authService: AuthService,
              private board: BoardService,
              private userService: UserService,
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    const id = this.board.getSelectedUserId()
    console.log('id', id)
    if(id) {
      // from click()
      this.checkOwner(id)
    } else {
      // from direct link
      this.activatedRoute.params.subscribe(path => this.checkOwner(path['id'])) 
    }
  };

  checkOwner(id: string) {
    this.authID = this.authService.getUserIdFromLocalStorage()
    if(!this.authID) {
      this.type = 'visitor'
      this.getUserDataDB(id)
    } else {
      if(this.authID !== id) {
        this.type = 'visitor'
        this.getUserDataDB(id)
      } else {
        this.type = 'owner'
        this.userService.getUserPromise().then(user => {
          this.selectedUser = user;
          this.board.updateCardListFor('owner')
         })
      }
    }
  };

  getUserDataDB(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      this.selectedUser = user;
    })
    this.itemService.getByUserId(id).subscribe(cards => {
      if(Array.isArray(cards)) {
        // cards.sort(function(a, b) { return b.date - a.date })
        this.board.updateCardListFor('visitor')
        this.board.setVisitorCards(cards)
        this.board.setAnyUserCards(cards)
      }
    })   
  };

  ngOnDestroy(): void {
    this.board.showUser(false)
  };

  closeUserPage() {
    this.board.updateCardListFor('visitor')
    this.navigationService.home()
  };

  addCheckbox() {
    
  }

}
