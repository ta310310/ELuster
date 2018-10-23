// - global -------------------------------------------------------------------
var screenCanvas, info;
var screenPadCanvas;

var run = true;
var fps = 1000 / 120;
var mouse = new Point();
var pause = false;

// - main ---------------------------------------------------------------------
window.onload = function(){

    // �X�N���[���̏�����
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 512;
    screenCanvas.height = 512;

    // �C�x���g�̓o�^
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);

    // �G�������g�֘A
    info = document.getElementById('info');
	info2 = document.getElementById('info2');
/*
    // PAD�X�N���[���̏�����
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
// getGamepads ���\�b�h�ɑΉ����Ă���
if(navigator.getGamepads){

	// ------------------------------------------------------------
	// �Q�[���p�b�h���X�g���擾����
	// ------------------------------------------------------------
	var gamepad_list = navigator.getGamepads();

	// ------------------------------------------------------------
	// �A�C�e���������擾����
	// ------------------------------------------------------------
	var num = gamepad_list.length;

	// ------------------------------------------------------------
	// �Q�[���p�b�h�����ԂɎ擾����
	// ------------------------------------------------------------
	var i;
		console.log(num);
	for(i=0;i < num;i++){

		// �Q�[���p�b�h���擾����iundefined �l�̏ꍇ������j
		var gamepad = gamepad_list[i];

		// �o�̓e�X�g
		console.log(gamepad);
	}

}
*/

	GameMainInit();
	GamePadState_On();
    // ���[�v�������Ăяo��
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

	        // HTML���X�V
	        info.innerHTML = infoTxt;

			GameMain();

	    }
	    else{
	        info.innerHTML = 'Unload page';
	    }

        // �t���O�ɂ��ċA�Ăяo��
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
    // �}�E�X�J�[�\�����W�̍X�V
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event){
    // �L�[�R�[�h���擾
    var ck = event.keyCode;
	downKey(ck);
    // Esc�L�[��������Ă�����t���O���~�낷
    if(ck === 27){run = false;}
}

function keyUp(event){
    // �L�[�R�[�h���擾
    var ck = event.keyCode;
    upKey(ck)
}



