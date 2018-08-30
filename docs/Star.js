
var StarPoint = [];



// ’¸“_
function Vertex(x, y) {
    this.x = x;
    this.y = y;
     
    // •`‰æ
    this.draw = function(){

        var canDom = document.getElementById('screen');
        var ctx = canDom.getContext('2d');
         
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 360, true);
        ctx.fill();
         
    };
}

function StarInit(){
	for(i=0;i<128;i++){
		StarPoint.push(new StarPoint_class(Math.random() * BG_GetStageWidth(),Math.random() * BG_GetStageHeight(),Math.random() * 4 + 1));
	}

}
function StarMove(){


	var canDom = document.getElementById('screen');
	var ctx = canDom.getContext('2d');



//    vertexList = [];
 //   var i=0
	for(i=0;i<StarPoint.length;i++){
		StarPoint[i].y += StarPoint[i].speed;
		if(StarPoint[i].y>=BG_GetStageHeight()){
			StarPoint[i].y=0;
		}
//		info2.innerHTML = StarPoint[i].x + ' / ' + StarPoint[i].y;

//		vertexList.push(new Vertex(StarPoint[i].x , StarPoint[i].y));
		//•\Ž¦
//		vertexList[i].draw();

        ctx.beginPath();

        ctx.fillStyle = 'rgb(' + Math.random() * 192 + ',' + Math.random() * 192 + ',' + Math.random() * 192 +')';
        ctx.arc(StarPoint[i].x, StarPoint[i].y, 1, 0, 360, true);
        ctx.fill();


	}


}

