import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSearchPanelComponent } from './board-search-panel.component';

describe('BoardSearchPanelComponent', () => {
  let component: BoardSearchPanelComponent;
  let fixture: ComponentFixture<BoardSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardSearchPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
