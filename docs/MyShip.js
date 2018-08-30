
var MyShip = new MyShip_class();

var MY_SHIP_UP_LIMIT	= 30;
var MY_SHIP_DOWN_LIMIT	= 482;
var MY_SHIP_LEFT_LIMIT	= 30;
var MY_SHIP_RIGHT_LIMIT	= 482;

function MyShip_Init(){

	MY_SHIP_UP_LIMIT	= BG_GetStageHeight() * 0.03;
	MY_SHIP_DOWN_LIMIT	= BG_GetStageHeight() * 0.97;
	MY_SHIP_LEFT_LIMIT	= BG_GetStageWidth() * 0.03;
	MY_SHIP_RIGHT_LIMIT	= BG_GetStageWidth() * 0.97;


	MyShip.alive	= true;
	MyShip.life		= 1000;
	MyShip.lifeMax	= 1000;
	MyShip.hit		= false;
	MyShip.x		= BG_GetStageWidth()/2;
	MyShip.y		= BG_GetStageHeight()*0.9;
	MyShip.speed	= 2;
	MyShip.obliqueSpeed = Math.sqrt(MyShip.speed);
	MyShip.cooling= 0;
	
	MyBulletInit();
}

function MyShip_Start(){
	MyBulletClear();
}

function MyShip_GetState(){
	return MyShip;
}

function MyShip_Move(){

	if(MyShip.hit){
		BG_Crash();
		MyShip.hit=false;
	};

	var StickDirection = GameKeyState_GetKeyDirection();
	if(StickDirection==0)StickDirection = GamePadState_GetPadDirection();

	var verticalMove	=0;
	switch(StickDirection){//縦軸チェック
	case 1:
		if(MyShip.y > MY_SHIP_UP_LIMIT){
			verticalMove -= MyShip.speed;
		}
		break;
	case 2:
	case 8:
		if(MyShip.y > MY_SHIP_UP_LIMIT){
			verticalMove -= MyShip.obliqueSpeed;
		}
		break;
	case 5:
		if(MyShip.y < MY_SHIP_DOWN_LIMIT){
			verticalMove = MyShip.speed;
		}
		break;
	case 4:
	case 6:
		if(MyShip.y < MY_SHIP_DOWN_LIMIT){
			verticalMove = MyShip.obliqueSpeed;
		}
		break;
	}


	var holizonMove		=0;
	switch(StickDirection){//縦軸チェック
	case 7:
		if(MyShip.x > MY_SHIP_LEFT_LIMIT){
			holizonMove -= MyShip.speed;
		}
		break;
	case 6:
	case 8:
		if(MyShip.x > MY_SHIP_LEFT_LIMIT){
			holizonMove -= MyShip.obliqueSpeed;
		}
		break;
	case 3:
		if(MyShip.x < MY_SHIP_RIGHT_LIMIT){
			holizonMove = MyShip.speed;
		}
		break;
	case 2:
	case 4:
		if(MyShip.x < MY_SHIP_RIGHT_LIMIT){
			holizonMove = MyShip.obliqueSpeed;
		}
		break;
	}


	MyShip.x += holizonMove;
	MyShip.y += verticalMove;

	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');
    ctx.beginPath();
	ctx.fillStyle = 'rgb(255, 0, 255)';
    ctx.arc(MyShip.x, MyShip.y, 10, 0, Math.PI*2, true);
    ctx.fill();

	MyBulletMove();
	Enemy_updateMyShipState(MyShip);//Enemyにステート渡し
	GameEffect_updateMyShipState(MyShip);
}

function MyShip_Shoot(){
	MyShip.cooling --;
	if(MyShip.cooling < 0)MyShip.cooling=0;

	if(isPressKey(32) == true || (GamePadState_IsValid() && (GamePadState_IsButtonA() || GamePadState_IsButtonB())) ){
		if(MyShip.cooling == 0){
			Myship_AddBullet( );
			MyShip.cooling = 3;
		}
		else{
		}
		
	}

}

function Myship_AddBullet( ){


	if(MyBulletFire( MyShip )){
		GameEffect_AddFire(  -5, -10,0);
		GameEffect_AddFire(  +5, -10,0);
	}
var info2text = document.getElementById('info2');

}