import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material/material.module";
import {AppModule} from "./app.module";

describe('AppComponent', () => {

  beforeEach(async(() =>
    {
      TestBed.configureTestingModule({
        declarations: [
        ],
        imports: [
          MaterialModule,
          AppModule
        ]

      }).compileComponents();
    })
  );

  it('should have as title "Angular fundamentals tutorial"', async(()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular fundamentals tutorial');
  }));

});
