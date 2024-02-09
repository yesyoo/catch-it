import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserOwnerPanelComponent } from './board-user-owner-panel.component';

describe('BoardUserOwnerPanelComponent', () => {
  let component: BoardUserOwnerPanelComponent;
  let fixture: ComponentFixture<BoardUserOwnerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserOwnerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserOwnerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
