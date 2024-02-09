import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardItemsOwnerComponent } from './board-items-owner.component';

describe('BoardItemsOwnerComponent', () => {
  let component: BoardItemsOwnerComponent;
  let fixture: ComponentFixture<BoardItemsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardItemsOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardItemsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
