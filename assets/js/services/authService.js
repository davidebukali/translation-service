kacheApp.service("auth", function( 
		httpService, 
		databaseService,
		profileFactory
		){
  // Return public API.
  return({
    login: login,
    signup: signup,
    checkEmailAvailability: checkEmailAvailability
  });
  
  function login(user, pass) {
    var d = $.Deferred();
    var link = 'http://imagevibez.com/church/login.php';
    console.log('user '+user+" pass "+pass);
    if(user && pass){
      var content = {'txtemail' : user, 'txtupass': pass};
      httpService.post(link, content).then(function(data){
        var data = data.data;
        if(data.message.indexOf('Login sucessfull') != -1){
          d.resolve(data['userDetails']);
          console.log("Logged in as "+JSON.stringify(data));
          databaseService.insert('users', data['userDetails']).then(function(){
          });
        }else {
          d.reject(data.message);
        }
      }, function(errorPayload){
        d.reject(errorPayload);
      });
      
    }else{
     d.reject('Please fill in Email and password');
    }
    return d;
  }
  
  function signup(user, pass, email, profilepic){
    var d = $.Deferred();
    var link = 'http://imagevibez.com/church/signup.php';
    if(user.length > 0 && pass.length > 0 && email.length > 0){
      var postData = {
          "thumb": "thumb", 
          'txtuname': user, 
          'txtemail' : email, 
          'txtpass': pass, 
          'imageName': profilepic
      };
      if(profilepic.length > 0){
        httpService.postTextAndImage(link, postData, function(data){
          d.resolve(data);
        }, function(error){
          d.reject(error);
        });  
      }else{
        httpService.postText(link, postData, function(data){
          d.resolve(data);
        }, function(error){
          d.reject(error);
        });
      }
    }else{
      d.reject('Please fill in all fields');
    }
    return d;
  }
  
  function checkEmailAvailability(email){
    var d = $.Deferred();
    var link = 'http://imagevibez.com/church/signup.php';
    var content = {'txtemail' : email};
    if(email.length > 0){
      httpService.postText(link, content, function(data){
        d.resolve(data);
      }, function(errorPayload){
        d.reject(errorPayload);
      });
    }else{
      d.reject('Please enter your email');
    }
    return d;
  }

});