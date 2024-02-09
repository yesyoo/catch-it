import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardItemsVisitorComponent } from './board-items-visitor.component';

describe('BoardItemsVisitorComponent', () => {
  let component: BoardItemsVisitorComponent;
  let fixture: ComponentFixture<BoardItemsVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardItemsVisitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardItemsVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
