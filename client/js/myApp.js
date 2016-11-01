var socket = io.connect('https://localhost:9250');

$('#download').click(function() {
    $.get("/download?url="+$("#url").val());
});

socket.on('data', function (data) {
    var res = JSON.parse(data);
    console.log(res);
});