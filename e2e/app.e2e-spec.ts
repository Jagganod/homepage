import { HpBootstrapPage } from './app.po';

describe('hp-bootstrap App', () => {
  let page: HpBootstrapPage;

  beforeEach(() => {
    page = new HpBootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
