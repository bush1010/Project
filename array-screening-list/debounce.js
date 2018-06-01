var oInp = document.getElementById('inp');

// var timer = null;
/* oInp.oninput = event;

function event (e) {
    var self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
        console.log(self.value);
    }, 1000)
} */

// 防抖函数
function debounce (handle, delay) {
    var timer = null;
    return function () {
        var self = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(self,args);
        }, delay)
    }
}


// 功能函数
function event () {
    var self = this;
    console.log(self.value);
}


// 绑定函数
oInp.oninput = debounce(event, 1000)
