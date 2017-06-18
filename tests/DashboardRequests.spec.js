/*describe('Dashboard Requests', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;

  beforeEach(module('kache'));

  beforeEach(inject(function($injector){
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('POST', 'https://translate.yandex.net/api/v1.5/tr.json/getLangs').respond({
      data: {
        dirs:[az-ru,be-bg],
        langs:{af:Afrikaans,am:Amharic}
      }});

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     createController = function() {
       return $controller('Dashboard', {'$scope' : $rootScope });
     };
   }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('It should fetch languages', function(){
    var controller = createController();
    $httpBackend.expectPOST('https://translate.yandex.net/api/v1.5/tr.json/getLangs', {}).respond(200, {
      data: {
        dirs:[az-ru,be-bg],
        langs:{af:Afrikaans,am:Amharic}
      }});
    $rootScope.getLanguagesList();
    $httpBackend.flush();
    expect($rootScope.originLanguages.length).toBeGreaterThan(0);
  });

});*/



describe('Dashboard', function () {
  beforeEach(module('kache'));

  var $httpBackend,
  promise,
  successCallback,
  errorCallback,
  httpController,
  $scope = {},
  $controller,
  key = 'trnsl.1.1.20170618T002653Z.5444f9ae8504462a.a6b01b7cf1e0dad825b68caca80b542b5b2b8117',
  expectedUrl = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key='+key;

  beforeEach(inject(function ($rootScope, _$controller_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    successCallback = jasmine.createSpy("SuccessGetLangs");
    errorCallback = jasmine.createSpy("ErrorGetLangs");
    $controller = _$controller_;
  }));

  beforeEach(function(){
    httpController = $controller('Dashboard', {$scope: $scope});
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('returns http requests successfully and resolves the promise', function () {
    var data = {
      data: {
        dirs:["az-ru","be-bg"],
        langs:{
          "af": "Afrikaans",
          "am": "Amharic"
        }
      }
    };
    expect(httpController).toBeDefined();
    $httpBackend.expectPOST(expectedUrl).respond(200, data);
    promise = $scope.getLanguagesList();
    promise.then(successCallback, errorCallback);

    $httpBackend.flush();

    expect(successCallback).toHaveBeenCalledWith(data);
    expect(errorCallback).not.toHaveBeenCalled();
  });


  it('returns http requests with an error and rejects the promise', function () {
    $httpBackend.expectPOST(expectedUrl).respond(500, 'Oh no!!');
    promise = $scope.getLanguagesList();
    promise.then(successCallback, errorCallback);

    $httpBackend.flush();

    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
  });

});

























