import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {


  get taskName() {
    return this.addTaskForm.get("taskName");
  }

  get taskCategory() {
    return this.addTaskForm.get("taskCategory");
  }

  get taskNature() {
    return this.addTaskForm.get("taskNature");
  }

  get taskBusinessSegment() {
    return this.addTaskForm.get("taskBusinessSegment");
  }

  get taskCreatedBy() {
    return this.addTaskForm.get("taskCreatedBy");
  }

  get taskApporver() {
    return this.addTaskForm.get("taskApporver");
  }

  get taskCreationTimestamp() {
    return this.addTaskForm.get("taskCreationTimestamp");
  }

  get taskWeightageScore() {
    return this.addTaskForm.get("taskWeightageScore");
  }

  get taskFrequency() {
    return this.addTaskForm.get("taskFrequency");
  }

  get isActive() {
    return this.addTaskForm.get("isActive");
  }

  get taskProvenaceFlag() {
    return this.addTaskForm.get("taskProvenaceFlag");
  }


  // taskName = new FormControl("test");


  constructor(private fb: FormBuilder, private TaskService: TaskServiceService, private route: ActivatedRoute) { }

  showError: boolean = false;

  isEdit: boolean = false;

  paramValue: any;

  editDatas: any;

  errorMsg: string = "Fill all the Required";


  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.paramValue = parseInt(param.id);
      if(param.id) {
        this.isEdit = true;
        this.getEditData();
      }
    })
  }

  addTaskForm = this.fb.group({
    taskName: ['', Validators.required],
    taskCategory: ['', Validators.required],
    taskNature: ['', Validators.required],
    taskBusinessSegment: ['', Validators.required],
    taskCreatedBy: ['', Validators.required],
    taskApporver: ['', Validators.required],
    taskCreationTimestamp: ['', Validators.required],
    taskWeightageScore: ['', Validators.required],
    taskFrequency: ['', Validators.required],
    isActive: ['', Validators.required],
    taskProvenaceFlag: ['', Validators.required]
  });

  redirectDashboard() {
    window.location.href = ""
  }

  getEditData() {
    this.TaskService.editData(`http://127.0.0.1:8081/get?taskId=${this.paramValue}`).subscribe(res => {
      if(res) {
        if (res.status === "200") {
          this.addTaskForm.patchValue({
            task: res.data.task,
            taskName: res.data.taskName,
            taskCategory: res.data.taskCategory,
            taskNature: res.data.taskNature,
            taskBusinessSegment: res.data.taskBusinessSegment,
            taskCreatedBy: res.data.taskCreatedBy,
            taskApporver: res.data.taskApporver,
            taskCreationTimestamp: res.data.taskCreationTimestamp,
            taskWeightageScore: res.data.taskWeightageScore,
            taskFrequency: res.data.taskFrequency,
            isActive: res.data.isActive,
            taskProvenaceFlag: res.data.taskProvenaceFlag
          })
        }
      }
    })
  }

  saveForm() {
    if (this.addTaskForm.valid) {
      this.TaskService.saveTaskData("http://127.0.0.1:8081/save", this.addTaskForm.value).subscribe(res => {
        if(res.status === "200") {
          this.showError = false;
          window.location.href=""; 
        }
      });
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  updateForm() {
    if (this.addTaskForm.valid) {
      let formValue = this.addTaskForm.value;
      formValue.task = this.paramValue;
      this.TaskService.udpateTaskData("http://127.0.0.1:8081/update", formValue).subscribe(res => {
        if(res) {
          if(res.status === "200") {
            this.showError = false;
            window.location.href="";
          } else {
            this.showError = true;
            this.errorMsg = "Invalid Inputs";
          }
        }
      });
      this.showError = false;
    } else {
      this.showError = true;
      this.errorMsg = "Fill all the Required";
    }
  }
}
