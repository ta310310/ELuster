var MAX_ENEMY_BULLET_COUNT = 1024;

var EnemyBullet = [];


function EnemyBullet_Init(){
	var i;
	for(i=0;i<MAX_ENEMY_BULLET_COUNT;i++){
		EnemyBullet.push(new EnemyBullet_class());
	}
}

function EnemyBullet_Clear(){
	var i;
	for(i=0;i<EnemyBullet.length;i++){
		EnemyBullet[i].alive = false;
	}

}

function EnemyBullet_AddTargetFire( sx ,sy ,tx,ty,bType,speed,power,param1,param2 ){

	var i,is1,is2,loop,centerDirection;

	switch(bType){
	case 0://é©ã@Ç…å¸ÇØÇƒíºêiÇPÉbî≠

		i = EnemyBullet_GetFreeBulletIndex();
		if(i<0)break;//ãÛÇ´ñ≥Çµ
		EnemyBullet[i].alive = true;
//äpìxåvéZ
		EnemyBullet[i].direction= Math.atan2( tx-sx,ty-sy );

//var info3text = document.getElementById('info3');
//info2.innerHTML = 'dir('+EnemyBullet[i].direction+')360('+MathDir_To360(EnemyBullet[i].direction)+'):('+MathDir_From360(MathDir_To360(EnemyBullet[i].direction))+')';


		EnemyBullet[i].speed	= speed;
		EnemyBullet[i].type		= 0;//íºêiíe
		EnemyBullet[i].x		= sx;
		EnemyBullet[i].y		= sy;
		EnemyBullet[i].dx		= Math.sin(EnemyBullet[i].direction) * EnemyBullet[i].speed;
		EnemyBullet[i].dy		= Math.cos(EnemyBullet[i].direction) * EnemyBullet[i].speed;
		break;
	case 1://íºêiíe+êÓè„Ç…ÉTÉuíe
//äpìxåvéZ
		centerDirection= Math.atan2( tx-sx,ty-sy );

		for(loop=0;loop<param1;loop++){
			is1 = EnemyBullet_GetFreeBulletIndex();
			if( is1 < 0)break;//ãÛÇ´ñ≥Çµ
			EnemyBullet[is1].alive = true;
			is2 = EnemyBullet_GetFreeBulletIndex();
			if( is2 < 0){
				EnemyBullet[is1].alive = false;//ñﬂÇ∑
				break;//ãÛÇ´ñ≥Çµ
			}
			EnemyBullet[is2].alive = true;

			EnemyBullet[is1].direction= centerDirection + param2*(loop+1)/180;
			EnemyBullet[is2].direction= centerDirection - param2*(loop+1)/180;
			
			EnemyBullet[is1].speed	= speed;
			EnemyBullet[is1].type	= 0;//íºêiíe
			EnemyBullet[is1].x		= sx;
			EnemyBullet[is1].y		= sy;
			EnemyBullet[is1].dx		= Math.sin(EnemyBullet[is1].direction) * EnemyBullet[is1].speed;
			EnemyBullet[is1].dy		= Math.cos(EnemyBullet[is1].direction) * EnemyBullet[is1].speed;

			EnemyBullet[is2].speed	= speed;
			EnemyBullet[is2].type	= 0;//íºêiíe
			EnemyBullet[is2].x		= sx;
			EnemyBullet[is2].y		= sy;
			EnemyBullet[is2].dx		= Math.sin(EnemyBullet[is2].direction) * EnemyBullet[is2].speed;
			EnemyBullet[is2].dy		= Math.cos(EnemyBullet[is2].direction) * EnemyBullet[is2].speed;
	
		}
		break;
	}
	
}

function EnemyBullet_GetFreeBulletIndex(){
	var index =-1;
	var i;
	for(i=0;i<EnemyBullet.length;i++){
		if(EnemyBullet[i].alive == false){
			index=i;
			break;
		}
	}
	return index;
}

function EnemyBullet_move(){
	var i;
	var hit;
	for(i=0;i<EnemyBullet.length;i++){
		if(EnemyBullet[i].alive == true){
			switch(EnemyBullet[i].type){
			case 0:
				EnemyBullet[i].x += EnemyBullet[i].dx;
				EnemyBullet[i].y += EnemyBullet[i].dy;
				
				hit = IsMyShipDotVsEnemyBullet( EnemyBullet[i].x,EnemyBullet[i].y,5,1);
				if(hit){
					GameEffect_AddEnemyFireHit(EnemyBullet[i].x,EnemyBullet[i].y,0);
					EnemyBullet[i].alive=false;
				}
				
				if(EnemyBullet[i].x < -10 || EnemyBullet[i].x > BG_GetStageWidth() + 10){
					EnemyBullet[i].alive = false;
				}
				if(EnemyBullet[i].y < -10 || EnemyBullet[i].y > BG_GetStageHeight() + 10){
					EnemyBullet[i].alive = false;
				}
				break;
			}
		}
	}
	
}


function IsMyShipDotVsEnemyBullet( cx , cy , size , power ){
//íeÇ∆ìGîªíË

var MyShip_State = MyShip_GetState();
	var hitJudge=false;

	if(MyShip_State.alive == true){
		//îÕàÕì‡ÅH
		if( IsOverlap_Dot_Distance( MyShip_State.x, MyShip_State.y, cx, cy, size ) ){
			//ìñÇΩÇ¡ÇΩ
			MyShip_State.life	-= power;
			MyShip_State.hit	 = true;

			hitJudge=true;
		}
	}

	return hitJudge;
	
}

function EnemyBullet_Disp(){
	
	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	var i;
	for(i=0;i<EnemyBullet.length;i++){
		if(EnemyBullet[i].alive == true){
			switch(EnemyBullet[i].type){
			case 0://íºêiê‘ã 


    ctx.beginPath();
	ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.arc(EnemyBullet[i].x, EnemyBullet[i].y, 5, 0, Math.PI*2, true);
    ctx.fill();

				break;
			}
		}
	}


}


