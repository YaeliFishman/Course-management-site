import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  registerForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
    public userService : UserService,
    private router: Router
    //private route: ActivatedRoute
  ){
  this.registerForm = formBuilder.group({
    id: [, Validators.required],
    name: [this.userService.name$.value, Validators.required], //צריך להיות מאותחל כבר ביוזר ניים מלוגין
    address: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required],
  })
}

ngOnInit(): void {

// this.route.params.subscribe((param)=>{
//   this.userName=param["userName"];
//   console.log("user name in register"+this.userName)
// })

}

onSubmit() {
  const { id, name, address, mail, password } = this.registerForm.value;
  
  this.userService.checkUserExists(id, name, address, mail, password).subscribe((exists) => {
    if (exists) {
      alert('המשתמש כבר קיים במערכת');
    } else {
      this.userService.save(this.registerForm.value).subscribe(data => {
        if (data == true) {
          console.log("good");
          this.router.navigate(['/course/All-Course']);
        } else {
          console.log("not good", data);
        }
      });
    }
  });
}
}
