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
                                '<button type="button" id="btnEditCategory" class="btn btn-lg btn-primary w-100">Edit Category</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col-3">' +
                            '<div class="form-group p-2">' +
                                '<button type="button" id="btnDeleteCategory" class="btn btn-lg btn-primary w-100">Delete Category</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            }, 1000)
        },
        SaveCategory: function () {
            var self = this
            self.SendAJAXData('POST',
            'admin/categories',
            { name: $('#name').val() }
            )

            alert('Category added.'),
            self.GetCategories()
        }
    }
    Categories.init.prototype = $.extend(Categories.prototype, $D.init.prototype);
    Categories.init.prototype = Categories.prototype;

    $(document).ready(function () {
        var prototype = Categories()
        prototype.GetCategories()
        $('#btnSaveCategory').on('click', function () {
            prototype.SaveCategory()
        })
    });
})();
