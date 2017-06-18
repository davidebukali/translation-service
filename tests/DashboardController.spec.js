describe('Dashboard', function() {
  var $controller, $httpBackend;

  beforeEach(module('kache'));

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  var $scope = {};
  beforeEach(function(){
    var controller = $controller('Dashboard', {$scope: $scope
    });
  });

  describe('$scope.translate', function() {
    it('returns translation', function(){
      var result = $scope.translate();
      expect(result).toEqual('Translating');
    });
  });

});