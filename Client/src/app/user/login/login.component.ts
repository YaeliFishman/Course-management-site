import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { log } from 'console';
import { animate, style, transition, trigger } from '@angular/animations';
import { Course, EHowToLearn } from '../../classes/course.model';
import { Observable } from 'rxjs';
import { CourseService } from '../../course/course.service';
import { map, tap } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit{
  loginForm: FormGroup;
  isLecturer: boolean = false;

  
  @ViewChild('inputField') inputField!: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

    this.loginForm = this.formBuilder.group({
   

      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('^\\d{4,6}$')]]
    });
  };

  ngOnInit(): void {
    // Angular animations definition
    trigger('formAnimation', [transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))])
    ])
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputField.nativeElement.focus();
    }, 0);
  }


  onSubmit() {
    this.userService.login(this.loginForm.value.userName,
      this.loginForm.value.password).subscribe(data => {
        if (data) {
          console.log("good")
          this.setItem('userDetails', data);
          this.router.navigate(['/course/All-Course'])

        }
        else {
          console.log("not good")
         this.userService.name$.next(this.loginForm.value.userName);

          // this.router.navigate(['/user/register', this.loginForm.value.userName ])  
          this.router.navigate(['/user/register'])
        }
      })
  }
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  
  public lecturerLogin() {
    this.isLecturer = true;
  }

  // filteredByName(){
  //   this.filteredCourses = this.courseService.getCourses().pipe(
  //     tap(courses => this.coursesList = courses),
  //     map(courses => {
  //       return courses.filter(course => 
  //       (!this.searchByName || course.name.toLowerCase().includes(this.searchByName.toLowerCase()))
  //     );
  //   })
  // );
  // }










//   public coursesList: Course[] = [];
//   public filteredCourses?: Observable<Course[]>;
//   public searchByName: string = '';

//   constructor(private router: Router, private courseService: CourseService) {}

//   ngOnInit(): void {
//     this.filteredCourses = this.courseService.getCourses().pipe(
//       tap(courses => this.coursesList = courses),
//       map(courses => this.filterCourses(courses))
//     );
//   }


//   filterCourses(courses: Course[]): Course[] {
//     return courses.filter(course =>
//       (!this.searchByName || course.name.toLowerCase().includes(this.searchByName.toLowerCase()))
//     );
//   }

//   showDetails(course: Course): void {
//     this.router.navigate(["/course/Course-Details", course.id]);
//   }


// filteredByName(){
//   this.filteredCourses = this.courseService.getCourses().pipe(
//     tap(courses => this.coursesList = courses),
//     map(courses => {
//       return courses.filter(course => 
//       (!this.searchByName || course.name.toLowerCase().includes(this.searchByName.toLowerCase()))
//     );
//   })
// );
// }


}




