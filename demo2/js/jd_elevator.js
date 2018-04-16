var elevator={
  FHEIGHT:0,
  UPLEVEL:0,
  DOWNLEVEL:0,
  $spans:null,
  $elevator:null,
  DURATION:1000,
  init(){
    var me=this;
   
    var height=
      parseFloat($(".floor").css("height"));

    var bottom=
      parseFloat($(".floor").css("marginBottom"));

    me.FHEIGHT=height+bottom;
    
    me.UPLEVEL=(innerHeight-me.FHEIGHT)/2

    me.DOWNLEVEL=(me.UPLEVEL+me.FHEIGHT);
 
    me.$spans=$(".floor>div>span");

    me.$elevator=$("#elevator");

    $(document).scroll(e=>{

      var scrollTop=$(e.target).scrollTop();

      me.$spans.each(i=>{

        var $span=me.$spans.eq(i);

        var offsetTop=$span.offset().top

        var innerTop=offsetTop-scrollTop;

        if(innerTop<=me.DOWNLEVEL
            &&innerTop>me.UPLEVEL){

          $span.addClass("hover");
        }else{

          $span.removeClass("hover");
        }
      });

      if(me.$spans.hasClass("hover")){
        me.$elevator.addClass("in");

        me.$elevator
            .find("a:first-child")
            .css("display","block");
        me.$elevator        
            .find("a:last-child")
            .css("display","none");

        var $span=me.$spans.filter(".hover");
        if($span.size()>0){
          var i=me.$spans.index($span);

          var $li=
            me.$elevator.find(`li:eq(${i})`);

          $li.children(":first")
              .css("display","none")
             .next().css("display","block");
        }
      }else
        me.$elevator.removeClass("in");
    });
    

    me.$elevator.find("li").hover(
      function(){
        $(this).children(":first")
                .css("display","none")
               .next().css("display","block");
      },
      function(){

        var i=me.$elevator
                  .find("li").index(this);

        if(!me.$spans.eq(i).hasClass("hover"))
          $(this).children(":first")
                      .css("display","block")
                    .next().css("display","none");
      }
    );

    me.$elevator.on("click","ul>li>a:last-child",
      function(){

        var i=
          $(this).index("#elevator a:last-child");

        var offsetTop=me.$spans.eq(i).offset().top;

        var scrollTop=offsetTop-me.UPLEVEL;
        $("body").stop(true);
        $("body").animate({
          scrollTop:scrollTop
        },me.DURATION);
    });
  }
}
elevator.init();