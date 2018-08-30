
function IsOverlap_Box_Dot(bx1,by1,bx2,by2 ,dx,dy ){



	if( bx1 <= dx && bx2 >= dx && by1 <= dy && by2 >= dy ){
		return true;
	}
	
	return false;
}

function IsOverlap_Box_Box(b1x1,b1x2,b1y1,b1y2, b2x1,b2x2,b2y1,b2y2 ){

	var b1xHalfSize	= (b1x2-b1x1) / 2;
	var b1xCenter	= b1x1 + b1xHalfSize;
	var b1yHalfSize	= (b1y2-b1y1) / 2;
	var b1yCenter	= b1y1 + b1yHalfSize;

	var b2xHalfSize	= (b2x2-b2x1) / 2;
	var b2xCenter	= b2x1 + b2xHalfSize;
	var b2yHalfSize	= (b2y2-b2y1) / 2;
	var b2yCenter	= b2y1 + b2yHalfSize;

	var xDistance = Math.abs(b1xCenter - b2xCenter);
	var yDistance = Math.abs(b1yCenter - b2yCenter);

	if( (b1xHalfSize + b2xHalfSize) > xDistance && (b1yHalfSize + b2yHalfSize) > yDistance ){
		return true;
	}
	return false;

}

function IsOverlap_Dot_Distance(dx,dy, cx,cy,dist ){

//	var absDist = Math.pow( Math.abs(dx-cx), 2) + Math.pow( Math.abs(dy-cy) , 2 );
	var absDist = Math.abs(dx-cx)*Math.abs(dx-cx) + Math.abs(dy-cy)*Math.abs(dy-cy);

//	if( dist > Math.sqrt( absDist )){
	if( dist*dist >  absDist ){
		return true;
	}
	return false;

}

