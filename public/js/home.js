$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        message: 'This value is not valid',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            contactname: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'Name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: 'The Name can only consist of alphabetical characters'
                    },
                    stringLength: {
                        min: 3,
                        message: 'Name must be more than 3 characters '
                    }

                }

            },
            contactnumber: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'Phone number is required and cannot be empty'
                    },
                    regexp: {
                        regexp: '^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$',
                        message: 'Please enter a valid phone number'
                    }

                }
            },
            contactemail: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'Email is required and cannot be empty'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Please enter a valid mail id'
                    }

                }
            },
            contactmsg: {
                container: 'popover',
                validators: {
                    notEmpty: {
                        message: 'Message is required and cannot be empty'
                    },
                    stringLength: {
                        min: 25,
                        message: 'Message must be more than 25 characters '
                    }

                }
            }
        }
    }).on('success.form.bv', function(e) {

        e.preventDefault();
        e.stopPropagation();
        var data = {};
        data.name = $('.contactname').val();
        data.email = $('.contactemail').val();
        data.number = $('.contactnumber').val();
        data.msg=$('.contactmsg').val();
        $.ajax({
            url : "/contact/mail",
            type : "POST",
            dataType: "json",
            data : data,
            success : function(data) {
                console.log(data);
                if (data.flag) {
                    swal({
                        title: "Thanks for contacting us!",
                        text: "We will get back shortly",
                        icon: "success",
                        button: "OK",
                    });
                    $('.glyphicon-ok ').css({
                        "display": "none"
                    });
                    $('.contactname').val("");
                    $('.contactemail').val("");
                    $('.contactnumber').val("");
                    $('.contactmsg').val("");
                } else {
                    swal({
                        title: "Thanks for contacting us!",
                        text: "Seems like something went wrong. Please try again",
                        icon: "warning",
                        button: "OK",
                    });
                }
            },
            error : function() {
                swal("", "Something went wrong", "warning");
            }
        });

        return false;
    });
});