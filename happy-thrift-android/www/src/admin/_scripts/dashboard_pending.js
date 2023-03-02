"use strict";

(function () {
    const Pending = function () {
        return new Pending.init();
    }
    Pending.init = function () {
        $D.init.call(this);

    }
    Pending.prototype = {
        GetPending: function () {
            var self = this;
            this.SendAJAXData('GET', 
            'Pending', 
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
    Pending.init.prototype = $.extend(Pending.prototype, $D.init.prototype);
    Pending.init.prototype = Pending.prototype;

    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + window.name);
    });

    $(document).ready(function () {
        var prototype = Pending()
        prototype.GetPending()
    });
})();
