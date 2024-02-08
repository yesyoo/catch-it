import { Component, EventEmitter, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { IUser } from '../../../../../interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item/item.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthRestService } from 'src/app/services/auth/auth-rest.service';
import { Collection } from '../../../../../interfaces/category';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit, OnDestroy, OnChanges {
  item: any
  user: IUser | null
  userType: 'owner' | 'user' | 'guest' | 'admin'
  rootPath: string;
  display: boolean = true

  showToast: boolean;
  toastMessage: string = "good"

  ID: string;
  isUserPage: boolean = this.navigationService.isUserPage()

  constructor(private authService: AuthService,
              private board: BoardService,
              private router: Router,
              private userService: UserService,
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService) { }



  ngOnInit(): void {
    console.log('[eqyz ytgjyznyfz')
    this.ID = this.authService.getUserIdFromLocalStorage()
    this.rootPath = this.authService.getRootPath()
    this.display = true
    this.user = this.userService.getUser()
    this.item = this.board.getSelectedCard()

    

    // direct link
    if(!this.item) {      
      this.activatedRoute.params.subscribe(data => {
        this.itemService.getById(data['id']).subscribe(data => {
          this.item = data
          if(this.ID) this.ID === this.item.user ? this.userType = 'owner' : this.userType = 'user' 
          else this.userType = 'guest'
        })
      })
    } 
    
    // routing
    if(this.ID) this.ID === this.item.user ? this.userType = 'owner' : this.userType = 'user'
    else this.userType = 'guest'
  };

  closeCard() {
    window.history.back()
  };

  openUserPage(id: string) {
    this.board.setSelectedUserId(id)
    this.router.navigateByUrl(`${this.rootPath}/user/${id}`)
  };

  deleteItem() {
    this.itemService.deleteItemById(this.item._id, this.item.collection).subscribe(data => {
    
      
      
      this.board.setUserCards(this.board.getUserStorage().filter(item => item._id !== this.item._id))
      
      this.showToastandCloseCard('deleted')
      this.board.changeBoardType('owner')
    
    })
  };

  updateItem() {}
  addBookmark() {}
  sendMessage() {}
  report(){}

  hideItem(data: boolean) {
    const update: string = JSON.stringify({show: data})
    this.itemService.updateItem({id: this.item._id, collection: this.item.collection, params: update}).subscribe(data => {
      this.showToastandCloseCard('hidden')
    })
  };

  login() {
    this.navigationService.auth()
  };
  showDialog() {
    this.display = true;
 
  };

  ngOnDestroy(): void {
    this.display = false;
  };

  onHide() {
    this.closeCard()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['show']) console.log('hide')
  }
  showToastandCloseCard(message: string): void {
    this.toastMessage = message
      this.showToast = true
      setTimeout(() => { window.history.back() }, 500)
  };

}
