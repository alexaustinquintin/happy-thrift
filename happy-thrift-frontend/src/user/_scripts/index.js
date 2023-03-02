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
            )
            setTimeout(function () {
                self.id = self.response.id
            }, 500)
        },
        GetProducts: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'products', 
            { }
            )
            setTimeout(function () {                
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    console.log(v)
                    html += 
                    '<div class="col-6">' +
                        '<div class="container-image">' +
                            '<img class="imgAddToCart" id="' + v.id + '" src="../../assets/images/test.jpg" style="width:100%;">' +
                            '<div class="bottom-left">' + v.name + '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            }, 1000)
        },
    }
    Index.init.prototype = $.extend(Index.prototype, $D.init.prototype);
    Index.init.prototype = Index.prototype;

    $(document).ready(function () {
        var prototype = Index()
        prototype.GetUserInfo()
        setTimeout(function () {
            prototype.GetProducts()
        }, 500)

        $('#divContainer').on('click', '.imgAddToCart', function () {
            prototype.SendAJAXData('GET', 
            'account/cart/' + this.id, 
            { }
            )
            alert('Added to cart.')
        })
    });
})();
