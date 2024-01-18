import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoardHeaderComponent } from './card-board-header.component';

describe('CardBoardHeaderComponent', () => {
  let component: CardBoardHeaderComponent;
  let fixture: ComponentFixture<CardBoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
