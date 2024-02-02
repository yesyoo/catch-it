import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../../../../services/board/board.service';

@Component({
  selector: 'app-board-items',
  templateUrl: './board-items.component.html',
  styleUrls: ['./board-items.component.scss']
})
export class BoardItemsComponent implements OnInit {

  items: any[]

  constructor(private boardService: BoardService,
              private router: Router) { }

  ngOnInit(): void {
    this.boardService.cards$.subscribe(data => {
      this.items = data
      console.log('items', this.items)
    })
  }
  openCard(item: any) {
    this.boardService.setTargetCard(item)
    this.router.navigateByUrl(`home/item/${item._id}`)
  }

}
