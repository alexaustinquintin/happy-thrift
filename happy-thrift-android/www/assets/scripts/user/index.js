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
                    '<div class="col-6">' +
                        '<div class="container-image">' +
                            // '<img class="imgAddToCart" id="' + v.id + '" src="' + v.image_url + '" style="width:100%;">' +
                            '<img class="imgAddToCart" id="' + v.id + '" src="../../assets/images/test.jpg" style="width:100%;">' +
                            '<div class="bottom-left">' + v.name + '</div>' +
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

        $('#divContainer').on('click', '.imgAddToCart', function () {
            prototype.SendAJAXData('POST', 
            'account/cart/' + this.id, 
            "1"
            )
            alert('Added to cart.')
        })
    });
})();
