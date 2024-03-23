import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCardOwnerPanelComponent } from './board-card-owner-panel.component';

describe('BoardCardOwnerPanelComponent', () => {
  let component: BoardCardOwnerPanelComponent;
  let fixture: ComponentFixture<BoardCardOwnerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCardOwnerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCardOwnerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
