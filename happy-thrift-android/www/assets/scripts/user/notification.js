"use strict";

(function () {
    const Notification = function () {
        return new Notification.init();
    }
    Notification.init = function () {
        $D.init.call(this);

    }
    Notification.prototype = {
        GetNotification: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/notifications', 
            { }
            ).then(function (isSuccess) {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    // console.log(v)
                    html += 
                    '<div class="card p-5">' +
                        '<div class="card-body">' +
                            '<div class="container">' +
                                '<div class="row">' +
                                    '<div class="col-12">' +
                                        '<h1>' + v.title + '</h1>' +
                                        '<p>' + v.message + '</p>' +
                                        '<p>' + v.sent_at + '</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            })
        },
    }
    Notification.init.prototype = $.extend(Notification.prototype, $D.init.prototype);
    Notification.init.prototype = Notification.prototype;

    $(document).ready(function () {
        var prototype = Notification()
        prototype.GetNotification()
    });
})();
