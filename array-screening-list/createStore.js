/* var state = {
    text: '',
    sex: 'all'
} */



function createStore (initState) {
    var list = [];
    var state = initState;

    // 返回状态
    function getState () {
        return state;
    }

    // 修改状态 state   action-->{type:'', value:''}
    function dispatch (action) {
        state[action.type] = action.value;
        list.forEach(function (ele, index) {
            ele();
        })
    }

    // 订阅
    function subscribe (handle) {
        list.push(handle);
    }
    return {
        getState:getState,
        dispatch:dispatch,
        subscribe:subscribe
    }
}
// var store = createStore({text:'',sex:'all'});

