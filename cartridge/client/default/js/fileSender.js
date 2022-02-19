$("#btnSend").on('click', function(){
    var tempData = $('#emailInput')
    sendFile(tempData);
});
async function sendFile(el){
    var data = el.data();
    var files = el.prop('files');
    var formData = await toBase64(files[0]);
    formData += ',' + files[0].name;

    $.ajax({
        type: 'POST',
        url: data.url,
        success: function(res){
            console.log(res);
        },
        error: function(err){
            console.log(err);
        },
        async: true,
        data: formData.toString(),
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    })
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});