kacheApp.directive("signupWizard", function (Lo) {
  var linkFunction = function(scope, element, attrs) 
  {
    var loginData = scope.signup;    
    scope.payments = false;

    $('#wizard_verticle').smartWizard({
      transitionEffect: 'fade',
      hideButtonsOnDisabled: true,
      enableAllSteps: false,
      keyNavigation: true,
      onFinish: onFinishCallback,
      onLeaveStep:leaveAStepCallback,
      onShowStep: showAStepCallback
    });

    function showAStepCallback(obj) {
      var step_num= obj.attr('rel');
      console.log("On show "+step_num);
      if(step_num == 4){
        $("#orgDisplay").html($("#organisationname").val());
        $("#branchDisplay").html($("#mainbranchname").val());
        $("#packageDisplay").html($(".package:checked").val());
        $("#nameDisplay").html($('#username').val());
        $("#emailDisplay").html($('#email').val());
        $(".password").val($('#password').val());
        scope.signup.package = $(".package:checked").val();
      }
      return true;
    }

    function leaveAStepCallback(obj){
      var step_num= obj.attr('rel');
      return validateSteps(step_num);
    }

    function onFinishCallback(){
     if(validateAllSteps()){
      scope.onFinishSteps(Lo.omit(loginData, "confirmPassword"));
    }
  }

  function validateAllSteps(){
   var isStepValid = true;

   if(validateStep1() == false){
     isStepValid = false;
     $('#wizard_vertical').smartWizard('setError',{stepnum:1,iserror:true});         
   }else{
     $('#wizard_vertical').smartWizard('setError',{stepnum:1,iserror:false});
   }

   if(validateStep3() == false){
     isStepValid = false;
     $('#wizard_vertical').smartWizard('setError',{stepnum:3,iserror:true});         
   }else{
     $('#wizard_vertical').smartWizard('setError',{stepnum:3,iserror:false});
   }

   if(!isStepValid){
    $('#wizard_vertical').smartWizard('showMessage','Please correct the errors in the steps and continue');
  }

  return isStepValid;
}   


function validateSteps(step){
  var isStepValid = true;
      // validate step 1
      if(step == 1){
        if(validateStep1() == false ){
          isStepValid = false; 
          $('#wizard_vertical').smartWizard('showMessage','Please correct the errors in step'+step+ ' and click next.');
          $('#wizard_vertical').smartWizard('setError',{stepnum:step,iserror:true});         
        }else{
          $('#wizard_vertical').smartWizard('setError',{stepnum:step,iserror:false});
        }
      }
      
      // validate step3
      if(step == 3){
        if(validateStep3() == false ){
          isStepValid = false; 
          $('#wizard_vertical').smartWizard('showMessage','Please correct the errors in step'+step+ ' and click next.');
          $('#wizard_vertical').smartWizard('setError',{stepnum:step,iserror:true});         
        }else{
          $('#wizard_vertical').smartWizard('setError',{stepnum:step,iserror:false});
        }
      }
      
      return isStepValid;
    }
    
    function validateStep1(){
     var isValid = true; 
       // Validate Username
       isValid = validateField('username', 'username');

         //validate email  email
         var email = $('#email').val();
         if(email && email.length > 0){
           if(!isValidEmailAddress(email)){
             isValid = false;
             $('#msg_email').html('Email is invalid').show();           
           }else{
            $('#msg_email').html('').hide();
          }
        }else{
         isValid = false;
         $('#msg_email').html('Please enter email').show();
       }
       
       // validate password
       var pw = $('#password').val();
       if(!pw && pw.length <= 0){
         isValid = false;
         $('#msg_password').html('Please fill password').show();         
       }else if(pw.length < 6){
         isValid = false;
         $('#msg_password').html('Password must be atleast 6 characters').show();         
       }else{
         $('#msg_password').html('').hide();
       }
       
       // validate confirm password
       var cpw = $('#cpassword').val();
       isValid = validateField('cpassword', 'confirm password'); 
       
       // validate password match
       if(pw && pw.length > 0 && cpw && cpw.length > 0){
         if(pw != cpw){
           isValid = false;
           $('#msg_cpassword').html('Password mismatch').show();            
         }else{
           $('#msg_cpassword').html('').hide();
         }
       }
       return isValid;
     }

     function validateStep3(){
      var isValid = true;  
      if(validateField('organisationname', 'organisation') == false){
        isValid = false;
      }
      if(validateField('mainbranchname', 'branch') == false){
        isValid = false;
      }
      return isValid;
     }

     function validateField(id, error){
      var isValid = true;  
      var un = $('#'+id).val();
       if(!un && un.length <= 0){
         isValid = false;
         $('#msg_'+id).html('Please fill '+error).show();
       }else{
         $('#msg_'+id).html('').hide();
       }
       return isValid;
     }

    // Email Validation
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      return pattern.test(emailAddress);
    }

    $('.buttonNext').addClass('btn btn-primary');
    $('.buttonPrevious').addClass('btn btn-default');
    $('.buttonFinish').addClass('btn btn-success');

    // iCheck
    $(document).ready(function() {
      if ($("input[type='radio']")[0]) {
        $(document).ready(function () {
          $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
          });
        });
      }
    });  

    scope.togglePayments = function(e){
      e.preventDefault();
      var value = extractPackageValue($(".package:checked").val()),
      suffix = value.indexOf("FREE") == -1 ? " Shs" : " for 30 days";
      if(!scope.payments){
        $('.amountPay').html(value+suffix);
        $('.amountToPay').val(value);
      }
      scope.payments = !scope.payments;
    }

    function extractPackageValue(package){
      var packageValue = package.split(' ')[1],
      btns = $('.make-payment-btns'),
      txt = $('.make-payment-text');
      if(packageValue.indexOf("FREE") != -1){
        btns.addClass('hide');
        txt.removeClass('hide');
      }else{
        btns.removeClass('hide');
        txt.addClass('hide');
      }
      return packageValue;
    }
}
  return {
    restrict: "E",
    templateUrl: "view/partials/authentication/signupWalkthrough.html",
    link: linkFunction
  };
});