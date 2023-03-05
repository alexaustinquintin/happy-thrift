"use strict";

(function () {
    const Checkout = function () {
        return new Checkout.init();
    }
    Checkout.init = function () {
        $D.init.call(this);

    }
    Checkout.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.GetCheckout()
            })
        },
        GetCheckout: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/cart', 
            { }
            ).then(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    // if (v.user_id != self.id) {
                        
                    // }
                    // else {
                        html += 
                            '<div class="col-8">' +
                                '<div class="container-image">' +
                                    '<img src="../../assets/images/test.jpg" style="width:100%;">' +
                                    '<div class="bottom-left">' + v.item.name + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-4">' +
                                '<p>' + v.item.name + ' | ' + v.item.size + '</p>' +
                                '<p>Price: ' + v.item.price + '</p>' +
                                '<p>Qty: ' + v.amount + '</p>' +
                                // '<input type="hidden" data-prod-id="' + v.item.id + '" data-qty="' + v.amount + '"/>'
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
                    // }
                })
            })    
        },
        PlaceOrder: function (product_id, amount) {
            var self = this;
            this.SendAJAXData('POST', 
            'orders/place/' + product_id, 
            { 
                product_id: product_id,
                amount: amount,
                variation: ""
            }
            ).then(function () {
            })
        },
    }
    Checkout.init.prototype = $.extend(Checkout.prototype, $D.init.prototype);
    Checkout.init.prototype = Checkout.prototype;

    $(document).ready(function () {
        var prototype = Checkout()
        prototype.GetUserInfo()

        $('#btnCheckout').on('click', function () {
            $('input[type=hidden]').each(function (i, v) {
                var product_id = $(v).attr('data-prod-id'),
                    amount = $(v).attr('data-qty')
                prototype.PlaceOrder(product_id, amount)
            })
            setTimeout(function () {
                alert('Order checked out.')
                window.location.href = './checkout_cancel.html'
            }, 300)
        })
    });
})();
