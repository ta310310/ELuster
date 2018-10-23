// - global -------------------------------------------------------------------
var screenCanvas, info;
var screenPadCanvas;

var run = true;
var fps = 1000 / 120;
var mouse = new Point();
var pause = false;

// - main ---------------------------------------------------------------------
window.onload = function(){

    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 512;
    screenCanvas.height = 512;

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);

    // エレメント関連
    info = document.getElementById('info');
	info2 = document.getElementById('info2');
/*
    // PADスクリーンの初期化
    screenPadCanvas = document.getElementById('screen_pad');
    screenPadCanvas.width = 512;
    screenPadCanvas.height = 128;
	var padctx = screenPadCanvas.getContext('2d');

	var padimg = new Image();
	padimg.src = "./PadNull.bmp";
        padctx.beginPath();
//	padctx.drawImage(padimg,384,0,511,127);
	padctx.drawImage(padimg,0,0);
        padctx.fill();
*/

/*
// getGamepads メソッドに対応している
if(navigator.getGamepads){

	// ------------------------------------------------------------
	// ゲームパッドリストを取得する
	// ------------------------------------------------------------
	var gamepad_list = navigator.getGamepads();

	// ------------------------------------------------------------
	// アイテム総数を取得する
	// ------------------------------------------------------------
	var num = gamepad_list.length;

	// ------------------------------------------------------------
	// ゲームパッドを順番に取得する
	// ------------------------------------------------------------
	var i;
		console.log(num);
	for(i=0;i < num;i++){

		// ゲームパッドを取得する（undefined 値の場合もある）
		var gamepad = gamepad_list[i];

		// 出力テスト
		console.log(gamepad);
	}

}
*/

	GameMainInit();
	GamePadState_On();
    // ループ処理を呼び出す
    (function(){
		if(pause == false){
	    	var infoTxt = parseInt(mouse.x) + ' : ' + parseInt(mouse.y);
	    	if(isPressKey(38) == true){
				infoTxt = infoTxt + ' U:On ';
	    	}
	    	else{
				infoTxt = infoTxt + ' U:Off';
	    	}

	    	if(isPressKey(40) == true){
				infoTxt = infoTxt + ' D:On ';
	    	}
	    	else{
				infoTxt = infoTxt + ' D:Off';
	    	}

	    	if(isPressKey(39) == true){
				infoTxt = infoTxt + ' R:On ';
	    	}
	    	else{
				infoTxt = infoTxt + ' R:Off';
	    	}

	    	if(isPressKey(37) == true){
				infoTxt = infoTxt + ' L:On ';
	    	}
	    	else{
				infoTxt = infoTxt + ' L:Off';
	    	}

	    	if(isPressKey(32) == true){
				infoTxt = infoTxt + ' S:On ';
	    	}
	    	else{
				infoTxt = infoTxt + ' S:Off';
	    	}

	        // HTMLを更新
	        info.innerHTML = infoTxt;

			GameMain();

	    }
	    else{
	        info.innerHTML = 'Unload page';
	    }

        // フラグにより再帰呼び出し
        if(run){setTimeout(arguments.callee, fps);}
        else{
		    info.innerHTML = ' QUIT - if you need replay PageReload ';
        }
    })();
};

window.onbeforeunload = function(){
	KeyInit();
	GamePadState_Off();
	pause = true;
};

window.onblur = function(){
	KeyInit();
//	GamePadState_On();
	pause = false;
};

window.onfocus = function(){
//	GamePadState_Off();
	pause = false;
};



// - event --------------------------------------------------------------------
function mouseMove(event){
    // マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    // キーコードを取得
    var ck = event.keyCode;
	downKey(ck);
    // Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}

function keyUp(event){
    // キーコードを取得
    var ck = event.keyCode;
    upKey(ck)
}



