
var GAME_EFFECT_COUNT=256;
var GameEffect = [];
var GameEffect_MyShipState = new MyShip_class();

function GameEffect_class(){
	this.alive	=	false;
	this.x		=	0;
	this.y		=	0;
	this.type	=	0;
	this.count	=	0;
	this.state	=	0;
}

function GameEffect_Init(){
	var i;
	for( i = 0 ; i < GAME_EFFECT_COUNT ; i++){
		GameEffect.push(new GameEffect_class());
	}

}

function GameEffect_AddFire(x ,y ,bulletType){

	var i;
	var alive = false;
	for( i = 0 ; i < GameEffect.length ; i++ ){
		if( GameEffect[i].alive == false){
			alive = true;
			break;
		}
	}

	if(alive){
		GameEffect[i].alive	=	true;
		GameEffect[i].x		=	x;
		GameEffect[i].y		=	y;
		GameEffect[i].type	=	0;
		GameEffect[i].count	=	5;
	}

}

function GameEffect_AddMyFireHit(x ,y ,bulletType){

	var i;
	var alive = false;
	for( i = 0 ; i < GameEffect.length ; i++ ){
		if( GameEffect[i].alive == false){
			alive = true;
			break;
		}
	}

	if(alive){
		GameEffect[i].alive	=	true;
		GameEffect[i].x		=	x;
		GameEffect[i].y		=	y;
		GameEffect[i].type	=	1;
		GameEffect[i].count	=	2;
	}

}

function GameEffect_AddEnemyFireHit(x ,y ,bulletType){

	var i;
	var alive = false;
	for( i = 0 ; i < GameEffect.length ; i++ ){
		if( GameEffect[i].alive == false){
			alive = true;
			break;
		}
	}

	if(alive){
		GameEffect[i].alive	=	true;
		GameEffect[i].x		=	x;
		GameEffect[i].y		=	y;
		GameEffect[i].type	=	1;
		GameEffect[i].count	=	2;
	}
}


function GameEffect_updateMyShipState(ship){
	GameEffect_MyShipState.alive	= ship.alive;
	GameEffect_MyShipState.x		= ship.x;
	GameEffect_MyShipState.y		= ship.y;
}

function GameEffect_Update(){


	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	var i;


	for( i = 0 ; i < GameEffect.length ; i++){
	
		if( GameEffect[i].alive ){
			switch(GameEffect[i].type){
			case 0://自機Fire(自機に合わせて動く)

		        ctx.beginPath();
		        ctx.fillStyle = 'rgba(255,255,255,'+1-0.1*i+')';
//		        ctx.fillStyle = 'rgb(255,255,255)';
		        ctx.arc(GameEffect_MyShipState.x+GameEffect[i].x, 
		        		GameEffect_MyShipState.y+GameEffect[i].y, 
		        		GameEffect[i].count, 0, Math.PI*2, true);
		        ctx.fill();

				GameEffect[i].count++;
				if( GameEffect[i].count > 7){
					GameEffect[i].alive = false;
				}

//		        ctx.fillStyle = 'rgb(' + Math.random() * 192 + ',' + Math.random() * 192 + ',' + Math.random() * 192 +')';

				break;


			case 1://自機Fire的に当たった

		        ctx.beginPath();
		        ctx.fillStyle = 'rgba(255,255,255,'+1-0.1*i+')';
//		        ctx.fillStyle = 'rgb(255,255,255)';
		        ctx.arc(GameEffect[i].x, 
		        		GameEffect[i].y, 
		        		GameEffect[i].count, 0, Math.PI*2, true);
		        ctx.fill();

				GameEffect[i].count+=0.1;
				if( GameEffect[i].count > 10){
					GameEffect[i].alive = false;
				}

//		        ctx.fillStyle = 'rgb(' + Math.random() * 192 + ',' + Math.random() * 192 + ',' + Math.random() * 192 +')';

				break;


		    }
	    }


	}


}

