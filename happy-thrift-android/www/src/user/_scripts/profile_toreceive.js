"use strict";

(function () {
    const ToReceive = function () {
        return new ToReceive.init();
    }
    ToReceive.init = function () {
        $D.init.call(this);

    }
    ToReceive.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            )
            setTimeout(function () {
                self.id = self.response.id
            }, 500)
        },
        GetToReceive: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'orders', 
            { }
            )
            setTimeout(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    html += 
                        '<div class="col-8">' +
                            '<div class="container-image">' +
                                '<img src="../../assets/images/test.jpg" style="width:100%;">' +
                                '<div class="bottom-left">Product</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-4">' +
                            '<p>Product Name</p>' +
                            '<p>Product Description</p>' +
                            '<div class="input-group mb-3">' +
                                '<div class="input-group-prepend">' +
                                    '<span class="input-group-text"><button class="btn form-control" type="button"><i class="fa fa fa-minus"></i></button></span>' +
                                '</div>' +
                                '<input type="text" class="form-control form-control" placeholder="Qty">' +
                                '<div class="input-group-append">' +
                                    '<span class="input-group-text"><button class="btn form-control" type="button"><i class="fa fa fa-plus"></i></button></span>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            }, 1000)
        },
    }
    ToReceive.init.prototype = $.extend(ToReceive.prototype, $D.init.prototype);
    ToReceive.init.prototype = ToReceive.prototype;

    $(document).ready(function () {
        var prototype = ToReceive()
        prototype.GetUserInfo()
        setTimeout(function () {
            prototype.GetToReceive()
        }, 500)
    });
})();
