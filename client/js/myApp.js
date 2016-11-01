var socket = io.connect('https://localhost:9252');

$('#download').click(function() {
    $.get("https://localhost:9252/download?url="+$("#url").val());
});

socket.on('data', function (data) {
    var res = JSON.parse(data);
    console.log(res);
});
