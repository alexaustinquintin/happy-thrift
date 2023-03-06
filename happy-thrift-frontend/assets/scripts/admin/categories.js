"use strict";

(function () {
    const Categories = function () {
        return new Categories.init();
    }
    Categories.init = function () {
        $D.init.call(this);

    }
    Categories.prototype = {
        GetCategories: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'categories', 
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
                                '<button type="button" data-id="' + v.id + '" class="btnEditCategory btn btn-lg btn-primary w-100" data-bs-toggle="modal" data-bs-target="#modal">Edit</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" data-id="' + v.id + '" class="btnDeleteCategory btn btn-lg btn-primary w-100">Delete</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            })
        },
        SaveCategory: function () {
            var self = this
            self.SendAJAXData('POST',
            'admin/categories',
            { name: $('#name').val() }
            ).then(function (isSuccess) {
                alert('Category added.')
                self.ClearRefreshForm()
            })
        },
        UpdateCategory: function (id) {
            var self = this
            self.SendAJAXData('PUT',
            'admin/categories/' + id,
            $('#name').val()
            ).then(function (isSuccess) {
                alert('Category updated.')
                self.ClearRefreshForm()
            })
        },
        DeleteCategory: function (id) {
            var self = this
            self.SendAJAXData('DELETE',
            'admin/categories/' + id,
            { }
            ).then(function (isSuccess) {
                alert('Category deleted.')
                self.ClearRefreshForm()
            })
        },
        ClearRefreshForm: function () {
            var self = this
            $('.btn-close').click()
            $('#id').val(0)
            $('#name').val("")
            self.GetCategories()
        }
    }
    Categories.init.prototype = $.extend(Categories.prototype, $D.init.prototype);
    Categories.init.prototype = Categories.prototype;

    $(document).ready(function () {
        var prototype = Categories()
        prototype.GetCategories()
        $('#divContainer').on('click', '.btnEditCategory', function () {
            $('#id').val($(this).attr('data-id'))
        })
        
        $('#btnSaveCategory').on('click', function () {
            var id = $('#id').val() 
            id == 0 ? prototype.SaveCategory() : prototype.UpdateCategory(id)
        })
        $('#divContainer').on('click', '.btnDeleteCategory', function () {
            prototype.DeleteCategory($(this).attr('data-id'))
        })
    });
})();
