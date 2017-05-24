;! function( Slider ) {
    Slider.prototype.initAnimation = function() {
        var subSwiper,
            initSubSwiper = function() {
                if ( ! subSwiper ) {
                    var $subPower = $( ".js-sub-power-scroll" );
                    subSwiper  = $subPower.swiper( {
                        mode: "horizontal",
                        slidesPerView:1,
                        loop: false
                    } );
                } else {
                    subSwiper.reInit();
                }
            },
            startSlideAnimation = function( swiper ) {
                var $activeSlide = $( swiper.activeSlide() );
                $activeSlide.children().removeClass( "hide" );
                // init sub swiper
                if ( $activeSlide.data( "containSubSwiper" ) || ( $activeSlide.find( ".js-sub-power-scroll" ).length > 0 ) ) {
                    $activeSlide.data( "containSubSwiper", true );
                    initSubSwiper();
                }
            },
            hideAllSlideAnimation = function( swiper ) {
                for ( var i = 0, l = swiper.slides.length; i < l; ++ i ) {
                    $( swiper.slides[i] ).children().addClass( "hide" );
                }
            };

        this.swiper.addCallback( "FirstInit", function( swiper ) {
            setTimeout( function() {
                startSlideAnimation( swiper );
            }, 300);
        } );

        this.swiper.addCallback( "SlideReset", function( swiper, direction ) {
            startSlideAnimation( swiper );
        } );

        this.swiper.addCallback( "SlideChangeEnd", function( swiper, direction ) {
            hideAllSlideAnimation( swiper );
            startSlideAnimation( swiper );
        } );

        hideAllSlideAnimation( this.swiper );
    };
}(MobileSlider);

$( function() {
    var $powerScroll = $( ".js-power-scroll" );

    // new tab at pc
    if ( ! /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) {
        $powerScroll.find( "a" ).attr( "target", "_blank" );
    }

    // like btn
    $powerScroll.delegate( ".js-slide-rating .js-fav-btn", "click", function( e ) {
        var $btn    = $( ".js-slide-rating .js-fav-btn" ),
            $number = $( ".js-slide-rating .js-number" ),
            $heart  = $btn.find( ".js-heart" ),
            weiUid  = $btn.data( "wei-uid" ),
            applyId = $btn.data( "apply-id" );


        // fixed the bug: after click like btn, share link will contain the hash
        // fix method: set all hash to __fixed__
        $( ".swiper-slide" ).attr( "data-hash", "__fixed__" );
        window.location.hash = "__fixed__";

        if ( $btn.attr( "disabled" ) || ! weiUid || ! applyId ) {
            return false;
        }

        $btn.attr( "disabled", true );
        $number.html( parseInt( $number.html() || 0 ) + 1 ).addClass( "a-largen-out" );
        setTimeout( function(){ $number.removeClass( "a-largen-out" ); }, 780 );
        $heart.addClass( "c-red" );
        $.getJSON( SITE_URL + "RecruitFestival/likeWeiUser", { wei_uid: weiUid, apply_id: applyId }, function( res ) {
            if ( res && res.status ) {
            } else {
                $number.html( parseInt( $number.html() || 0 ) - 1 ).removeClass( "a-largen-out" );
                $heart.removeClass( "c-red" );
                $btn.attr( "disabled", false );
                alert( res.info || "%>.<%操作失败，请稍后重试~" );
            }
        } );
    } );

    // share btn
    if ( navigator.userAgent.match(/micromessenger/gi) || ! /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() ) ) {
        $powerScroll.delegate( ".js-share-btn", "click", function() {
            var $btn   = $( this ),
                $power = $( ".js-power-scroll-container" ),
                $fade  = $( "<div/>" ),
                $content   = $( "<div/>" ),
                $shareTips = $( "<div/>" ),
                imgUri = "share-timeline.png";
            // 蒙层
            $fade.attr( "style", "box-sizing: border-box;overflow: visible;position: absolute;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;background-color: #000;opacity: .7;filter: alpha(opacity=70);z-index: 1140;" );
            $content.attr( "style", "box-sizing: border-box;overflow: visible;position: absolute;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;z-index: 1150;" );
            // 分享提示
            $shareTips.attr( "style", "position:absolute;top:-18px;right:5px;" );
            $shareTips.append( "<img/>" ).find( "img" ).attr( "src", "images/" + imgUri + "?v201412110010" ).attr( "width", 420 );
            // 关闭蒙层
            $content.bind( "click", function() {
                $fade.remove();
                $content.remove();
                $fade      = null;
                $content   = null;
                $shareTips = null;
            } );
            // 组装
            $content.append( $shareTips );
            $power.append( $fade ).append( $content );
        } );
    }

    $powerScroll = null;
} );


