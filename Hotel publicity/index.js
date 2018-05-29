var oUl = $('ul'),
    oLi = $('li'),
    len = oLi.length,
    width = parseInt(oUl.css('width')),
    gw = width / len,
    ot = Math.floor((width - 400) / (len - 1));
    flag = true;
function init(){
    if(flag){
        change($(oLi[len-1]));        
    }
}
function bindEvent(){
    oLi.on('click',function(){
        change($(this));
        if(($(this).index() +1) == len){
            flag = false;
        }else{
            flag = true;            
        }
    });
    oUl.on('mouseleave',function(){
        init();
    })
}
function change(event){
    event.animate({
        'width':'400px'
    },300,'linear').siblings().animate({
        'width':ot + 'px'
    },300,'linear');
    event.find('.title').css({
        'display':'none'
    })
    event.siblings().find('.title').css({
        'display':'block'
    })
    event.find('.decration').css({
        'bottom':'0px',
        'left': '-13px'
    })
    event.siblings().find('.decration').css({
        'bottom':'-50px'
    })
}
init();
bindEvent();
