describe('wish social homepage', function() {
  beforeEach(module('wishSocial.index.controllers'));
  it('The scope of viewWishesCtrl should store the data of wishes', inject(function($controller) {
    var viewWishesCtrl = $controller('viewWishesCtrl');
    var wishesData = {
      title: 'The first wish title',
      content: 'The first wish content',
      userName: 'The first userName',
      loveNum: 'The first loveNum'
    }; 
    expect(viewWishesCtrl).toBeDefined(); 
  }));
});
