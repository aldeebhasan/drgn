import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl: string = 'http://localhost:8080'
  // private baseUrl: string = ''

  constructor(private http: HttpClient) { }

  async uploadImage(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, 'filename.png');

    const request = this.http.post<any>(`${this.baseUrl}/api/uploader/image`, formData)
    return await lastValueFrom(request)
  }

}
