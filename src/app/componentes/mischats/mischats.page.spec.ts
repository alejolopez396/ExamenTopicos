import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MischatsPage } from './mischats.page';

describe('MischatsPage', () => {
  let component: MischatsPage;
  let fixture: ComponentFixture<MischatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MischatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MischatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
