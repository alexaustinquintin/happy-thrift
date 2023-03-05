"use strict";

(function () {
    const Cancelled = function () {
        return new Cancelled.init();
    }
    Cancelled.init = function () {
        $D.init.call(this);

    }
    Cancelled.prototype = {
        GetCancelled: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'admin/orders?status=cancelled', 
            { }
            ).then(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    html += 
                    '<div class="card p-5">' +
                        '<div class="card-body">' +
                            '<div class="container">' +
                                '<div class="row">' +
                                    '<div class="col-12">' +
                                        '<h1>' + v.amount + '</h1>' +
                                        '<h1>' + v.status + '</h1>' +
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
    Cancelled.init.prototype = $.extend(Cancelled.prototype, $D.init.prototype);
    Cancelled.init.prototype = Cancelled.prototype;

    $(document).ready(function () {
        var prototype = Cancelled()
        prototype.GetCancelled()
    });
})();
