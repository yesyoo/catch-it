import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserVisitorPanelComponent } from './board-user-visitor-panel.component';

describe('BoardUserVisitorPanelComponent', () => {
  let component: BoardUserVisitorPanelComponent;
  let fixture: ComponentFixture<BoardUserVisitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserVisitorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserVisitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
