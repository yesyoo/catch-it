import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserPanelComponent } from './board-user-panel.component';

describe('BoardUserPanelComponent', () => {
  let component: BoardUserPanelComponent;
  let fixture: ComponentFixture<BoardUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
