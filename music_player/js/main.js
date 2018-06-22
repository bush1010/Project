(function (){
    var audioElement = document.createElement('audio');
    // audio的src获得歌曲数据来源
    audioElement.setAttribute('src', $('.active_song').attr('data-origin'))

    // 获得的jquery对象的第一位(也就是原生dom元素)的宽度
    var timeLen = $('.player_timeLineBar').get(0).offsetWidth;

    // TweenMax动画库
    var t = new TimelineMax();
    t.to(
        '.player_cdData',3,
        {
            rotation: '360deg',
            ease: Power0.easeNone,
            // 无限重复
            repeat: -1,
        },'-=0.2s'
    )
    // 暂停
    t.pause();
    // 给songName、author放入data-song以及data-author的数据
    function changeSonginform(){
        $('.songName').text($('.active_song').attr('data-song'));
        $('.author').text($('.active_song').attr('data-author'));
    }

    // 用来让进度条持续运动
    function durationLine(){
        audioElement.addEventListener('timeupdate', function(){
            // duration --> audio的一个属性，获取当前歌曲的总时长(s)
            var duration = this.duration;
            // 获得当前所播放的时长(s)
            var currentTime = this.currentTime;
            var percent = currentTime/duration;
            $('.duration').css({
                width: parseInt(percent * timeLen) + 'px'
            })
        })
    }

    $('.player_play').click(function(){
        if($('.player').hasClass('play')){
            $('.player').removeClass('play');
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale: 1,
                    ease: Power0.easeNone
                }
            )
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: 0,
                    ease: Power0.easeNone
                }
            )
            t.pause();
            audioElement.pause();
        }else{
            $('.player').addClass('play');
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale: 1.2,
                    ease: Power0.easeNone
                }
            )
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone
                }
            )
            t.play();
            audioElement.play();
            changeSonginform();
            durationLine();
        }
    })

    // 从.active_song的data-origin获得的数据传给对应的src播放的歌曲
    function audioElementPlay(){
        audioElement.setAttribute('src', $('.active_song').attr('data-origin'));
        // 播放音乐
        audioElement.play();
    }

    // 上一首
    $('.player_prev').click(function () {
        if ($('.player .player_cdData.active_song').is(":first-child")) {
            $('.player .player_cdData.active_song').removeClass('active_song')    
            $('.player .player_cdData:last-child').addClass('active_song');
            $('.player').addClass('play');
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale: 1.2,
                    ease: Power0.easeNone
                }
            )
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone
                }
            )
        } else {
            $('.player .player_cdData.active_song').removeClass('active_song').prev().addClass('active_song');         
        };
        audioElementPlay();
        changeSonginform();
        durationLine();
    })

    // 下一首
    $('.player_next').click(function () {
        if ($('.player .player_cdData.active_song').is(":last-child")) {
            $('.player .player_cdData.active_song').removeClass('active_song')
            $('.player .player_cdData:first-child').addClass('active_song');
        } else {
            $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song');
            $('.player').addClass('play');
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale: 1.2,
                    ease: Power0.easeNone
                }
            )
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone
                }
            )
        };
        audioElementPlay();
        changeSonginform();
        durationLine();
    })

}())