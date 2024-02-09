import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FlowerDetails {
  flower_name: string;
  description: string;
  confidence: number;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  selectedFile: File | undefined;
  uploadedImage: string | undefined;
  flowerDetails: FlowerDetails | undefined;

  constructor(private http: HttpClient) {}

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<FlowerDetails>('http://flower-recognition-backend-image:8000/uploadFile/', formData)
        .subscribe(response => {
          // @ts-ignore
          console.log(response.filename);
          // @ts-ignore
          this.flowerDetails = response;
        });
    }
  }
}
