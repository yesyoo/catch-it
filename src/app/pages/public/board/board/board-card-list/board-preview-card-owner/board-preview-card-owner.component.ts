import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/services/cards/cards.service';


@Component({
  selector: 'app-board-preview-card-owner',
  templateUrl: './board-preview-card-owner.component.html',
  styleUrls: ['./board-preview-card-owner.component.scss']
})
export class BoardPreviewCardOwnerComponent implements OnInit {
  showCheckbox: boolean;
  @Input() item: any
  date: any

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.showCheckbox = res)

    let minute = Math.floor((new Date().getTime() - this.item.date) / (1000 * 60))
    if(minute < 60) {
      this.date = `${minute} minute ago`
    }
    if(minute >= 60) {
      this.date = `${Math.floor(minute / 60)} hour ago`
    }
    if(minute >= 120) {
      this.date = `${Math.floor(minute / 60)} hours ago`
    }
    if(minute > 60 * 24) {
      this.date = `${Math.floor(minute / 60 / 24)} week ago`
    }
    if(minute > 60 * 24 * 2) {
      this.date = `${Math.floor(minute / 60 / 24)} weeks ago`
    }

  }

}
