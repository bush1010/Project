var obj = {
    init: function () {
        this.flag = false;
        this.dom = {
            moon: $('.moon'),
        }
        this.bindEvent();
        this.change(0);
    },
    bindEvent: function () {
        var self = this;
        var moon = this.dom.moon;
        var dis;
        moon.on('mousedown', function (e) {
            self.flag = true;
            dis = e.clientX - moon.offset().left
        });
        $('body').on('mousemove', function (e) {
            if (!self.flag) {
                return;
            }
            console.log(dis)
            moon.css({
                'left': e.clientX - dis - $('.wrapper').offset().left
            })
            self.getVoice();
        });
        $('body').on('mouseup', function () {
            self.flag = false;
        })
    },
    getVoice: function () {
        var self = this;
        var sun = $('.sun');
        var moon = self.dom.moon;
        var per,
            d = parseInt(moon.css('width')),
            moonL = moon.offset().left,
            moonR = moonL + d,
            sunL = sun.offset().left,
            sunR = sunL + d;
        if (sunL > moonR || moonL > sunR) {
            per = 0;
        } else {
            if (sunL < moonL) {
                per = (sunR - moonL) / d;
            } else if (moonR >= sunL) {
                per = (moonR - sunL) / d;
            }
        }
        self.change(per);
    },
    change: function (per) {
        var self = this;
        $('audio')[0].volume = per;
        $('.per').html("Volume: " + (per * 100).toPrecision(4) + "%");
        this.dom.moon.css({
            'background': "hsl(194, 56%, " + (1 - per) * 60 + "%)"
        })
        $('body').css({
            'background': "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)"
        })
    },
}

obj.init();
// 拖拽 ==》 覆盖百分比 ==》 音量改变/颜色改变


