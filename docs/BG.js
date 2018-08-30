/*

STAGE 1024*1024

mask 768,0,1023,1023

*/


var STAGE_WINDOW_SIZE_WIDTH		= 512;
var STAGE_WINDOW_SIZE_HEIGHT	= 512;
var STAGE_SIZE_WIDTH			= 384;
var STAGE_SIZE_HEIGHT			= 512;

function BG_GetStageWidth(){
	return STAGE_SIZE_WIDTH;
}

function BG_GetStageHeight(){
	return STAGE_SIZE_HEIGHT;
}

function BG_Init(){

	StarInit();

}

function BG_Clear(){

	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	ctx.clearRect( 0, 0, STAGE_WINDOW_SIZE_WIDTH , STAGE_WINDOW_SIZE_HEIGHT );
    ctx.beginPath();
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect( 0, 0, STAGE_WINDOW_SIZE_WIDTH , STAGE_WINDOW_SIZE_HEIGHT );


}

function BG_update(){

	StarMove();
}

function BG_Crash(){
	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	ctx.clearRect( 0, 0, STAGE_SIZE_WIDTH - 1, STAGE_SIZE_HEIGHT - 1);
    ctx.beginPath();
	ctx.fillStyle = 'rgb('+Math.random()*128+','+Math.random()*128+','+Math.random()*128+')';
	ctx.fillRect( 0, 0, STAGE_SIZE_WIDTH - 1,STAGE_SIZE_HEIGHT - 1);

}

function BG_Mask(){
	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	ctx.clearRect( STAGE_SIZE_WIDTH , 0, STAGE_WINDOW_SIZE_WIDTH - STAGE_SIZE_WIDTH, STAGE_SIZE_HEIGHT );
    ctx.beginPath();
	ctx.fillStyle = 'rgb(10, 40, 20)';
	ctx.fillRect( STAGE_SIZE_WIDTH , 0, STAGE_WINDOW_SIZE_WIDTH - STAGE_SIZE_WIDTH, STAGE_SIZE_HEIGHT );
}

function BG_MyShipLife(){
	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	var tallSize = STAGE_SIZE_HEIGHT-20;
	var MyShip = MyShip_GetState();
	if(MyShip.alive){
		var life = MyShip.life;
		if(life < 0)life = 0;
	    ctx.beginPath();
		ctx.fillStyle = 'rgb(255,'+ (life/MyShip.lifeMax)*255 +','+ (life/MyShip.lifeMax)*255 +')';
		ctx.fillRect( STAGE_SIZE_WIDTH +50, 10 + tallSize * ( 1 - (life / MyShip.lifeMax) ), 10, tallSize * (life / MyShip.lifeMax ));
	}
}

function BG_EnemyBossLife(life,lifeMax){

	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	var tallSize = STAGE_SIZE_WIDTH-20;
	if(life < 0)life = 0;

    ctx.beginPath();
//	ctx.fillStyle = 'rgb(255,'+ (life / lifeMax)*255 +','+ ( life / lifeMax)*255 +')';
	ctx.fillStyle = 'rgba(' + [ 255 , (life / lifeMax)*255 , ( life / lifeMax) * 255 , 0.5 ] +')';
	ctx.fillRect( 10, 10, tallSize * (life / lifeMax ), 20 );

}


