var BULLET_NUM = 10;

var shot1Type = 0;
var shot2Type = 0;
var myBullet = []; 





function MyBulletInit(){
	var i;
	for( i = 0 ; i < BULLET_NUM ; i++ ){
		myBullet.push(new MyBullet_class());
	}
}

function MyBulletClear(){
	var i;
	for( i = 0 ; i < myBullet.length ; i++ ){
		myBullet[i].alive = false;
	}

}

function MyBulletFire( myShipState ){
	var bulletSpace = false;
	var num = 0;
	var num1st;
	for(  ; num < myBullet.length ; num++ ){
		if(myBullet[num].alive == false){
			bulletSpace = true;
			break;
		}
	}

	if( bulletSpace == true){
		myBullet[num].alive	= true;
		myBullet[num].type	= 0;
		myBullet[num].x		= myShipState.x-5;
		myBullet[num].y		= myShipState.y;
		myBullet[num].speed	= 10;
		myBullet[num].power	= 1;
		num1st=num;
	}
	else{
		return false;
	}

	bulletSpace = false;
	for(  ; num < myBullet.length ; num++ ){
		if(myBullet[num].alive == false){
			bulletSpace = true;
			break;
		}
	}

	if( bulletSpace == true){
		myBullet[num].alive = true;
		myBullet[num].type	= 0;
		myBullet[num].x = myShipState.x+5;
		myBullet[num].y = myShipState.y;
		myBullet[num].speed = 10;
		myBullet[num].power = 1;
		
	}
	else{//片方がセットできない場合、両方なし
		myBullet[num1st].alive = false;
		return false;
	}
	return true;

}

function MyBulletMove(){
	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');

	var i;

	for( i = 0 ; i < myBullet.length ; i++ ){
		if(myBullet[i].alive == true){
			switch(myBullet[i].type){
			case 0:
				myBullet[i].y -= myBullet[i].speed;
				if(myBullet[i].y < 0){//画面外
					myBullet[i].alive = false;
				}
				else{
				    ctx.beginPath();
					ctx.fillStyle = 'rgb(255, 255, 255)';
				    ctx.arc(myBullet[i].x, myBullet[i].y, 3, 0, Math.PI*2, true);
				    ctx.fill();

					if( IsMyBulletDotVsEnemy( myBullet[i].x, myBullet[i].y, myBullet[i].power) ) {

/*
var info2text = document.getElementById('info2');
info2.innerHTML = 'HIT+++++';
*/

						//hitエフェクト＋玉消え
						GameEffect_AddMyFireHit( myBullet[i].x, myBullet[i].y, myBullet[i].type);
						myBullet[i].alive = false;
					}
				}
				break;
			}
		}


	}


}

function IsMyBulletDotVsEnemy( cx , cy , power ){

//弾と敵判定

var Enemy_State = Enemy_GetState();

var hitJudge = false;

	var i;

	for( i = 0 ; i < Enemy_State.length ; i++ ){
		if(Enemy_State[i].alive == true){
			switch(Enemy_State[i].type){
			case 0://vs巨大玉
				//範囲内？
				if( IsOverlap_Dot_Distance( cx, cy, Enemy_State[i].x, Enemy_State[i].y, Enemy_State[i].width / 2 ) ){
					//当たった
					hitJudge = true;
					if( hitJudge && Enemy_State[i].damage ){
						Enemy_State[i].life	-= power;
						Enemy_State[i].hit	 = true;
					}
					break;//一発当たったら判定終了
				}
			}
		}
	}

	return hitJudge;
	
}




