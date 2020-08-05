import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  dashBoardData: any;
  constructor(private TaskService: TaskServiceService) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  redirectToAdd() {
    window.location.href="/form";
  }

  redirectToEdit(id) {
    window.location.href=`/edit/${id}`;
  }

  deleteData(id) {
    console.log("id: ", id)
    this.TaskService.deleteData(`http://127.0.0.1:8081/delete?taskId=${id}`).subscribe(res => {
      if(res.status === "200") {
        this.getItems();
      }
    });
  }

  getItems() {
    this.TaskService.getHomeData("http://127.0.0.1:8081/getAll").subscribe(res => this.dashBoardData = res);
  }
}

