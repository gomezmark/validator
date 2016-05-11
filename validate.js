
/*
 * validate.js 2.0.1
 * Copyright (c) 2016 Mark Gomez
 * validate.js is open source
 */


(function($) {
	$.validate = function(command, control, message, param_control) {

		var plugin 			= this,
			$body 			= $("body"),
			parent 			= null,
			param_parent	= null,
			list 			= ["requiredfield","validateemail","validatepassword"]
			defaultoptions 	= {
				container 		: null
				,general	    : null
				,required 		: "Required Field"
				,alphanumeric	: "Numeric only"
				,email 			: "Invalid Email"
				,password 		: "Password did not match"
				,confirm 		: "Password did not match"
			};

		var container 			= $(document.createElement("div")).addClass("mgvalidator"),
		 	param_container 	= $(document.createElement("div")).addClass("mgvalidator"),
			span 			= $(document.createElement("span")).addClass("mgvalidator-text"),
			param_span 		= $(document.createElement("span")).addClass("mgvalidator-text"),
			success 		= "<i class='fa fa-check fa-success'></i>",
			error 			= "<i class='fa fa-times fa-error'></i>";

		plugin.init = function(command, control, param_control) {
			parent = control.parent();

			if($.inArray(command,list)!==-1) {
				if(typeof param_control !== "undefined" && param_control != null) {
					sub_parent = param_control.parent();
					if(sub_parent.get(0).className=="mgvalidator") {
						sub_parent = sub_parent.parent();
						sub_parent.empty();
					}
					else {
						sub_parent.empty();
					}
				}

				if(typeof message !== "undefined" && message !== null) {
					defaultoptions.general = message;
				}

				control.removeClass("mg-error")
					   .removeClass("mg-success");

				if(parent.get(0).className=="mgvalidator") {
					parent = parent.parent();
					parent.empty();
				}
				else {
					parent.empty();
				}
			}
			switch(String(command).toLowerCase()) {
				case "requiredfield":
					plugin.requiredField(control);
				break;
				case "validateemail":
					plugin.validateEmail(control);
				break;
				case "validatepassword":
					plugin.validatePassword(control,param_control);
				break;
			}

			plugin.initEvents(control.selector, param_control);
		}

		plugin.requiredField = function(control) {
			var value 	= control.val(),
				pattern = new RegExp(/([^\s])/);

			if(pattern.test(value.trim())) {
				plugin.success();
			}
			else {
				plugin.error();
				parent.append(span.text((defaultoptions.general != null) ? defaultoptions.general : defaultoptions.required));
			}
		}
		plugin.validateEmail = function(control) {
			var value 	= control.val(),
				pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			if(pattern.test(value.trim())) {
				plugin.success();
			}
			else {
				plugin.error();
				parent.append(span.text((defaultoptions.general != null) ? defaultoptions.general : defaultoptions.email));
			}
		}

		plugin.validatePassword = function(control, param_control) {
			var pass = control.val(),
				confirm = param_control.val();

			if(pass === confirm && pass.length != 0 && confirm.length != 0) {
				plugin.success();
			}
			else {
				plugin.error();
				parent.append(span.text((defaultoptions.general != null) ? defaultoptions.general : defaultoptions.password));
			}
		}

		plugin.success = function() {
			container.append(control.addClass("mg-success"))
						 .append(success);
			parent.find(control.selector).remove();
			parent.append(container)
				  .addClass('mg-override-border');

			if(typeof param_control !== "undefined") {
				param_container.append(param_control.addClass("mg-succss"))
							   .append(success);
				sub_parent.find(param_control.selector).remove();
				sub_parent.append(param_container)
						  .addClass('mg-override-border');
			}
		}
		plugin.error = function() {
			container.append(control.addClass("mg-error"))
					 .append(error);

			parent.find(control.selector).remove();
			parent.append(container);
			parent.addClass('mg-override-border');

			if(typeof param_control !== "undefined") {
				param_container.append(param_control.addClass("mg-error"))
							   .append(error);

				sub_parent.find(param_control.selector).remove();
				sub_parent.append(param_container);
				sub_parent.addClass('mg-override-border');
			}

		}
		plugin.initEvents = function(selector, param_selector) {
			parent.find(selector).on('focus',function(){
				parent.find('.fa-success, .fa-error').remove();
				parent.find(span).remove();
				parent.removeClass('mg-override-border');
				$(selector).removeClass('mg-error mg-success');
					if(typeof param_selector !== "undefined") {
						sub_parent.find('.fa-success, .fa-error').remove();
						sub_parent.find(span).remove();
						sub_parent.removeClass('mg-override-border');
						$(param_selector).removeClass('mg-error mg-success');
					}
			});

			if(typeof param_selector !== "undefined") {
				sub_parent.find(param_selector).on('focus',function(){
					sub_parent.find('.fa-success, .fa-error').remove();
					sub_parent.find(span).remove();
					sub_parent.removeClass('mg-override-border');
					$(param_selector).removeClass('mg-error mg-success');
				});
			}
 		}

		plugin.init(command, control, param_control);
	}

	$.fn.validate = function(command,message,param_control) {
		param_control = (typeof param_control !== "undefined") ? $(param_control) : undefined;

		return  new $.validate(command, this, message, param_control);
	};
}(jQuery));