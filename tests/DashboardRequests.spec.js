describe('Dashboard', function () {
  beforeEach(module('kache'));

  var $httpBackend,
  expectedUrl = 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
  promise,
  successCallback,
  errorCallback,
  httpController,
  $scope;

  beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    //scope = $rootScope.$new();
    successCallback = jasmine.createSpy();
    errorCallback = jasmine.createSpy();
    $scope = {};
    httpController = $controller('Dashboard', {
      '$scope': $scope
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('returns http requests successfully and resolves the promise', function () {
    var data = {
      data: {
        "dirs":["az-ru","be-bg"],
        "langs":{"af":"Afrikaans","am":"Amharic"}
      }};
      expect(httpController).toBeDefined();
      $httpBackend.expectPOST(expectedUrl).respond(200, data);
      promise = $scope.getLanguagesList();
      promise.then(successCallback, errorCallback);

      expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
      expect(errorCallback).not.toHaveBeenCalled();
    });

});