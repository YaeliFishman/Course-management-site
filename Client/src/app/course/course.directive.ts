// import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// @Directive({
//   selector: '[highLightColor]',
//   standalone: true
// })
// export class CourseDirective {

//   @Input()
//   public highLightColor = 'red'

//   constructor(private element: ElementRef) { }

//   @HostListener('')
//   onThisWeek(){
//     this.element.nativeElement.style.color = this.highLightColor;
//   }


  // @HostListener('mouseout')
  // onMouseOut() {
  //   this.element.nativeElement.style.color = 'blue';
  // }

// }



// import { Directive, ElementRef, Input, OnInit } from '@angular/core';

// @Directive({
//   selector: '[dateColor]',
//   standalone: true
// })
// export class DateColorDirective implements OnInit {
//     // @Input
//     //  ('dateColor') date!: Date;


//    @Input()
//    public date:Date|undefined = new Date();
//   constructor(private el: ElementRef) {    
// }
//   currentDate: Date = new Date();

//   ngOnInit() {debugger
// console.log("aaa",this.date?.getFullYear,this.currentDate.getDay)
//     if (this.date?.getFullYear==this.currentDate.getFullYear) {
//       this.el.nativeElement.style.color = 'red';
//     } else {
//       this.el.nativeElement.style.color = 'yellow';
//     }
//   }
// }
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[dateColor]',
  standalone: true

})
export class DateColorDirective implements OnInit {
  @Input('dateColor') date: Date | undefined;

  currentDate: Date = new Date();

  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    if (this.date && this.date.getFullYear() === this.currentDate.getFullYear()) {
      this.el.nativeElement.style.color = 'red';
    } else {
      this.el.nativeElement.style.color = 'orange';
    }
  }
}
