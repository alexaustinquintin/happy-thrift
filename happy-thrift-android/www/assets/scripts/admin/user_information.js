"use strict";

(function () {
    const User = function () {
        return new User.init();
    }
    User.init = function () {
        $D.init.call(this);

    }
    User.prototype = {
        GetUser: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'admin/users', 
            { }
            ).then(function (isSuccess) {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    // console.log(v)
                    html += 
                    '<div class="row">' +
                        '<div class="col-9">' +
                            '<h1>' + v.email + '</h1>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" data-id="' + v.id + '" class="btnDeleteUser btn btn-lg btn-primary w-100">Delete</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            })
        },
        DeleteUser: function (id) {
            var self = this
            self.SendAJAXData('DELETE',
            'admin/users/' + id,
            { }
            ).then(function (isSuccess) {
                alert('User deleted.')
                self.GetUser()
            })
        },
    }
    User.init.prototype = $.extend(User.prototype, $D.init.prototype);
    User.init.prototype = User.prototype;

    $(document).ready(function () {
        var prototype = User()
        prototype.GetUser()
        $('#divContainer').on('click', '.btnDeleteUser', function () {
            prototype.DeleteUser($(this).attr('data-id'))
        })
    });
})();
