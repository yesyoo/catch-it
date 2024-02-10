import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardListComponent } from './board-card-list.component';

describe('BoardCardListComponent', () => {
  let component: BoardCardListComponent;
  let fixture: ComponentFixture<BoardCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
