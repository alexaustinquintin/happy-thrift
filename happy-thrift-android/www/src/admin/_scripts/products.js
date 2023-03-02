"use strict";

(function () {
    const Products = function () {
        return new Products.init();
    }
    Products.init = function () {
        $D.init.call(this);

    }
    Products.prototype = {
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
                    '<div class="row">' +
                        '<div class="col-6">' +
                            '<h1>' + v.name + '</h1>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" id="btnEditProduct" class="btn btn-lg btn-primary w-100">Edit Product</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" id="btnDeleteProduct" class="btn btn-lg btn-primary w-100">Delete Product</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            }, 1000)
        },
        SaveProduct: function () {
            var self = this
            self.SendAJAXData('POST',
            'admin/products',
            { name: $('#name').val() }
            )

            alert('Product added.'),
            self.GetProducts()
        }
    }
    Products.init.prototype = $.extend(Products.prototype, $D.init.prototype);
    Products.init.prototype = Products.prototype;

    $(document).ready(function () {
        var prototype = Products()
        prototype.GetProducts()
        $('#btnSaveCategory').on('click', function () {
            prototype.SaveProduct()
        })
    });
})();