var move = {
    H : "",
    W : "",
    t : "",
    c : "",
    timer : 1000,
    "init" : function(t,c,timer){
        move.c = c;
        move.t = t;
        move.timer = timer;
        if (move.c == move.t){
            return;
        }else if(move.c < move.t){
            move.c ++ ;
        }else{
            move.c -- ;
        }
        move.step();
    },
    "m" : function(){
        $(".manbox").animate({
            "left" : move.W,
            "top" : move.H
        },move.timer,"linear");
        move.init(move.t,move.c,move.timer);
    },
    "step" : function(){
        $(".manbox").attr("data-now",move.c);
        move.H = $(".btn"+move.c).css("top");
        move.W = $(".btn"+move.c).css("left");
        move.m();
    }
};

var fade = {
    H : "",
    W : "",
    t : "",
    c : "",
    l : "",
    pic : "",
    s : 0,
    timer : "",
    "init" : function(t,c){
        if(fade.s == 1){
            return
        }
        fade.s = 1;
        fade.c = c;
        fade.t = t;
        fade.l = $("[data-target="+fade.t+"]").attr("data-link");
        fade.pic = "images/"+$("[data-target="+fade.t+"]").attr("data-pic");
        if(!fade.t){
            fade.unactive()
        }else{
            $("#may").removeClass("delay_1500ms")
            fade.step(fade.t);
        }
    },
    "m" : function(){
        $(".manbox").fadeOut("200",function(){
            fade.show();
        });
    },
    "step" : function(x){
        $(".manbox").attr("data-now",fade.c);
        fade.H = $(".btn"+x).css("top");
        fade.W = $(".btn"+x).css("left");
        fade.m();
    },
    "show" : function(){
        $("#picMay").attr("src",fade.pic);
        $(".manbox").css({
            "left" : fade.W,
            "top" : fade.H
        });
        $(".manbox").fadeIn("300",function(){
            $(".loading").show();
            fade.timer= setTimeout("fade.link()",1500)
        });
    },
    "unactive" : function() {
        $("#may").removeClass("delay_1500ms bounceIn");
        $("#may").fadeIn("10");
        $("#may").addClass("bounceIn");
        fade.finish();
    },
    "link" : function(){
        fade.finish();
        window.location.href = fade.l;
    },
    "finish" : function(){
        fade.s = 0;
    }
};

$(".btns img").on("click",function(){
    var c = $(".manbox").attr("data-now");
    var t = $(this).parent().attr("data-target");
    //if(x>2){
    //    timer = 1000 / Math.abs(t - c);
    //}else if(x < 2){
    //    timer = 300 / Math.abs(t - c);
    //}else{
    //    timer = 500 / Math.abs(t - c);
    //}
    //move.init(t,c,timer);
    fade.init(t,c);
})

var step = {
    "init" : function (m){
        step.path = 'images/';
        step.imgs = $("[data-target]");
        step.loadimg();
        if(!m){
            step.m = 1;
        }else{
            step.m = m
        }
        step.setImg();
    },
    "loadimg" : function() {
        for(var i = 0; i < step.imgs.length; i++) {
            step.img = new Image();
            step.img.src = step.path + $(step.imgs[i]).attr("data-pic");
        }
    },
    "setImg" : function() {
        for(var i=0; i<step.m;i++){
            $(step.imgs[i]).removeClass("off").addClass("on")
            $(step.imgs[i]).attr("data-target",i+1);
        }
    },
    "format" : function (name,href) {
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
        href = href || location.href;
        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    }
}

step.init(step.format("sid"));

