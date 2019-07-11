import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { PageRenderedEvent } from 'ngx-extended-pdf-viewer/lib/page-rendered-event';
import { PagesLoadedEvent } from 'ngx-extended-pdf-viewer/lib/pages-loaded-event';
declare var annotator: any;
 
@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
public title = 'pdf-highlight-annotator-ui';
public pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
public handTool: boolean | undefined = undefined;

    ngOnInit() {
        setTimeout(() => {
        this.annotatorFunc();
        }, 3000);
    }
    
    constructor() {}
 
    public annotatorFunc(): void {
        const pageUri = function () {
            return {
                beforeAnnotationCreated: function (ann) {
                ann.uri = window.location.href;
                }
            };
        };
       
            const elem = document.querySelector('pdf-container');

            const app = new annotator.App();
            app.include(annotator.ui.main, {element: elem});
            app.include(annotator.storage.http, {prefix: 'http://localhost:8080/api'});
            app.include(pageUri);
            app.start().then(function () {
                app.annotations.load({uri: window.location.href});
            });
        
    }
} 
