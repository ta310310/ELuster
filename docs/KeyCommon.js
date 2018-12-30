
var keyPress = new Array(256);




/*
�L�[�{�[�h����
��F'��'or'8'
���F'��'or'2'
���F'��'or'4'
�E�F'��'or'6'

���F' (SPACE)'
�Z���N�g�F'(SHIFT)'
�A�N�Z���F'+'or'(PageUp)'
�u���[�L�F'-'or'(PageDown)'


*/

function Input_KeyInit(){//PUBLIC

	for(i=0;i<256;i++){
		keyPress[i] = false;
	}

};

function Input_DownKey(code){//PUBLIC
	keyPress[code] = true;
};

function Input_UpKey(code){//PUBLIC
	keyPress[code] = false;
};
function Input_IsPressKey(code){//PUBLIC
	return keyPress[code];
};

function GameKeyState_IsKeyShoot(){//'(SPACE)'
	if(keyPress[32] == true ){
		return true;
	}
	return false;
}

function GameKeyState_IsKeySelect(){//'(SHIFT)'
	if(keyPress[16] == true ){
		return true;
	}
	return false;
}

function GameKeyState_IsKeyAccel(){//'+'or'(PageUp)'
	if(keyPress[16] == true ){
		return true;
	}
	return false;
}

function GameKeyState_IsKeyBreak(){//'-'or'(PageDown)'
	if(keyPress[16] == true ){
		return true;
	}
	return false;
}



function GameKeyState_IsKeyUp(){
	if(keyPress[38] == true || keyPress[104] == true){
		return true;
	}
	return false;
}

function GameKeyState_IsKeyDown(){
	if(keyPress[40] == true || keyPress[98] == true){
		return true;
	}
	return false;
}

function GameKeyState_IsKeyLeft(){
	if(keyPress[37] == true || keyPress[100] == true){
		return true;
	}
	return false;
}

function GameKeyState_IsKeyRight(){
	if(keyPress[39] == true || keyPress[102] == true){
		return true;
	}
	return false;
}

function GameKeyState_GetKeyDirection(){
/*
���S:0
��	:1
�E��:2
�E	:3
�E��:4
��	:5
����:6
��	:7
����:8
*/
	if( GameKeyState_IsKeyUp() && !GameKeyState_IsKeyLeft() && !GameKeyState_IsKeyRight())return 1;

	if( GameKeyState_IsKeyUp() && GameKeyState_IsKeyRight())return 2;

	if( GameKeyState_IsKeyRight() && !GameKeyState_IsKeyUp() && !GameKeyState_IsKeyDown() )return 3;

	if( GameKeyState_IsKeyDown() && GameKeyState_IsKeyRight())return 4;

	if( GameKeyState_IsKeyDown() && !GameKeyState_IsKeyLeft() && !GameKeyState_IsKeyRight())return 5;

	if( GameKeyState_IsKeyDown() && GameKeyState_IsKeyLeft())return 6;

	if( GameKeyState_IsKeyLeft() && !GameKeyState_IsKeyUp() && !GameKeyState_IsKeyDown() )return 7;

	if( GameKeyState_IsKeyUp() && GameKeyState_IsKeyLeft())return 8;

	return 0;
}


/*********************************/



var buttonUp;
var buttonDown;
var buttonLeft;
var buttonRight;
var buttonA;//select
var buttonB;//shoot

var buttonAccel;
var buttonBreak;

var viewStickH;//���@��������
var viewStickV;//���@��������

var fps = 1000/60;
var gamePadInterval=false;
var gamePadIntervalRunning=false;
var gamePadIntervalID;

var gamePadCheckCount=0;

