"use strict";

(function () {
    const Login = function () {
        return new Login.init();
    }
    Login.init = function () {
        $D.init.call(this);
    }
    Login.prototype = {
    }
    Login.init.prototype = $.extend(Login.prototype, $D.init.prototype);
    Login.init.prototype = Login.prototype;

    $(document).ready(function () {
        var prototype = Login()
        $('#btnLoginUser').on('click', function () {
            prototype.SendAJAXDataWithRedirect('POST', 
            'auth/login', 
            { email: $('#email').val(), 
                password: $('#password').val(),
            },
            './user/index.html'
            )
        })
        $('#btnLoginAdmin').on('click', function () {
            prototype.SendAJAXDataWithRedirect('POST', 
            'auth/login', 
            { email: $('#email').val(), 
                password: $('#password').val(),
            },
            './admin/index.html'
            )
        })
    });
})();
