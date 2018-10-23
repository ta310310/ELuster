var Game = new GameState_class();

var count = 0;

function GameMainInit(){
	Game.mode = 2;

	MyBulletInit();
	MyBulletClear();
	GameEffect_Init();
	KeyInit();
	BG_Init();
	Enemy_Init();
	EnemyBullet_Init();

}

function GameMain(){

	BG_Clear();

	BG_update();

//var info2text = document.getElementById('info2');
//info2.innerHTML = 'mode:'+Game.mode+' /c:'+count;

	switch(Game.mode){
	case 0:
		break;
	case 1:
		break;
	case 2:
			MyShip_Init();
			Game.mode++;
			count=0;
Enemy_AddEnemy(0);


		break;
	case 3:
			count++;
			if(count>30){Game.mode++;}
		break;
	case 4://Game’†
			MyShip_Move();
			MyShip_Shoot();

Enemy_Update();

EnemyBullet_move();
EnemyBullet_Disp();

BG_Mask();
BG_MyShipLife();

	GameEffect_Update();
		break;
	case 5:
		break;
	};




}


