// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { NoteComponent } from './note.component';
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NGXMapperService} from "ngx-logger";
// import {ActivatedRoute, convertToParamMap} from "@angular/router";
// import {Observable} from "rxjs";
// import {of} from "rxjs/internal/observable/of";
//
//
// export class ActivatedRouteMock {
//   public paramMap = of(convertToParamMap({
//     testId: 'abc123',
//     anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
//   }));
// }
//
// describe('NoteComponent', () => {
//   let component: NoteComponent;
//   let fixture: ComponentFixture<NoteComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NoteComponent ],
//       imports: [HttpClientTestingModule],
//       providers: [{
//         provide: ActivatedRoute,
//         useValue: {
//           ActivatedRouteMock
//         },
//       },NGXLogger, NGXMapperService, NGXLoggerHttpService, LoggerConfig]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NoteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
