$("#emailInput").on('change', function(){
    sendFile($(this));
    
    // console.log(files[0].name)
});

async function sendFile(el){
    var data = el.data();
    var files = el.prop('files');
    // var files = el[0];
    // var formData = new FormData();
    // formData.append("file", files[0], files[0].name);
    // formData.append("upload_file", true);
    var formData = await toBase64(files[0]);
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: data.url,
        // xhr: function () {
        //     var myXhr = $.ajaxSettings.xhr();
        //     if (myXhr.upload) {
        //         myXhr.upload.addEventListener('progress', el.progressHandling, false);
        //     }
        //     return myXhr;
        // },
        success: function(res){
            console.log(res);
        },
        error: function(err){
            console.log(err);
        },
        // async: true,
        data: formData.toString(),
        // cache: false,
        // contentType: false,
        // processData: false,
        // timeout: 60000
    })
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});