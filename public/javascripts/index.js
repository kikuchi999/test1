var s = io.connect('http://192.168.0.12:3000');
var num;
// 
//サーバから受け取るイベント
// 
s.on("connect", function () {});	// 接続時
s.on("disconnect", function (client) {});	// 切断時

s.on("numbering", function(data)
{
	num = data.value;
console.log("ナンバー：" + num);
})

s.on("back1", function (data)
{
	move(data.value);
});


// 
// サーバーへ送信
// 
function keySend(keyNum)
{
	var key = keyNum;
	s.emit("action1", {value:key});
}



// 自機の作成
$(function()
{
	ctx = $("#field")[0].getContext('2d');
	$cv = $("#field")[0];
	init();
	
	$("#field").on("click", function(e)
	{

	});
	
	$("body").on('keydown', function(e)
	{
		keySend(e.which);
	})
	
	
});

var obj;
var firstX = 10, firstY = 10,
	sizeX = 30, sizeY = 30;
var moveNum = 4;
function init()
{
	obj = ctx;
	obj.fillStyle = "#ff0000"
	obj.fillRect(firstX, firstY, sizeX, sizeY);
	obj.stroke();	
}

function move(key)
{
	switch(key)
	{
		case 37:
			obj.translate("-" + moveNum, 0);
			ctx.clearRect(0, 0, $cv.width, $cv.height);
			obj.fillRect(firstX, firstY, sizeX, sizeY);
			break;
		case 38:
			obj.translate(0, "-" + moveNum);
			ctx.clearRect(0, 0, $cv.width, $cv.height);
			obj.fillRect(firstX, firstY, sizeX, sizeY);
			break;
		case 39:
			obj.translate(moveNum, 0);
			ctx.clearRect(0, 0, $cv.width, $cv.height);
			obj.fillRect(firstX, firstY, sizeX, sizeY);
			break;
		case 40:
			obj.translate(0, moveNum);
			ctx.clearRect(0, 0, $cv.width, $cv.height);
			obj.fillRect(firstX, firstY, sizeX, sizeY);
			break;
	}
}


