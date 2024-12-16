import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGridItemComponent } from './books-grid-item.component';

describe('BooksGridItemComponent', () => {
  let component: BooksGridItemComponent;
  let fixture: ComponentFixture<BooksGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksGridItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
