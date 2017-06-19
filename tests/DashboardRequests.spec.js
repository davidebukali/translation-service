describe('Dashboard', function () {
  beforeEach(module('kache'));

  var $httpBackend,
  promise,
  successCallback,
  errorCallback,
  validationErrorCallback,
  validationSuccessCallback,
  httpController,
  $rootScope,
  createController,
  key = 'trnsl.1.1.20170618T002653Z.5444f9ae8504462a.a6b01b7cf1e0dad825b68caca80b542b5b2b8117',
  getLangUrl = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key='+key,
  translateTextUrl = 'https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-sw&text=How are you&key='+key,
  saveTextUrl = 'http://localhost/translationAPI/save.php',
  $Lo;

  beforeEach(inject(function ($injector, Lo) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    successCallback = jasmine.createSpy('SuccessTranslate');
    errorCallback = jasmine.createSpy('ErrorTranslate');

    validationSuccessCallback = jasmine.createSpy('ValidationSuccessTranslate');
    validationErrorCallback = jasmine.createSpy('ValidationErrorTranslate').and.callFake(function() {
      return 1001;
    });;
    $Lo = Lo;
    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('Dashboard', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Returns supported languages list and caches them to a factory', function () {
    var data = {
      "dirs":["az-ru","be-bg"],
      "langs":{
        "af": "Afrikaans",
        "am": "Amharic"
      }
    };
    $httpBackend.expectPOST(getLangUrl).respond(data);
    var httpController = createController();
    expect(httpController).toBeDefined();
    $httpBackend.flush();
    expect($Lo.size($rootScope.originLanguages)).toBeGreaterThan(0);
  });


  it('Translates text from one language to another', function (done) {
    var data = {"code":200,"lang":"en-sw","text":["kuwapiga"]};
    $httpBackend.expectPOST(translateTextUrl).respond(data);
    var httpController = createController();
    $rootScope.selectedOriginValue = 'en';
    $rootScope.selectedTranslatedValue = 'sw';
    $rootScope.textToBeTranslated = 'How are you';
    promise = $rootScope.translate();
    promise.then(successCallback, errorCallback);

    $httpBackend.flush();

    expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
    expect(errorCallback).not.toHaveBeenCalled();

    $rootScope.$digest();
    done();
  });

  it('Require characters in the textarea before making a request', function (done) {
    var httpController = createController();
    $rootScope.selectedOriginValue = 'en';
    $rootScope.selectedTranslatedValue = 'sw';
    $rootScope.textToBeTranslated = "";

    promise = $rootScope.translate();
    promise.catch(null, validationErrorCallback);
    
    expect($rootScope.textToBeTranslated).toBeFalsy();

    $rootScope.$digest();
    done();
  });

  it('Saves translations to MYSQL database', function () {
    var data = {"success":1,"message":"Saved"};
    $httpBackend.expectPOST(saveTextUrl).respond(data);
    var httpController = createController();
    $rootScope.selectedOriginValue = 'en';
    $rootScope.selectedTranslatedValue = 'sw';
    $rootScope.textToBeTranslated = 'How are you';
    promise = $rootScope.saveToServer('jinsi ni wewe');
    promise.then(successCallback, errorCallback);

    $httpBackend.flush();

    expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
    expect(errorCallback).not.toHaveBeenCalled();
  });

});