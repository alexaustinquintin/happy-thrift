"use strict";

(function () {
    const Index = function () {
        return new Index.init();
    }
    Index.init = function () {
        $D.init.call(this);

    }
    Index.prototype = {
        GetUserInfo: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'account/me', 
            { }
            ).then(function () {
                // console.log(self.response)
                self.id = self.response.id
                self.GetProducts()
            })
        },
        GetProducts: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'products', 
            { }
            ).then(function () {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    html += 
                        '<div class="col-8">' +
                            '<div class="container-image">' +
                                '<img src="../../assets/images/test.jpg" style="width:100%;">' +
                                '<div class="bottom-left">' + v.name + '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-4">' +
                            '<br>' +
                            '<p>' + v.name + ' | ' + v.size + '</p>' +
                            '<p>Price: ' + v.price + '</p>' +
                            '<div class="input-group mb-3">' +
                                '<button type="button" class="btn btn-lg btn-primary-border w-100 btnAddToCart" value="' + v.id + '">Add to cart</button>' +
                            '</div>' +
                        '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            })
        },
    }
    Index.init.prototype = $.extend(Index.prototype, $D.init.prototype);
    Index.init.prototype = Index.prototype;

    $(document).ready(function () {
        var prototype = Index()
        prototype.GetUserInfo()

        $('#divContainer').on('click', '.btnAddToCart', function () {
            prototype.SendAJAXData('POST', 
            'account/cart/' + this.value, 
            "1"
            ).then(function (isSuccess) {                
                isSuccess == true ? alert('Added to cart.') : alert(self.error)
            })
            
        })
    });
})();
