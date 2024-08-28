import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./interface/client";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'https://test-data.directorix.cloud/task1';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
}
