import { browser, element, by } from 'protractor';

export class AppetcareEstabelecimentoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
