var socket = io.connect('https://qfdk2010.cozycloud.cc:9252');

$('#download').click(function() {
    $.get("/download?url="+$("#url").val());
});

socket.on('data', function (data) {
    var res = JSON.parse(data);
    console.log(res);
});
