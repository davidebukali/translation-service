kacheApp.service('mainWebsiteService', function() {

	var initContactMe = function initContactMe() {
		$("#contactForm input,#contactForm textarea").jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
            // additional error messages or events
            },
            submitSuccess: function($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $("input#name").val();
                var email = $("input#email").val();
                var phone = $("input#phone").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                	firstName = name.split(' ').slice(0, -1).join(' ');
                }
                // $.ajax({
                // 	url: "././mail/contact_me.php",
                // 	type: "POST",
                // 	data: {
                // 		name: name,
                // 		phone: phone,
                // 		email: email,
                // 		message: message
                // 	},
                // 	cache: false,
                // 	success: function() {
                //         // Success message
                //         $('#success').html("<div class='alert alert-success'>");
                //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //         $('#success > .alert-success')
                //         .append("<strong>Your message has been sent. </strong>");
                //         $('#success > .alert-success')
                //         .append('</div>');

                //         //clear all fields
                //         $('#contactForm').trigger("reset");
                //     },
                //     error: function() {
                //         // Fail message
                //         $('#success').html("<div class='alert alert-danger'>");
                //         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //         $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                //         $('#success > .alert-danger').append('</div>');
                //         //clear all fields
                //         $('#contactForm').trigger("reset");
                //     },
                // });
            },
            filter: function() {
            	return $(this).is(":visible");
            },
        });

		$("a[data-toggle=\"tab\"]").click(function(e) {
			e.preventDefault();
			$(this).tab("show");
		});

		/*When clicking on Full hide fail/success boxes */
		$('#name').focus(function() {
			$('#success').html('');
		});
	}

	var initMenusScrollAndAnimations = function initMenusScrollAndAnimations(){
		var method1 = "easeOutBounce", method2 = "easeInBounce";

        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });

        // Highlight the top nav as scrolling occurs
        $('body#home').scrollspy({
            target: '.navbar-fixed-top',
            offset: 51
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
        });

        // Offset for Main Navigation
        $('nav#mainNav').affix({
            offset: {
                top: 100
            }
        });

        /*$('a.accounts-class').bind('click', function(event) {
            var $anchor = $(this);
            $anchor.parent().siblings().removeClass('active');
            $anchor.addClass('active');
            event.preventDefault();
        });*/

        $('.navbar-nav').children().removeClass('active');

        function animateYellowArrow(){
          $('.my-angle-down')
          .animate({top:-10}, 500)
          .animate({top:0}, 500, animateYellowArrow);    
        }

        animateYellowArrow();
	}

	var init = function init(){
		initContactMe();
		initMenusScrollAndAnimations();
	}

	return({
		initWebsite: init
	});
});