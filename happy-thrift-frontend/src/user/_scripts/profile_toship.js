"use strict";

(function () {
    const ToShip = function () {
        return new ToShip.init();
    }
    ToShip.init = function () {
        $D.init.call(this);

    }
    ToShip.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.ToShip()
            })
        },
        ToShip: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/orders', 
            { }
            ).then(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    if (v.status == 'pending') {
                        html += 
                            '<div class="col-8">' +
                                '<div class="container-image">' +
                                    '<img src="../../assets/images/test.jpg" style="width:100%;">' +
                                    // '<div class="bottom-left">' + v.item.name + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-4">' +
                                // '<input type="hidden" data-prod-id="' + v.item.id + '" data-qty="' + v.amount + '"/>'
                                // '<p>' + v.item.name + ' | ' + v.item.size + '</p>' +
                                // '<p>Price: ' + v.item.price + '</p>' +
                                '<p>Qty: ' + v.amount + '</p>' +
                                // '<div class="input-group mb-3">' +
                                    // '<div class="input-group-prepend">' +
                                    //     '<span class="input-group-text"><button class="btn form-control btnDecreaseCart" type="button" value="' + v.item.id + '"><i class="fa fa fa-minus"></i></button></span>' +
                                    // '</div>' +
                                    // '<input type="text" disabled class="form-control form-control" placeholder="Qty" data-prod-id="' + v.item.id + '" value="' + v.amount + '">' +
                                    // '<div class="input-group-append">' +
                                    //     '<span class="input-group-text"><button class="btn form-control btnIncreaseCart" type="button" value="' + v.item.id + '"><i class="fa fa fa-plus"></i></button></span>' +
                                    // '</div>' +
                                // '</div>' +
                            '</div>';
                        $('#divContainer').append(html);
                        html = "";
                    }
                })
            })    
        },
    }
    ToShip.init.prototype = $.extend(ToShip.prototype, $D.init.prototype);
    ToShip.init.prototype = ToShip.prototype;

    $(document).ready(function () {
        var prototype = ToShip()
        prototype.GetUserInfo()
    });
})();
