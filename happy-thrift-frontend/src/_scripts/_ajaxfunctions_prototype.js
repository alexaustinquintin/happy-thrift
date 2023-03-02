; (function () {
    const DataClass = function () {
        return new DataClass.init();
    }
    DataClass.init = function () {
        this.token = window.name
    }
    DataClass.prototype = {
        SendAJAXDataWithRedirect: function (type, url, dataJSON, href) {
            let self = this;
            let promiseObj = new Promise(function (resolve, reject) {
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json",
                    type: type,
                    url: 'http://127.0.0.1:10000/' + url,
                    data: JSON.stringify(
                        dataJSON
                    ),
                    success: function(data) {
                        window.name = data["Access-Token"]
                        window.location.href = href
                        resolve(true)
                    },
                    error: function(e) {
                        console.log(e.responseJSON.detail)
                        alert(e.responseJSON.detail)
                        resolve(false)
                    }
                })
            })
            return promiseObj
        },
        
        SendAJAXData: function (type, url, dataJSON) {
            let self = this;
            let promiseObj = new Promise(function (resolve, reject) {
                $.ajax({
                    dataType: 'json',
                    contentType: "application/json",
                    type: type,
                    url: 'http://127.0.0.1:10000/' + url,
                    headers: {
                        Authorization: 'Bearer '+ window.name
                    },
                    data: JSON.stringify(
                        dataJSON
                    ),
                    success: function(response) {
                        self.response = response
                        resolve(true)
                    },
                    error: function(e) {
                        console.log(e.responseJSON.detail)
                        alert(e.responseJSON.detail)
                        // window.location.href = "../login.html"
                        resolve(false)
                    }
                })
            })
            return promiseObj
        }
    }

    DataClass.init.prototype = DataClass.prototype;
    return window.DataClass = window.$D = DataClass;
}());
