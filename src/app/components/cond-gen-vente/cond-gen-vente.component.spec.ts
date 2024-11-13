import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondGenVenteComponent } from './cond-gen-vente.component';

describe('CondGenVenteComponent', () => {
  let component: CondGenVenteComponent;
  let fixture: ComponentFixture<CondGenVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondGenVenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondGenVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
