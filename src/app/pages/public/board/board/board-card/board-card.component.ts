import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item/item.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ViewerType } from 'src/app/types/types';
import { PanelService } from 'src/app/services/panel/panel.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})

export class BoardCardComponent implements OnInit {
  ID: string;
  viewerType: ViewerType;
  isOwnerPage: boolean = this.nav.matchUsersId();
  item: any;
  display: boolean = true;

  constructor(private auth: AuthService,
              private board: BoardService,
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private nav: NavigationService,
              private panel: PanelService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.display = true;
    this.ID = this.auth.getAuthUserID();

    this.item = this.board.getSelectedItem()
    if(this.item) { 
      this.matchUser()
    } else {
      this.activatedRoute.params.subscribe(data => {
        this.itemService.getOneById(data['id']).then(() => {
          this.item = this.storage.getOneTmpItem()          
          this.matchUser();
        })
      })
    }
  };

  matchUser() {
    if(this.ID) {
      this.ID === this.item.user ? this.viewerType = 'owner-user' : this.viewerType = 'visitor-user'
    } else { 
      this.viewerType = 'unauthorized-user' 
    };
  };

  navigateToUserPage(id: string) {
    if(this.ID === id) {
      this.nav.user(id)
    } else {
      this.panel.openAnyPanel(id)
      this.nav.user(id)
    }
  };

  onHide() {
    this.close()
  };
  login() {
    this.nav.auth()
  };
  close(): void {
    window.history.back()
  };
}
