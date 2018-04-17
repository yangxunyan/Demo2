	game={
		chess:document.getElementById("chess"),
		context:chess.getContext("2d"),
		People:true,
		row:15,
		col:15,
		data:[],
		count:0,
		drawing(){
			//绘制棋谱
			this.context.clearRect(0,0,30*this.col,30*this.row)
			var context=this.context;
			context.beginPath();
			for(var i=0;i<this.row;i++){//画横线路径
				context.moveTo(15,15+30*i);
				context.lineTo(30*this.col-15,15+30*i);
			}
			for(var j =0;j<15;j++){//画竖线路径
				context.moveTo(15+j*30,15);
				context.lineTo(15+j*30,30*this.row-15);
			}
			context.strokeStyle="#666";//设置填充颜色
			context.stroke();//填充
			//创建内存二维数组
			for(var i = 0; i<this.row;i++){
				this.data[i]=new Array(this.col);
			}
			//鼠标点击下棋
			this.chess.onclick=(function(e){
				//获取鼠标位置
				var i=parseInt(e.offsetX/30);
				var j=parseInt(e.offsetY/30);
				if(this.data[i][j] != undefined){//判断该点是否有棋子
					return
				}
				this.step(i,j,this.People);
				this.People=!this.People;
			}).bind(this)
		//计算赢法统计
			//横向赢法
			for(var i = 0 ; i<this.row;i++){
				for(var j = 0; j<this.col-4;j++){
					this.count+=1;
				}
			}
			//竖线赢法
			for(var i = 0; i<this.col; i++){
				for(var j = 0; j<this.row-4; j++){
					this.count+=1;
				}
			}
			//斜线赢法
			for(var i = 0; i<this.col-4; i++){
				for(var j =0; j<this.row-4; j++){
					this.count+=2;//反斜线同框
				}
			}
			console.log(this.count);
			
		},
		step(i,j,P){//画棋子
			var context=this.context;
			context.beginPath();
			context.moveTo(i*30+15,j*30+15);
			var gradient = context.createRadialGradient(i*30+17,j*30+14,2,i*30+17,j*30+14,10);
			if(P){
				gradient.addColorStop(0,"#666");
				gradient.addColorStop(1,"#000");
			}else{
				gradient.addColorStop(0,"#fff");
				gradient.addColorStop(1,"#ddd");
			}
			context.arc(i*30+15,j*30+15,15,0,Math.PI*2,true);
			context.fillStyle=gradient;
			context.fill();
			if(this.People){//黑棋
				this.data[i][j]=1
			}else{//白棋
				this.data[i][j]=2
			};
			if(this.solveWin(i,j,this.People)){
				
			};
		},
		solveWin(i,j,color){
			var r,c,val;
			if(color){
				val = 1;
			}else{
				val = 2;	
			}
			//读取落点
			var total=0;
			r=i;
			c=j;
			//横向获胜
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				
				c++;
			}
			c=j-1;
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				
				c--;
			}
			//竖线获胜
			r=i;
			c=j;
			total=0;
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r ==this.row-1){
					break;
				}
				r++;
			}
			if(i > 0){
				r=i-1;
			}
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r == 0){
					break;
				}
				r--;
			}
			//斜线赢法
			r=i;
			c=j;
			total=0;
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r ==this.row-1){
					break;
				}
				r++;
				c++;
			}
			if(i > 0){
				r=i-1;
				c=j-1;
			}
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r == 0){
					break;
				}
				r--;
				c--;
			}
			//反斜线赢法
			r=i;
			c=j;
			total=0;
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r ==this.row-1){
					break;
				}
				r++;
				c--;
			}
			if(i > 0){
				r=i-1;
				c=j+1;
			}
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r == 0){
					break;
				}
				r--;
				c++;
			}
			//斜线赢法
			r=i;
			c=j;
			total=0;
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r ==this.row-1){
					break;
				}
				r++;
				c--;
			}
			if(i > 0){
				r=i-1;
				c=j-1;
			}
			while(this.data[r][c]==val){
				total++;
				if(this.isWin(total,val)){
					return true;
				}
				if(r == 0){
					break;
				}
				r--;
				c++;
			}
		},
		isWin(total,val){
			if(total==5){
				if(val == 1){
					alert("黑棋胜");
					return true;
				}else if(val == 2){
					alert("白棋胜");
					return true;
				}
			}
			return false
		}
	};
	game.drawing();