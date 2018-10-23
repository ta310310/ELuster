
var MAX_ENEMY_COUNT = 100;

var Enemy = [];
var Enemy_MyShipState = new MyShip_class();

var EnemyCount = 0;

function Enemy_class(){

	this.alive	= false;
	this.X		= 0;
	this.Y		= 0;
	this.width	= 0;
	this.height	= 0;
	this.type	= 0;
	this.state	= 0;
    this.speed	= 0;
	this.dX		= 0;
	this.dY		= 0;
	this.life	= 0;
	this.damage = false;
	this.hit	= false;
	this.parent	= -1;
	this.param1;
	this.param2;
	this.param3;
	this.param4;
	this.param5;
	
	function clear(){
		this.alive	= false;
		this.life	= 0;
		this.damage = false;
		this.parent	= -1;
	}
}


function Enemy_Init(){
	for(i=0;i<MAX_ENEMY_COUNT;i++){
		Enemy.push(new Enemy_class());
	}
}

function Enemy_updateMyShipState(ship){
	Enemy_MyShipState.alive	= ship.alive;
	Enemy_MyShipState.x		= ship.x;
	Enemy_MyShipState.y		= ship.y;
}

function Enemy_StageStart(stage){
	EnemyCount=0;
}

function Enemy_IsStageClear(){
	return false;
}

function Enemy_Update(){
	//’Ç‰Áƒe[ƒuƒ‹“Ç‚Ý
	//“®‚«UPDATE
	var i;
	for(i=0;i<Enemy.length;i++){
		if(Enemy[i].alive){
			switch(Enemy[i].type){
			case 0:

				switch(Enemy[i].state){
				case 0:
					Enemy[i].param1 -=2;
					if(Enemy[i].param1 < Enemy[i].width){
						Enemy[i].state=1;
						Enemy[i].damage	= true;
						Enemy[i].width	= 40;
						Enemy[i].height	= 40;
						Enemy[i].param1 = 0;
						Enemy[i].param2 = 50;
						Enemy[i].param3 = 0;
						Enemy[i].param4 = 20;
					}
					else{


	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

    ctx.beginPath();
	var a = 1 - (Enemy[i].param1 - Enemy[i].width) / (Enemy[i].param2 - Enemy[i].width);
        ctx.fillStyle = 'rgba(' + [255,255,255, a ] + ')';
        ctx.arc(Enemy[i].x,Enemy[i].y, Enemy[i].param1/2, 0, Math.PI*2, true);
        ctx.fill();




						
					}
					
					break;/*state 0*/
				case 1:
BG_EnemyBossLife(Enemy[i].life,Enemy[i].lifeMax);

	if(Enemy[i].life <= 0){Enemy[i].state=2;break;}
	

					Enemy[i].x = Enemy[i].x + Enemy[i].speed * Enemy[i].dx;
					if(Enemy[i].dx<0 && Enemy[i].x < 20){Enemy[i].dx=0.1;}
					if(Enemy[i].dx>0 && Enemy[i].x > (384-20)){Enemy[i].dx=-0.1;}
					Enemy_Disp(0,Enemy[i].x,Enemy[i].y);
					
					Enemy[i].param1+=1;
					if(Enemy[i].param1 == Enemy[i].param2){
						Enemy[i].param1=0;
						EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y,
						Enemy_MyShipState.x,
						Enemy_MyShipState.y,
						0,2,1,    0,0);
					}

					Enemy[i].param3+=1;
					if(Enemy[i].param3 == Enemy[i].param4){
						Enemy[i].param3=0;
						if(Enemy[i].hit){//UŒ‚Žó‚¯‚½
							//‘Å‚¿•Ô‚µ
							EnemyBullet_AddTargetFire(Enemy[i].x+30,Enemy[i].y,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							0,2,1,    0,0);
							EnemyBullet_AddTargetFire(Enemy[i].x-30,Enemy[i].y,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							0,2,1,    0,0);
							EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y+30,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							0,2,1,    0,0);
							EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y-30,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							0,2,1,    0,0);
							Enemy[i].hit=false;

							EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							1,1,1,    2,60);
							EnemyBullet_AddTargetFire(Enemy[i].x+20,Enemy[i].y,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							1,1,1,    2,45);

							EnemyBullet_AddTargetFire(Enemy[i].x-20,Enemy[i].y,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							1,1,1,    2,45);
							EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y+30,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							1,1,1,    2,45);
							EnemyBullet_AddTargetFire(Enemy[i].x,Enemy[i].y-30,
							Enemy_MyShipState.x,
							Enemy_MyShipState.y,
							1,1,1,    2,45);
							Enemy[i].hit=false;
						}
					}
					break;/*state 1*/
				case 2:
						Enemy[i].state=3;
						Enemy[i].damage	= false;
						Enemy[i].param1 = 0;
						Enemy[i].param2 = 10;
						Enemy[i].param3 = 500;
				
					break;/*state 2*/
				case 3:
					if(Enemy[i].param1 % 2 == 0)Enemy_Disp(0,Enemy[i].x,Enemy[i].y);
					Enemy[i].param1 += 1;
					if(Enemy[i].param1 == Enemy[i].param2){
						GameEffect_AddMyFireHit(Enemy[i].x - Enemy[i].width / 2 + Math.random() * Enemy[i].width , Enemy[i].y - Enemy[i].height / 2 + Math.random() * Enemy[i].height ,0);
						Enemy[i].param2 += 10;
					}
					if(Enemy[i].param1 >= Enemy[i].param3){
						Enemy_AddEnemy(0);
						Enemy[i].alive	= false;
//						Enemy[i].clear();
					}
					break;/*state 3*/
				}
				break;/*type 0*/
			}
		}
	}

	//’eUPDATE
	
}

function Enemy_Disp(dispType,x,y){


	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

    ctx.beginPath();

	switch(dispType){
	case 0:
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.arc(x,y, 20, 0, Math.PI*2, true);
        ctx.fill();
	
		break;
	}
}


function Enemy_AddEnemy(type){
	var alive=false;
	var i;
	for(i=0;i<Enemy.length;i++){
		if(Enemy[i].alive==false){
			alive=true;
			break;
		}
	}
	
	if(alive){
		switch(type){
		case 0:
			Enemy[i].alive	= true;
			Enemy[i].type	= 0;
			Enemy[i].state	= 0;
			Enemy[i].x		= 192;
			Enemy[i].y		= 256;
			Enemy[i].dx		= 0.1;
			Enemy[i].speed	= 2;
			Enemy[i].life	= 1000;
			Enemy[i].lifeMax= 1000;
			Enemy[i].damage	= false;
			Enemy[i].hit	= false;
			Enemy[i].parent	= -1;
			Enemy[i].width	= 40;
			Enemy[i].height	= 40;
			Enemy[i].param1 = 500;
			Enemy[i].param2 = 500;

			break;
		}

	}
	
}

function Enemy_GetCount(){
	return Enemy.lenth;
}
function Enemy_GetState2( index ){
	return Enemy[index];
}
function Enemy_GetState( ){
	return Enemy;
}


