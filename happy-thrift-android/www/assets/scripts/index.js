"use strict";

(function () {
    const Index = function () {
        return new Index.init();
    }
    Index.init = function () {
        $D.init.call(this);
    }
    Index.prototype = {
        SignUp: function (path) {
            var self = this;
            self.SendAJAXDataAuth('POST', 
            'auth/register', 
            { email: $('#email').val(), 
                full_name: $('#full_name').val(),
                password: $('#password').val(),
                shipping_address: "",
            },
            './user/index.html'
            ).then(function (isSuccess) {
                isSuccess == true ? window.location.href = path : alert(self.error)
            })

        },
    }
    Index.init.prototype = $.extend(Index.prototype, $D.init.prototype);
    Index.init.prototype = Index.prototype;

    $(document).ready(function () {
        var prototype = Index()
        $('#btnCreateAccount').on('click', function () {
            prototype.SignUp('./user/index.html')
        })
    });
})();
