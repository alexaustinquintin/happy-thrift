"use strict";

(function () {
    const Security = function () {
        return new Security.init();
    }
    Security.init = function () {
        $D.init.call(this);

    }
    Security.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id

                self.full_name = self.response.full_name
                $('#Name').val(self.full_name)

                self.email = self.response.email
                $('#Email').val(self.email)
            })
        },
        UpdateSecurity: function () {
            var self = this;
            this.SendAJAXData('PUT', 
            'account/updateinfo', 
            { 
                email: $('#Email').val(),
                full_name: $('#Name').val(),
                shipping_address: ""
            }
            ).then(function (isSuccess) {
                // console.log(self.response)
                isSuccess == true ? alert('Security updated.') : alert(self.error)
            })
        }
    }
    Security.init.prototype = $.extend(Security.prototype, $D.init.prototype);
    Security.init.prototype = Security.prototype;

    $(document).ready(function () {
        var prototype = Security()
        prototype.GetUserInfo()

        $('#btnUpdateSecurity').on('click', function () {
            prototype.UpdateSecurity()
        })
    });
})();
