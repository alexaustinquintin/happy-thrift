"use strict";

(function () {
    const Cart = function () {
        return new Cart.init();
    }
    Cart.init = function () {
        $D.init.call(this);

    }
    Cart.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.GetCart()
            })
        },
        GetCart: function () {
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
                                '<div class="input-group mb-3">' +
                                    '<div class="input-group-prepend">' +
                                        '<span class="input-group-text"><button class="btn form-control btnDecreaseCart" type="button" value="' + v.item.id + '"><i class="fa fa fa-minus"></i></button></span>' +
                                    '</div>' +
                                    '<input type="text" disabled class="form-control form-control" placeholder="Qty" data-prod-id="' + v.item.id + '" value="' + v.amount + '">' +
                                    '<div class="input-group-append">' +
                                        '<span class="input-group-text"><button class="btn form-control btnIncreaseCart" type="button" value="' + v.item.id + '"><i class="fa fa fa-plus"></i></button></span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="input-group mb-3">' +
                                    '<button type="button" class="btn btn-lg btn-primary-border w-100 btnRemoveCart" value="' + v.item.id + '">Remove from cart</button>' +
                                '</div>' +
                            '</div>';
                        $('#divContainer').append(html);
                        html = "";
                    // }
                })
            })    
        },
        CartFunctions: function (action, product_id) {
            var self = this;
            if (action == 'increase') {
                this.SendAJAXData('POST', 
                'account/cart/' + product_id, 
                "1"
                ).then(function () {
                    alert('Cart qty increased.')
                    self.GetCart()
                })
            }
            else if (action == 'decrease') {
                this.SendAJAXData('PUT', 
                'account/cart/' + product_id, 
                "1"
                ).then(function () {
                    alert('Cart qty decreased.')
                    self.GetCart()
                })
            }
            else if (action == 'remove') {
                this.SendAJAXData('DELETE', 
                'account/cart/' + product_id, 
                { }
                ).then(function () {
                    alert('Product removed from cart.')
                    self.GetCart()
                })

            }
        }
    }
    Cart.init.prototype = $.extend(Cart.prototype, $D.init.prototype);
    Cart.init.prototype = Cart.prototype;

    $(document).ready(function () {
        var prototype = Cart()
        prototype.GetUserInfo()

        $('#divContainer').on('click', '.btnDecreaseCart', function () {
            if ($('input[data-prod-id= '+ +this.value + ']').val() == 1) {
                alert('Cannot decrease cart further.')
            }
            else {
                prototype.CartFunctions('decrease', +this.value)
            }
        })

        $('#divContainer').on('click', '.btnIncreaseCart', function () {
            prototype.CartFunctions('increase', +this.value)
        })
        $('#divContainer').on('click', '.btnRemoveCart', function () {
            prototype.CartFunctions('remove', +this.value)
        })
    });
})();
