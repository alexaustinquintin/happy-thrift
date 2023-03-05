"use strict";

(function () {
    const Shipped = function () {
        return new Shipped.init();
    }
    Shipped.init = function () {
        $D.init.call(this);

    }
    Shipped.prototype = {
        GetShipped: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'admin/orders?status=shipping', 
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
    Shipped.init.prototype = $.extend(Shipped.prototype, $D.init.prototype);
    Shipped.init.prototype = Shipped.prototype;

    $(document).ready(function () {
        var prototype = Shipped()
        prototype.GetShipped()
    });
})();
