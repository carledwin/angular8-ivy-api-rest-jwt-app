import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {

    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.userService.getUsers().subscribe(data => {
      this.users = data.result;
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.id).subscribe(data => {
      this.users = this.users.filter(u => u !== user);
    });
  }

  editUser(user: User): void {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.id.toString());

    this.router.navigate(['edit-user']);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }

}
