import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderGenerateMasterViewModel, GeneratedPdfModel } from 'src/app/Shared/Model/generate-order.model';
import { AppComponent } from 'src/app/app.component';
import { GenerateOrderService } from 'src/app/Shared/Service/generate-order.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-generate-order-preview',
  templateUrl: './generate-order-preview.component.html',
  styleUrls: ['./generate-order-preview.component.css']
})
export class GenerateOrderPreviewComponent implements OnInit {
  model: OrderGenerateMasterViewModel;
  html: SafeHtml;
  esignData: string;

  // @ViewChild('btnESign',null) btnESign: ElementRef<HTMLElement>

  constructor(
    private _parentApi: AppComponent,
    private readonly _generateOrderService: GenerateOrderService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private readonly _httpclient: HttpClient,

  ) {
    this.model = new OrderGenerateMasterViewModel();
    this._parentApi.setpagelayout(
      "Generate Order Preview :",
      "keyboard_backspace",
      "Back To List",
      "order/generateorder"
    );
    this.model.Id = this._route.snapshot.params.id;
    if (this.model.Id) {
      this.GetById();
    }
  }

  ngOnInit() {

  }


  GetById() {
    this._generateOrderService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <OrderGenerateMasterViewModel>data.Data;
          this.html = this.sanitizer.bypassSecurityTrustHtml(this.model.Content);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  downloadPdf(isPdf: boolean = false) {
    
    if (isPdf) {
      this._generateOrderService.GeneratePdf(this.model.Id).subscribe(
        data => {
          
          if (data.IsSuccess) {
            const result = <GeneratedPdfModel>data.Data;

           //// --------generate pdf with esign
            // this.esignData = result.Url;
            // document.getElementById('esignDatasss').innerHTML="<input type='text' id='esignData' name='esignData' value='"+ this.esignData+"'>";
            // document.getElementById('btnESign').click();


           // --------generate pdf without esign
            const linkSource = result.Url;
            const downloadLink = document.createElement("a");
            const fileName = name;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.target = "blank";
            downloadLink.click();

          }
        },
        error => {
          
          this._alertService.error(error.message);
        }
      );
    } else {
      this._generateOrderService.GenerateWord(this.model.Id).subscribe(
        data => {
          
          if (data.IsSuccess) {
            const result = <GeneratedPdfModel>data.Data;

            // ----------------generate Word without esign
            const linkSource = result.Url;
            const downloadLink = document.createElement("a");
            const fileName = name;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.target = "blank";
            downloadLink.click();

          }
        },
        error => {
          
          this._alertService.error(error.message);
        }
      );
    }



  }


}
