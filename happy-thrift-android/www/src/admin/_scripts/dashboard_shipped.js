"use strict";

(function () {
    const Shipped = function () {
        return new Shipped.init();
    }
    Shipped.init = function () {
        $D.init.call(this);

    }
    Shipped.prototype = {
        GetShipped: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'Shipped', 
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
                    '</div>';
                    $('#divContainer').append(html);
                    html = "";
                })
            }, 300)
        },
    }
    Shipped.init.prototype = $.extend(Shipped.prototype, $D.init.prototype);
    Shipped.init.prototype = Shipped.prototype;

    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + window.name);
    });

    $(document).ready(function () {
        var prototype = Shipped()
        prototype.GetShipped()
    });
})();
