import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardVisitorPanelComponent } from './board-card-visitor-panel.component';

describe('BoardCardVisitorPanelComponent', () => {
  let component: BoardCardVisitorPanelComponent;
  let fixture: ComponentFixture<BoardCardVisitorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCardVisitorPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCardVisitorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
