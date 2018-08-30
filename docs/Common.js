
var MATHDIR_TO_360_PARAM = 360/(Math.PI*2);

function MathDir_To360( dir ){
	return ( dir + Math.PI) * MATHDIR_TO_360_PARAM;
}

function MathDir_From360( dir360 ){
	return ( dir360 / MATHDIR_TO_360_PARAM ) - Math.PI;
}

function Point(){
    this.x = 0;
    this.y = 0;
}


function EnemyBullet_class(){
	this.alive	= false;
	this.x		= 0;
	this.y		= 0;
	this.speed	= 0;
	this.type	= 0;
	this.power	= 0;
	this.direction=0;
	this.dx		= 0;
	this.dy		= 0;
	this.param1	= 0;
	this.param2	= 0;
	this.param3	= 0;
	this.param4	= 0;
}

function MyShip_class( ){
	this.alive	= false;
	this.life	= 0;
	this.lifeMax= 1024;
	this.hit	= false;
	this.x		= 0;
	this.y		= 0;
	this.speed	= 0;
	this.obliqueSpeed	= 0;
	this.type	= 0;
	this.cooling= 0;//玉発射からのクーリングタイム
}

function MyBullet_class(){
	this.alive	= false;
	this.x		= 0;
	this.y		= 0;
	this.speed	= 0;
	this.type	= 0;
	this.power	= 0;
	this.dx		= 0;
	this.dy		= 0;
	this.param1	= 0;
	this.param2	= 0;
	this.param3	= 0;
	this.param4	= 0;
}

function StarPoint_class(x , y , speed){
    this.x = x;
    this.y = y;
	this.speed = speed;
}

function GameState_class(){
	this.mode	= 0;
	this.phase	= 0;
	this.left	= 3;
	this.stage	= 0;
	this.demo	= false;
}
/*mode
0:push start

1:敵配置
2:自機配置
3:StageStart表示
4:ゲーム中
5:Stageクリア
6:GameOver

*/
