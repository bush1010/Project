var person = [
    { name: '赵xx', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '叶哈皮', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '吴勇', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '晖晖', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '昊哥', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '马学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '马美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' },
    { name: '马冬梅', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' },
    { name: 'bush', src: '2.jpg', sex: 'male', des: '幕后大佬'}
];



var oUl = document.getElementById('inform');
var oInp = document.getElementById('inp');
var AllSex = document.getElementById('sex');

var store = createStore({text:'',sex:'all'});

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

store.subscribe(function(){
    render(overlay(achieveFn, person));
})

function render(data) {
    console.log('render');
    var str = '';
    data.forEach(function (ele,index) {
        str += '<li>\
        <img src="./img/'+ ele.src +'" alt="">\
        <span class="name">'+ ele.name +'</span>\
        <span class="des">'+ ele.des +'</span>\
        </li>';
    })
    oUl.innerHTML = str;
}
render(person);

function deal () {
    // state.value = this.value;
    store.dispatch({type:'text',value:this.value});
    console.log(this.value);
    // render(overlay(achieveFn, person)); 
}
oInp.oninput = debounce(deal, 800);

function filterByText (text, arr) {
    var newArr = arr.filter(function (ele, index) {
        if(ele.name.indexOf(text) !== -1){
            return true;
        }
    })
    return newArr;
}


AllSex.addEventListener('click', function (e) {
    if(e.target.tagName == 'LI'){
        // state.sex = e.target.getAttribute('sex');
        store.dispatch({type:'sex',value:e.target.getAttribute('sex')});
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        // render(overlay(achieveFn, person));
    }
})
function filterBySex (sex, arr) {
    if(sex == 'all'){
        return arr;
    }else{
        return arr.filter(function (ele, index) {
            if(sex == ele.sex){
                return true;
            }    
        })
    }
}



/* var state = {
    value: '',
    sex: 'all'
} */
var achieveFn = {
    text: filterByText,
    sex: filterBySex
}

function overlay (obj, arr) {
    var lastArr = arr;
    for(var prop in obj){
        lastArr = obj[prop](store.getState()[prop], lastArr);
    }
    return lastArr;
}
