import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {

    let userId = window.localStorage.getItem('editUserId');

    if(!userId) {

      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });

    this.userService.getUserById(+userId).subscribe(data => {
      this.editForm.setValue(data.result);
    });
  }

  onSubmit() {
     this.userService.updateUser(this.editForm.value)
     .pipe(first())
     .subscribe(data => {

      if (data.status === 200) {
        alert('User updated successfully');
        this.router.navigate(['list-user']);
      } else {
        alert(data.message);
      }
     }, error => {
       alert(error);
     });
  }
}
