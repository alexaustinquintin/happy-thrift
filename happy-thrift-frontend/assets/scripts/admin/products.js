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
            ).then(function (isSuccess) {
                var html = ''
                $('#divContainer').empty();
                $.each(self.response, function (i, v) {
                    // console.log(v)
                    html += 
                    '<div class="row">' +
                        '<div class="col-6">' +
                            '<h1>' + v.name + '</h1>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" data-id="' + v.id + '" class="btnEditProduct btn btn-lg btn-primary w-100" data-bs-toggle="modal" data-bs-target="#modal">Edit</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" data-id="' + v.id + '" class="btnDeleteProduct btn btn-lg btn-primary w-100">Delete</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            })
        },
        SaveProduct: function () {
            var self = this
            self.SendAJAXData('POST',
            'admin/products',
            { 
                name: $('#name').val(),
                price: $('#price').val(),
                category_id: $('#category_id').val(),
                size: $('#size').val(),
                quantity: $('#quantity').val(),
                image_url: $('#image_url').val(),
                variations: []
            }
            ).then(function (isSuccess) {
                alert('Product added.')
                self.ClearRefreshForm()
            })
        },
        UpdateProduct: function (id) {
            var self = this
            self.SendAJAXData('PUT',
            'admin/products/' + id,
            { 
                name: $('#name').val(),
                price: +$('#price').val(),
                category_id: +$('#category_id').val(),
                size: $('#size').val(),
                quantity: +$('#quantity').val(),
                image_url: $('#image_url').val(),
                variations: ['test']
            }
            ).then(function (isSuccess) {
                alert('Product updated.')
                self.ClearRefreshForm()
            })
        },
        DeleteProduct: function (id) {
            var self = this
            self.SendAJAXData('DELETE',
            'admin/products/' + id,
            { }
            ).then(function (isSuccess) {
                alert('Product deleted.')
                self.ClearRefreshForm()
            })
        },
        ClearRefreshForm: function () {
            var self = this
            $('.btn-close').click()
            $('#id').val(0)
            $('#name, #price, #category_id, #size, #quantity, #image_url').val("")
            self.GetProducts()
        },

        GetCategories: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'categories', 
            { }
            ).then(function (isSuccess) {
                var html = ''
                $.each(self.response, function (i, v) {
                    // console.log(v)
                    html += 
                    '<option value="' + v.id + '">' + v.name + '</option>';
                    $('#category_id').append(html);
                    html = "";
                })
            })
        },
    }
    Products.init.prototype = $.extend(Products.prototype, $D.init.prototype);
    Products.init.prototype = Products.prototype;

    $(document).ready(function () {
        var prototype = Products()
        prototype.GetProducts()
        prototype.GetCategories()
        $('#divContainer').on('click', '.btnEditProduct', function () {
            $('#id').val($(this).attr('data-id'))
        })
        
        $('#btnSaveProduct').on('click', function () {
            var id = $('#id').val() 
            id == 0 ? prototype.SaveProduct() : prototype.UpdateProduct(id)
        })
        $('#divContainer').on('click', '.btnDeleteProduct', function () {
            prototype.DeleteProduct($(this).attr('data-id'))
        })
    });
})();
