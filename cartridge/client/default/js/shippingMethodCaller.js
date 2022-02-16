$("#shippingZipCodedefault").on('change', function() {
    var url = $("#url-to-controller-custom-anchor").data().url;
    url += "?zip=" + $(this).val();
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            console.log(res);
            if(res.error){
                showError($(this), "Invalid ZipCode")
            }
            else{
                var methodID = res.order.shipping[0].selectedShippingMethod.ID;
                var shippingUUID = res.order.shipping[0].UUID;
                var inputID = "#shippingMethod-" + methodID + "-" + shippingUUID;
                console.log(inputID);
                $(inputID).prop("checked", true);
                
                $('.shipping-total-cost').html(res.order.totals.totalShippingCost)
                $('.tax-total').html(res.order.totals.totalTax)
                $('.grand-total-sum').html(res.order.totals.grandTotal)

                $('.custom-shipping-method-ns').html(res.order.shipping[0].selectedShippingMethod.displayName + ' --- ' + res.order.totals.totalShippingCost)

            }
        },
        error: function (err) {
            console.log(err);
            showError($(this), err);
        }
    })
});

function showError(el, err){
    el.addClass("is-invalid");
    el.siblings('div').text(err);
}