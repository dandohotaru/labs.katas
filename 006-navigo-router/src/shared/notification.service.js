var NotificationService = (function () {

    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "positionClass": "toast-bottom-right",
        "showDuration": "300",
        "hide Duration": "500",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var info = function (message) {
        toastr.info(message);
        console.debug(message);
    };

    var success = function (message) {
        toastr.success(message);
        console.log(message);
    };

    var warning = function (message) {
        toastr.warning(message);
        console.warn(message);
    };

    var error = function (message) {
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