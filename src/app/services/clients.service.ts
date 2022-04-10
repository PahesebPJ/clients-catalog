import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/clients';

  getClients() {


    return this.http.get(this.url);
  }

  saveClient(data: any) {

    return this.http.post(this.url, data);
  }

  deleteClient(data: any) {
    return this.http.delete(this.url + "/" + data);
  }

  updateClient(data: any, id: number) {
    return this.http.put(this.url + "/" + id, data);
  }


}
