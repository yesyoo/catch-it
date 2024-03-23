import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUserpanelOwnerComponent } from './board-userpanel-owner.component';

describe('BoardUserpanelOwnerComponent', () => {
  let component: BoardUserpanelOwnerComponent;
  let fixture: ComponentFixture<BoardUserpanelOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardUserpanelOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUserpanelOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
