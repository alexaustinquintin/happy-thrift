"use strict";

(function () {
    const Password = function () {
        return new Password.init();
    }
    Password.init = function () {
        $D.init.call(this);

    }
    Password.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id

                // self.full_name = self.response.full_name
                // $('#Name').val(self.full_name)

                self.email = self.response.email
                $('#Email').val(self.email)
            })
        },
        UpdatePassword: function () {
            var self = this;
            this.SendAJAXData('PUT', 
            'account/updatepassword', 
            { 
                old_password: $('#OldPassword').val(),
                new_password: $('#NewPassword').val(),
                repeat_new_password: $('#RepeatNewPassword').val(),
            }
            ).then(function (isSuccess) {
                // console.log(self.response)
                isSuccess == true ? alert('Password updated.') : alert(self.error)
            })
        }
    }
    Password.init.prototype = $.extend(Password.prototype, $D.init.prototype);
    Password.init.prototype = Password.prototype;

    $(document).ready(function () {
        var prototype = Password()
        prototype.GetUserInfo()

        $('#btnUpdatePassword').on('click', function () {
            prototype.UpdatePassword()
        })
    });
})();
