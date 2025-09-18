import { Component, OnInit } from '@angular/core';
import { NewspaperTransactionDetailViewModel } from 'src/app/Shared/Model/newspaper-modal';
import { AppComponent } from 'src/app/app.component';
import { NewspaperService } from 'src/app/Shared/Service/newspaper.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { NewsProgressUpdateComponent } from '../news-progress-update/news-progress-update.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-newspaper-detail-with-progresslist',
  templateUrl: './newspaper-detail-with-progresslist.component.html',
  styleUrls: ['./newspaper-detail-with-progresslist.component.css']
})
export class NewspaperDetailWithProgresslistComponent implements OnInit {

//#region << Variable >>

  model: NewspaperTransactionDetailViewModel;
  id: number;

//#endregion

//#region << constructor >>

  constructor(private _parentApi: AppComponent,
    private readonly _newspaperService: NewspaperService,
    private readonly _route: ActivatedRoute,
    private readonly _alertService: AlertService,
    private readonly _dialog: MatDialog ) {
    this._parentApi.setpagelayout("Newspaper Detail :", "keyboard_backspace", "Back To List", "newspaper/news");
    this.id = this._route.snapshot.params.id;
  }

//#endregion

//#region << Method >>

  ngOnInit() {
    this.GetById();
  }

  downloadPdf(Url) {
    
        // const linkSource = Url;
        // const downloadLink = document.createElement("a");
        // const fileName = 'Document';
        // downloadLink.href = linkSource;
        // downloadLink.download = fileName;
        // downloadLink.target = "blank";
        // downloadLink.click();
        var w = window.open('about:blank');

        setTimeout(function(){ //FireFox seems to require a setTimeout for this to work.
            w.document.body.appendChild(w.document.createElement('iframe'))
                .src = Url;
                w.document.getElementsByTagName("iframe")[0].style.width = '100%';
            w.document.getElementsByTagName("iframe")[0].style.height = '100%';
        }, 0);
      }

  GetById() {
    
    this._newspaperService.GetNewspaperTransactionDetailWithProgressList(this.id).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.model = <NewspaperTransactionDetailViewModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  openEditDialog(id,transId) {
    const _dialogRef = this._dialog.open(NewsProgressUpdateComponent, {
      width: "1100px",
      data: {TransId:transId ,ProgrssId:id}
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetById();
      }
    });
  }

//#endregion

}
