var person = [
    { name: '赵文强', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '叶秦天', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '吴勇', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '阚春晖', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '杨林昊', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '马学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '马美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' },
    { name: '马冬梅', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' },
    { name: 'bush', src: '2.jpg', sex: 'male', des: '幕后大佬'}
];



var oUl = document.getElementById('inform');
var oInp = document.getElementById('inp');
var AllSex = document.getElementById('sex');

function render(data) {
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

oInp.oninput = function () {
    state.value = this.value;
    render(overlay(achieveFn, person));
    
}
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
        state.sex = e.target.getAttribute('sex');
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        render(overlay(achieveFn, person));
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



var state = {
    value: '',
    sex: 'all'
}
var achieveFn = {
    value: filterByText,
    sex: filterBySex
}

function overlay (obj, arr) {
    var lastArr = arr;
    for(var prop in obj){
        lastArr = obj[prop](state[prop], lastArr);
    }
    return lastArr;
}
