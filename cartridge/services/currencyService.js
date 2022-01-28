var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

var currencyAPIService = LocalServiceRegistry.createService(
    "app_custom_neeraj.Currency.Service", 
    {
        createRequest: function (svc, params) {
            svc.setRequestMethod("GET");
            svc.addHeader("Accept", "application/json");
            return params;
        },
        parseResponse: function (svc, httpClient) {
            var result;

            try {
                result = JSON.parse(httpClient.text);
            } catch (e) {
                result = httpClient.text;
            }
            return result;
        },
    })

module.exports = {currencyAPIService: currencyAPIService}