function GamePadState_On(){
	if(!(window.Gamepad)) return;
	if(!(navigator.getGamepads)) return;
	var i;
	var gamePadValid;

	gamePadInterval			= true;
	gamePadIntervalRunning	= true;



	gamePadIntervalID=setInterval(function (){
		GamePadState_Init();
		gamePadValid=false;
var SS='';
		var gamepad_list = navigator.getGamepads();
		var gamepad_list_num = gamepad_list.length;
		for(i=0;i<gamepad_list_num;i++){
			var gamepad = gamepad_list[i];
			if(!gamepad)continue;//�����ȏꍇ���I
			if(!gamepad.connected)continue;//�ڑ����ĂȂ��᎟�I
			gamePadValid=true;
			gamePadCheckCount++;
			//button
			var buttons = gamepad.buttons;
			if(buttons[0]){//A�{�^��
				buttonA=buttons[0].pressed;
				SS=SS+'0:'+buttons[0].pressed;
			}
			if(buttons[1]){//B�{�^��
				buttonB=buttons[1].pressed;
				SS=SS+'/1:'+buttons[1].pressed;
			}

			if(buttons[4]){//L1 break
				buttonBreak=buttons[4].pressed;
				SS=SS+'/4:'+buttons[4].pressed;
			}
			if(buttons[5]){//R1 Accel
				buttonAccel=buttons[5].pressed;
				SS=SS+'/5:'+buttons[5].pressed;
			}

			
			if(buttons[12]){//��
				buttonUp=buttons[12].pressed;
				SS=SS+'/12:'+buttons[12].pressed;
			}
			
			if(buttons[13]){//��
				buttonDown=buttons[13].pressed;
				SS=SS+'/13:'+buttons[13].pressed;
			}
			
			if(buttons[14]){//��
				buttonLeft=buttons[14].pressed;
				SS=SS+'/14:'+buttons[14].pressed;
			}
			
			if(buttons[15]){//�E
				buttonRight=buttons[15].pressed;
				SS=SS+'/15:'+buttons[15].pressed;
			}
			
			
			//��(�㉺���E���Ώ�)
			var axes = gamepad.axes;
			
			if(axes[0]){
SS=SS+'/axes[0]:'+axes[0];
				if(parseInt(axes[0])!=0){
					if(axes[0]<0){//���i���j
						buttonLeft=true;
					}
					else{//�E(��)
						buttonRight=true;
					}
				}
			}
			
			if(axes[1]){
SS=SS+'/axes[1]:'+axes[1];
				if(parseInt(axes[1])!=0){
					if(axes[1]<0){//��i���j
						buttonUp=true;
					}
					else{//���i���j
						buttonDown=true;
					}
				}
			}

			viewStickH=Math.round(axes[2]>>>7)<<<7;
SS=SS+'/axes[2]:'+axes[2];

			viewStickV=Math.round(axes[3]>>>7)<<<7;
SS=SS+'/axes[3]:'+axes[3];







	var info2 = document.getElementById('info2');
info2.innerHTML = 'i:'+i+'/gamePadInterval:'+gamePadInterval+'/gamePadCheckCount:'+gamePadCheckCount;
info2.innerHTML = SS;SS='';
	var info3 = document.getElementById('info3');
info3.innerHTML = 'up:'+buttonUp+'/down:'+buttonDown+'/left:'+buttonLeft+'/up:'+buttonRight+'/A:'+buttonA+'/B:'+buttonB+'/ts'+gamepad.timestamp;

			break;
		}
		if(!gamePadInterval){clearInterval(gamePadIntervalID);}
/*		if(gamePadInterval){
			setTimeout(arguments.callee, fps);
		}
		else{
			gamePadIntervalRunning=false;
		}*/
		
//    })();
	},fps);
}

function GamePadState_Off(){
	gamePadInterval = false;
	GamePadState_Init();
}

function GamePadState_Init(){
	buttonUp	= false;
	buttonDown	= false;
	buttonLeft	= false;
	buttonRight	= false;
	buttonA		= false;
	buttonB		= false;
}

function GamePadState_IsValid(){
	return gamePadInterval;
}
function GamePadState_IsButtonA(){
	return buttonA;
}
function GamePadState_IsButtonB(){
	return buttonB;
}
function GamePadState_IsButtonUp(){
	return buttonUp;
}
function GamePadState_IsButtonDown(){
	return buttonDown;
}
function GamePadState_IsButtonLeft(){
	return buttonLeft;
}
function GamePadState_IsButtonRight(){
	return buttonRight;
}
function GamePadState_GetPadDirection(){
/*
���S:0
��	:1
�E��:2
�E	:3
�E��:4
��	:5
����:6
��	:7
����:8
*/
	if(!GamePadState_IsValid())return 0;

	if( GamePadState_IsButtonUp() && !GamePadState_IsButtonLeft() && !GamePadState_IsButtonRight())return 1;

	if( GamePadState_IsButtonUp() && GamePadState_IsButtonRight())return 2;

	if( GamePadState_IsButtonRight() && !GamePadState_IsButtonUp() && !GamePadState_IsButtonDown() )return 3;

	if( GamePadState_IsButtonDown() && GamePadState_IsButtonRight())return 4;

	if( GamePadState_IsButtonDown() && !GamePadState_IsButtonLeft() && !GamePadState_IsButtonRight())return 5;

	if( GamePadState_IsButtonDown() && GamePadState_IsButtonLeft())return 6;

	if( GamePadState_IsButtonLeft() && !GamePadState_IsButtonUp() && !GamePadState_IsButtonDown() )return 7;

	if( GamePadState_IsButtonUp() && GamePadState_IsButtonLeft())return 8;

	return 0;
}


