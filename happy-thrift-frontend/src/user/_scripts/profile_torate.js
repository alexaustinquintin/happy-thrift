"use strict";

(function () {
    const ToRate = function () {
        return new ToRate.init();
    }
    ToRate.init = function () {
        $D.init.call(this);

    }
    ToRate.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.ToRate()
            })
        },
        ToRate: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/orders', 
            { }
            ).then(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    if (v.status == 'sold') {
                        html += 
                            '<div class="col-8">' +
                                '<div class="container-image">' +
                                    '<img src="../../assets/images/test.jpg" style="width:100%;">' +
                                    '<div class="bottom-left">' + v.product_info.name + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-4">' +
                                // '<input type="hidden" data-prod-id="' + v.product_info.id + '" data-qty="' + v.amount + '"/>'
                                '<p>' + v.product_info.name + ' | ' + v.product_info.size + '</p>' +
                                '<p>Price: ' + v.product_info.price + '</p>' +
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
    ToRate.init.prototype = $.extend(ToRate.prototype, $D.init.prototype);
    ToRate.init.prototype = ToRate.prototype;

    $(document).ready(function () {
        var prototype = ToRate()
        prototype.GetUserInfo()
    });
})();
