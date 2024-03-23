import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserpanelAnyComponent } from './board-userpanel-any.component';

describe('BoardUserpanelAnyComponent', () => {
  let component: BoardUserpanelAnyComponent;
  let fixture: ComponentFixture<BoardUserpanelAnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserpanelAnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserpanelAnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
