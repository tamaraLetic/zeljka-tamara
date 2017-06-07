import { ProjekatPage } from './app.po';

describe('projekat App', () => {
  let page: ProjekatPage;

  beforeEach(() => {
    page = new ProjekatPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
