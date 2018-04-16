/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/01.png"},
  {"i":1,"img":"images/02.png"},
  {"i":2,"img":"images/03.png"},
  {"i":3,"img":"images/04.png"},
  {"i":4,"img":"images/05.png"},
];
var slider={
  LIWIDTH:0,//一张广告的宽度
  $imgs:null, $idxs:null,
  DURATION:1000,
  WAIT:4000,
  timer:null,
  init(){
    this.LIWIDTH=parseFloat(
      $("#slider").css("width"));
    
    this.$imgs=$("#imgs");
    
    this.$idxs=$("#indexs");
    this.updateView();
    this.$idxs.on("mouseover","li",e=>{
      if(!$(e.target).hasClass("hover")){
   
        clearTimeout(this.timer); this.timer=null;
        this.$imgs.stop(true);
      
        var start=
          this.$idxs.children(".hover").html();
   
        var end=$(e.target).html();

        this.move(end-start);
      }
    })
  },
  updateView(){
    for(var i=0,imgsHTML="",idxsHTML="";
        i<imgs.length;
        i++){
      imgsHTML+=
        `<li><img src="${imgs[i].img}"/></li>`
      
      idxsHTML+=`<li>${i+1}</li>`;
    }
    this.$imgs
          .html(imgsHTML)
          .css("width",imgs.length*this.LIWIDTH);

    this.$idxs.html(idxsHTML);
  
    this.$idxs.children(`:eq(${imgs[0].i})`)
              .addClass("hover");
  },
  startAuto(){
    this.timer=setTimeout(
      ()=>this.move(1),this.WAIT);
  },
  move(n){
    if(n>0){
     
      this.$imgs.animate({
        left:-n*this.LIWIDTH
      },this.DURATION,()=>{
        
        imgs=imgs.concat(imgs.splice(0,n));
        this.updateView();
        this.$imgs.css("left",0);
        this.startAuto();
      });
    }else{
      n*=-1;
      imgs=imgs.splice(-n,n).concat(imgs);
      this.updateView();
      var left=parseFloat(this.$imgs.css("left"));
      this.$imgs.css("left",left-n*this.LIWIDTH);
     
      this.$imgs.animate(
        {left:0},
        this.DURATION,
        ()=>this.startAuto()
      );
    }
  },
}
slider.init();
