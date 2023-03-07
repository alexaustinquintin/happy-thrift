"use strict";

(function () {
    const Address = function () {
        return new Address.init();
    }
    Address.init = function () {
        $D.init.call(this);

    }
    Address.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.address = self.response.shipping_address
                $('#CurrentAddress').val(self.address)
            })
        },
        UpdateAddress: function () {
            var self = this;
            this.SendAJAXData('PUT', 
            'account/updateinfo', 
            { 
                email: "",
                full_name: "",
                shipping_address: $('#CurrentAddress').val()
            }
            ).then(function (isSuccess) {
                // console.log(self.response)
                isSuccess == true ? alert('Address updated.') : alert(self.error)
            })
        }
    }
    Address.init.prototype = $.extend(Address.prototype, $D.init.prototype);
    Address.init.prototype = Address.prototype;

    $(document).ready(function () {
        var prototype = Address()
        prototype.GetUserInfo()

        $('#btnUpdateAddress').on('click', function () {
            prototype.UpdateAddress()
        })
    });
})();
