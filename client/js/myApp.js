var socket = io.connect('http://localhost:9250');

$('#download').click(function() {
    $.get("http://localhost:9250/download?url="+$("#url").val());
});

socket.on('data', function (data) {
    var res = JSON.parse(data);
    console.log(res);
});
