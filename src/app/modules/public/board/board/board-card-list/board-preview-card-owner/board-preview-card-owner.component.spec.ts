import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPreviewCardOwnerComponent } from './board-preview-card-owner.component';

describe('BoardPreviewCardOwnerComponent', () => {
  let component: BoardPreviewCardOwnerComponent;
  let fixture: ComponentFixture<BoardPreviewCardOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPreviewCardOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPreviewCardOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
