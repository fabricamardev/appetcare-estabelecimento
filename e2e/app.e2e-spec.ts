import { AppetcareEstabelecimentoPage } from './app.po';

describe('appetcare-estabelecimento App', function() {
  let page: AppetcareEstabelecimentoPage;

  beforeEach(() => {
    page = new AppetcareEstabelecimentoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
