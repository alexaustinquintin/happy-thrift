"use strict";

(function () {
    const Login = function () {
        return new Login.init();
    }
    Login.init = function () {
        $D.init.call(this);
    }
    Login.prototype = {
        Login: function (path) {
            var self = this;
            self.SendAJAXDataAuth('POST', 
            'auth/login', 
            { 
                email: $('#email').val(), 
                password: $('#password').val(),
            },
            './user/index.html'
            ).then(function (isSuccess) {
                isSuccess == true ? window.location.href = path : alert(self.error)
            })
        }
    }
    Login.init.prototype = $.extend(Login.prototype, $D.init.prototype);
    Login.init.prototype = Login.prototype;

    $(document).ready(function () {
        var prototype = Login()
        $('#btnLoginUser').on('click', function () {
            prototype.Login('./user/index.html')
        })
        $('#btnLoginAdmin').on('click', function () {
            prototype.Login('./admin/index.html')
        })
    });
})();
