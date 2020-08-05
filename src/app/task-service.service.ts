import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  taskData: any;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // getHomeData(){
  //   const url = "http://127.0.0.1:8081/getAll";
  //   return this.http.get(url);
  // }

  public getHomeData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public saveTaskData(url: string, data: any) {
    return this.http.post(url, data);
  }

  public udpateTaskData(url: string, data: any) {
    return this.http.post(url, data);
  }

  public editData(url: string) {
    return this.http.get(url);
  }

  public deleteData(url: string) {
    return this.http.delete(url);
  }
}
