import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  user: IUser | null
  showForm: boolean = false

  constructor(private userService: UserService) {
   }

  ngOnInit(): void {
    const id: string | null = this.userService.getUserId()
    if(id) {
      this.userService.getUserById(id).subscribe(data => {
        this.userService.setUser(data)
        this.user = this.userService.getUser()
        console.log('user:', this.user)
      })
    } else console.log('userId not found')
  };
  addForm() {
    history.pushState('','','/home/add')
    this.showForm = true
  }
}
