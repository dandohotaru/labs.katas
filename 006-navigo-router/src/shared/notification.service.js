var NotificationService = (function () {

    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "positionClass": "toast-bottom-right",
        "showDuration": "300",
        "hide Duration": "500",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var parse = function(content){
        var message = content instanceof Object 
            ? JSON.stringify(content)
            : typeof content === 'string'
                ? content
                : "n/a"
        return message;
    }

    var info = function (content) {
        var message = parse(content);
        toastr.info(message);
        console.debug(message);
    };

    var success = function (content) {
        var message = parse(content);
        toastr.success(message);
        console.log(message);
    };

    var warning = function (content) {
        var message = parse(content);
        toastr.warning(message);
        console.warn(message);
    };

    var error = function (content) {
        var message = parse(content);
        toastr.error(message);
        console.error(message);
    };

    return {
        info: info,
        success: success,
        warning: warning,
        error: error,
    }
});