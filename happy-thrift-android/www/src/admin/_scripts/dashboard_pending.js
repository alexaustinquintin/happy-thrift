"use strict";

(function () {
    const Pending = function () {
        return new Pending.init();
    }
    Pending.init = function () {
        $D.init.call(this);

    }
    Pending.prototype = {
        GetPending: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'admin/orders?status=pending', 
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
        }
    }
    Pending.init.prototype = $.extend(Pending.prototype, $D.init.prototype);
    Pending.init.prototype = Pending.prototype;

    $(document).ready(function () {
        var prototype = Pending()
        prototype.GetPending()
    });
})();
