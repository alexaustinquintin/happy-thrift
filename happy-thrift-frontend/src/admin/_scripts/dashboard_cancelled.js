"use strict";

(function () {
    const Cancelled = function () {
        return new Cancelled.init();
    }
    Cancelled.init = function () {
        $D.init.call(this);

    }
    Cancelled.prototype = {
        GetCancelled: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'Cancelled', 
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
    Cancelled.init.prototype = $.extend(Cancelled.prototype, $D.init.prototype);
    Cancelled.init.prototype = Cancelled.prototype;

    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + window.name);
    });

    $(document).ready(function () {
        var prototype = Cancelled()
        prototype.GetCancelled()
    });
})();
