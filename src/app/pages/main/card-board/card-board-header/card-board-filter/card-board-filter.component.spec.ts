import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoardFilterComponent } from './card-board-filter.component';

describe('CardBoardFilterComponent', () => {
  let component: CardBoardFilterComponent;
  let fixture: ComponentFixture<CardBoardFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoardFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoardFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
