import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOreDisponibileComponent } from './show-ore-disponibile.component';

describe('ShowOreDisponibileComponent', () => {
  let component: ShowOreDisponibileComponent;
  let fixture: ComponentFixture<ShowOreDisponibileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOreDisponibileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOreDisponibileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
