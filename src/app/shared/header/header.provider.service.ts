import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPageHeader } from 'src/app/core/ipage-header';
import { actions } from 'src/app/state/global.actions';
import pageInfoJson from '../../../assets/config/page-info.json';

@Injectable()
/**
 * Set up page attributes to appear in the header
 */
export class HeaderProviderService {

    readonly defaultheader: IPageHeader = {
        pageName: 'unknown',
        pageTitle: 'missing',
        pageCredits: '',
        pageDescription: ''
    }
    
    store = inject(Store);

  buildPageHeader = (pageName: string): IPageHeader => {
     const pageHeader: IPageHeader = this.getPageHeader(pageName);
     this.setPageHeader(pageHeader);
    return pageHeader;
  }

  private getPageHeader = (pageName: string): IPageHeader => {
    const header: IPageHeader | undefined = pageInfoJson.find(item => item.pageName === pageName)
    return (header) ? header : this.defaultheader;
  }

  private setPageHeader = (header: IPageHeader) => {

    this.store.dispatch(actions.setPageTitle({title: header.pageTitle}));
    this.store.dispatch(actions.setPageCredits({credits: header.pageCredits}));
    this.store.dispatch(actions.setPageDescription({description: header.pageDescription}));
  }
}