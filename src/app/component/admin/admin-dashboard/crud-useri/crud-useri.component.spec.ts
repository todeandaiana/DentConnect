import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUseriComponent } from './crud-useri.component';

describe('CrudUseriComponent', () => {
  let component: CrudUseriComponent;
  let fixture: ComponentFixture<CrudUseriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudUseriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudUseriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
