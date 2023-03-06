"use strict";

(function () {
    const Index = function () {
        return new Index.init();
    }
    Index.init = function () {
        $D.init.call(this);
    }
    Index.prototype = {
    }
    Index.init.prototype = $.extend(Index.prototype, $D.init.prototype);
    Index.init.prototype = Index.prototype;

    $(document).ready(function () {
        var prototype = Index()
        $('#btnCreateAccount').on('click', function () {
            prototype.SendAJAXDataWithRedirect('POST', 
            'auth/register', 
            { email: $('#email').val(), 
                full_name: $('#full_name').val(),
                password: $('#password').val(),
                shipping_address: "",
            },
            './user/index.html'
            )
        })
    });
})();
