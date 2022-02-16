$("#emailInput").on('change', function(){
    sendFile($(this));
    
    // console.log(files[0].name)
});

function sendFile(el){
    var data = el.data();
    var files = el.prop('files');
    var formData = new FormData();
    formData.append("file", files[0], files[0].name);
    formData.append("upload_file", true);
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: data.url + "?data=something",
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', el.progressHandling, false);
            }
            return myXhr;
        },
        success: function(res){
            console.log(res);
        },
        error: function(err){
            console.log(err);
        },
        async: true,
        data: "formData",
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    })
}

console.log("working");