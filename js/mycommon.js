/* -------------------------------1.绑定节点-----------------------------*/
//ES3方法

//绑定id节点
function getId(idName) {
    return document.getElementById(idName);
}
//通过document绑定class名的节点们
function getClsName(className) {
    return document.getElementsByClassName(className);
}
//通过document绑定标签名节点们
function getTgName(tagName) {
    return document.getElementsByTagName(tagName);
}
//通过父元素id名绑定class名的节点们
function getClassName(idName, className) {
    return idName.getElementsByClassName(className);
}
//通过父元素id名绑定标签名节点们
function getTagName(idName, tagName) {
    return idName.getElementsByTagName(tagName);
}
/* ----------------------------排他----------------------------------------- */
//清除class名，这class名包装的标签是维数组，具有长度的
function clearClass(ele, clsNameStyle) { //ele是元素名，clsNameStyle是样式名
    for (j = 0; j < ele.length; j++) {
        ele[j].className = clsNameStyle;
    }
}
//设置class名，这class名包装的标签是维数组，没有长度的
function setClassName(ele,clsname){
    ele.className= clsname
}
/* ------------------------------------获取样式 ----------------  */
function getstyle(ele, cls) { //ele是节点名，cls是class名
    //ele 节点   cls：属性名
    if (getComputedStyle(ele, false)) {
        //在高级浏览器下面
        return getComputedStyle(ele, false)[cls];
    } else {
        //在低版本浏览器 IE8-
        return ele.currentStyle[cls];
    }
}

function css() {
    if (arguments.length == 2) {
        //获取：getComputedStyle(ele,flase)[0];
        return getComputedStyle(arguments[0], false)[arguments[1]];
    } else if (arguments.length == 3) {
        //设置行内样式
        arguments[0].style[arguments[1]] = arguments[2]
    }
}
/* ------------------------------------任意背景色的变换 ----------------  */
//1.单一的背景色变换【16与256】
function ranBackGroundColor(type) { //单一颜色的随机背景色封装函数【16进制与rgb的版本】
    if (type == 16) { //type==16时，使用16进制进行任意背景色的变换
        var str = '0123456789abcdef';
        // 运用任意数*字符串长度，生成6个任意字符，因此需要用到循环for
        var ranBgColor = '#'
        for (var i = 0; i < 6; i++) {
            // 运用一个变量x，生成6次任意数的位置，因此需要在之前事先声明var x=''
            // 于此同时准备一个变量名，装在每次x生成的数。
            var x = parseInt(Math.random() * str.length);
            ranBgColor += str[x]

        }
        return ranBgColor
    } else if (type == 256) { //type==256，使用rgb进行任意背景色的变换
        //  background: rgb(red, green, blue)
        ranBgColor = 'rgb('
        for (i = 0; i < 3; i++) {
            var ranNum = 0;
            ranNum = parseInt(Math.random() * 256);
            if (i < 2) {
                ranBgColor += ranNum + ','
            } else {
                ranBgColor += ranNum + ')'
            }
        }
        return ranBgColor
    }
}
/* ------------------------------运动框架----------------------------------- */
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */
//三十帧变化
function startMove(obj, json, fnend) {

    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {

        var istrue = true;

        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = getstyle(obj, key) * 100; //透明度
            } else {
                cur = parseInt(getstyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

            }

            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }

            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }

        }

        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) {
                fnend(); //调用函数
            }
        }

    }, 30); //obj.timer 每个对象都有自己定时器

}
/* ---------------------------节点渲染---------------------------------------- */
//用数组方法map渲染：当需要用到内容渲染时使用
function objArrMap(objArr) {
    /* objArr为json对象，用来渲染作准备。
     括号内容的形参根据实际情况更改，内容不全一样推荐此方法*/
    var html = objArr.map(function (item) {
        return `<li class="slideShow">${item}</li>`
    }).join('');
    return html
}
//用循环方法渲染：单纯渲染节点
function objArrFor(totalLength, eleContent) {
    /* totallength表示渲染次数，可以是某节点的长度，也可以是数字 */
    html = ""
    for (i = 0; i < totalLength; i++) {
        html += eleContent
    }
    return html
}
/* ---------------------------参数对象互相转化---------------------------------------- */
//参数转成对象
function strToObj(str) {
    //name=malin&psw=1234
    var obj = {};
    var arr = str.split('&'); //['name=malin','psw=1234']
    arr.forEach(function (item) {
        var newarr = item.split('='); //['name','malin']
        obj[newarr[0]] = newarr[1];
        //obj['name'] = 'malin';
    });
    return obj;
}
//对象转成参数
function objToStr(obj) {
    var html = '';
    //遍历json for in
    for (var key in obj) {
        //key:键名    obj[key] : 键值
        html += key + '=' + obj[key] + '&';
    }
    //name=malin&psw=1234&
    return html.slice(0, -1);
    //				console.log(html);
}
/* ---------------------------过滤敏感词---------------------------------------- */
function filter(str) {
    var arr = ['fuck', '马化腾', '尼玛', '呵呵'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'gi');
        console.log(reg);
        str = str.replace(reg, '***');
    });
    return str;
}
/* ---------------------------图片版时钟---------------------------------------- */

function toTwo(num) { //如果数字小于10，用01-09表示
    if (num <= 9) {
        return '0' + num;
    } else {
        return '' + num;
    }
}
/* -------------------获取系统时间与设置时间的时间插件 */
function setTime() { //通过毫秒转换成年月日时分秒
    if (arguments.length == 0) {//为了获取系统时间求年月日时分秒
        var time = new Date();
    } else if (arguments.length == 1) {//为了设置时间变成年月日时分秒
        trans = Number(arguments[0]);
        var time = new Date(trans);//new Date()括号内只识别数字类型，所以要用Number转换
    }
    var year = time.getFullYear(); //年
    var mon = toTwo(time.getMonth() + 1); //0开始
    var day = toTwo(time.getDate()); //天数
    var hour = toTwo(time.getHours()); //时;
    var min = toTwo(time.getMinutes()); //分；
    var sec = toTwo(time.getSeconds()); //秒

    return {
        years: year,
        mons: mon,
        days: day,
        hours: hour,
        mins: min,
        secs: sec
    }
}

/* ---------------------------统计字数（留意下）---------------------------------------- */
// var charobj = {
//     //					a : 2,
//     //					b : 1,
//     //					c : 2
// };
// arr.forEach(function(item) {
//     if (charobj[item]) {
//         //真：存在
//         charobj[item] += 1;
//     } else {
//         charobj[item] = 1
//     }
//     console.log(charobj);
//     return charobj;
// });
/* ---------------------------进度条---------------------------------------- */
function loadingBar(loadingbar) {
    loading += 1;
    if (loading <= 100) {
        loadingbar.style.width = loading + '%';
    } else {
        clearInterval(timer);
    }
}
/* -----------------------------------五星评分----------------- */
//五星评分（面向对象版）
function Grade(id, tagName) { //id为绑定id名的节点，tagName表示通过id下节点寻找相应的tagname
    this.level = document.getElementById(id);
    this.stars = this.level.getElementsByTagName(tagName);
    this.num = -1;
}
Grade.prototype.init = function () {
    var _this = this
    for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].onmouseover = function () {
            //排他  
            _this.clearStars()
            // 根据索引长度循环
            _this.number(i);
        }
        // 当我鼠标划出的时候，全部背景位置初始化
        this.stars[i].onmouseout = function () {
            _this.clearStars()
            for (var k = 0; k <= _this.num; k++) {
                _this.stars[k].style.backgroundPosition = ('0 29px');
            }
        }
        this.stars[i].onclick = function () {
            _this.num = i;
            _this.clearStars();
            _this.number(i);
        }
    }
}
Grade.prototype.clearStars = function () {
    for (var j = 0; j < this.stars.length; j++) {
        this.stars[j].style.backgroundPosition = ('0 0');
    }
}
Grade.prototype.number = function (i) {
    for (var k = 0; k <= i; k++) {
        this.stars[k].style.backgroundPosition = ('0 29px');
    }
}
/* ------------------------------轮播图--------------------------------- */
//轮播图1----面向过程版：（从右到左）
/* 打开方式，js打开方式如下所示：
        var banner = getId('banner');
        var imgObjArr = ['black', 'yellow', 'blue', 'green', 'orange', 'purple'];
        var eleContent = ' <span class="slideShowBtn"></span>'
        var banner = slideShowOne(imgObjArr, eleContent);  
*/
function slideShowOne(id, tagname1, id2, tagname2, tagname3) {
    /*  表示装图片的盒子id表示装图片的盒子，tagname1表示图片节点，id2表示装下方按钮的盒子,tagname2表示按钮
    的界定， tagname3表示上一页和下一页的按钮*/
    //imgObjArr为banner的图片内容（可json表示），eleContent为按钮
    var slideShowBox = getId(id);
    imgObjArr = imgObjArr;
    slideShowBox.innerHTML = objArrMap(imgObjArr);
    var slideShow = getTagName(slideShowBox, tagname1);
    var slideShowBtnBox = getId(id2);
    slideShowBtnBox.innerHTML = objArrFor(slideShow.length, eleContent);
    var slideShowBtn = getTagName(slideShowBtnBox, tagname2);
    var _next = getTagName(slideShowBox, tagname3)[0];
    var _pre = getTagName(slideShowBox, tagname3)[1];
    var timer = null;
    var iw = slideShow[0].offsetWidth;
    var now = 0;
    slideShowBtn[0].className = "slideShowBtn slideShowBtnActive"

    function next() { //下一页
        console.log(now);
        clearClass(slideShowBtn, 'slideShowBtn');
        startMove(slideShow[now], {
            'left': -iw
        });
        /* 一开始第一张图的左侧位移为0，第二张图左侧位移为offsetwidth，当第一张图发生
位移的时候，第二张图同时位移，后面以此类推。当上面的now到达倒数第二张图片时并推到可视框
左侧的时候，下面的now就推到可视框。当上面的now为最后一张并且推到可视窗左侧的时候，第一张
就必须闪现位移到可视窗右侧，以至于看出连贯的效果。因此代码如{花括号}所示，然后每次执行的时候，
(相对于上次上面now图片)下面now推到可视窗口左边时，下面now(相对于上次下面now)，会快速回可视窗
左侧并且出现在可视窗中，用三目运算判断界限并进行循环操作。
*/
        // now++
        // now >= slideShow.length ? 0 : now;
        // now = ++now >= slideShow.length ? 0 : now;
        now++;
        if (now >= slideShow.length) {
            now = 0;
        }
        slideShowBtn[now].className = "slideShowBtn slideShowBtnActive";
        slideShow[now].style.left = iw + 'px';
        startMove(slideShow[now], {
            'left': 0
        });
    }

    function pre() { //上一页
        clearClass(slideShowBtn, 'slideShowBtn');
        startMove(slideShow[now], {
            'left': iw
        });
        now = --now <= -1 ? slideShow.length - 1 : now;
        slideShowBtn[now].className = "slideShowBtn slideShowBtnActive"
        slideShow[now].style.left = -iw + 'px';
        startMove(slideShow[now], {
            'left': 0
        });
    }
    timer = setInterval(next, 2000); //使用计时器自动执行轮播图的播放
    // _next.onclick = function () {//下一页的按钮
    //     next()
    // }
    // _pre.onclick = function () {//上一页的按钮
    //     pre()
    // }
    banner.onmouseover = function () {
        clearInterval(timer);
    }
    banner.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(next, 2000);

    }
    banner.onclick = function (ev) { //轮播图target事件
        if (ev.target.className == '_next') { //下一页按钮
            next();
        };
        if (ev.target.className == '_pre') {
            pre();
        };
    }
    //制作按钮绑定：如果i>now，则图片从右到左切入，否则从左到右切入；
    for (let i = 0; i < slideShowBtn.length; i++) {
        slideShowBtn[i].onclick = function () {
            clearClass(slideShowBtn, 'slideShowBtn');
            slideShowBtn[i].className = 'slideShowBtn slideShowBtnActive'
            if (i > now) {
                startMove(slideShow[now], {
                    'left': -iw
                });
                /*   下同，如果不将当前li[now]移开，
                由于叠层的潜规则，会阻碍视觉，看不到下面的图片已经发生位移 */
                slideShow[i].style.left = iw + 'px';
            } else if (i < now) {
                startMove(slideShow[now], {
                    'left': iw
                });
                slideShow[i].style.left = -iw + 'px';
            }
            startMove(slideShow[i], {
                'left': 0
            });
            now = i;
        }
    }
}
//轮播图1----面向对象版：（从右到左）
function slideShow(id, tagname1, id2, tagname2, tagname3) {
    /*  表示装图片的盒子id表示装图片的盒子，tagname1表示图片节点，id2表示装下方按钮的盒子,tagname2表示按钮
    的界定， tagname3表示上一页和下一页的按钮*/
    this.obox = document.getElementById(id);
    this.li = this.obox.getElementsByTagName(tagname1);
    this.osel = document.getElementById(id2);
    this.span = this.osel.getElementsByTagName(tagname2);
    this._next = this.obox.getElementsByTagName(tagname3)[0];
    this._pre = this.obox.getElementsByTagName(tagname3)[1];
    this.now = 0;
    this.iw = this.li[0].offsetWidth;
    // this.timer = setInterval(this.next, 2000);
    this.span[0].className = "active";
    // var _this = this
}
// slideShow.prototype.nexts =function(_this){
//     _this.next0(_this);
// }
slideShow.prototype.next0 = function (now0) { //下一页
    now0.clear0(now0.span);
    startMove(now0.li[now0.now], {
        'left': -(now0.iw)
    });
    now0.now++;
    if (now0.now >= now0.li.length) {
        now0.now = 0
    }
    now0.span[now0.now].className = "active";
    now0.li[now0.now].style.left = now0.iw + 'px';
    startMove(now0.li[now0.now], {
        'left': 0
    });
}
slideShow.prototype.pre0 = function (now0) { //上一页
    now0.clear0(now0.span)
    startMove(now0.li[now0.now], {
        'left': now0.iw
    });
    now0.now = --(now0.now) <= -1 ? now0.li.length - 1 : now0.now;
    now0.span[now0.now].className = "active"
    now0.li[now0.now].style.left = -(now0.iw) + 'px';
    startMove(now0.li[now0.now], {
        'left': 0
    });
}
slideShow.prototype.clear0 = function (now0) {
    for (j = 0; j < this.li.length; j++) {
        now0[j].className = '';
    }
}
slideShow.prototype.init = function () {
    function nexts() {
        _this.next0(_this);
    }
    var _this = this;
    console.log(_this);
    this._next.onclick = function () {
        _this.next0(_this);
    };
    this._pre.onclick = function () {
        _this.pre0(_this)
    };
    this.obox.onmouseover = function () {
        clearInterval(_this.timer);
    };
    this.obox.onmouseout = function () {
        _this.timer = setInterval(nexts, 2000);

    }
    for (let i = 0; i < this.span.length; i++) {
        this.span[i].onclick = function () {
            _this.clear0(_this.span)
            _this.span[i].className = 'active'
            if (i > _this.now) {
                startMove(_this.li[_this.now], {
                    'left': -(_this.iw)
                });
                _this.li[i].style.left = _this.iw + 'px';
            } else if (i < _this.now) {
                startMove(_this.li[_this.now], {
                    'left': _this.iw
                });
                _this.li[i].style.left = -(_this.iw) + 'px';
            }
            startMove(_this.li[i], {
                'left': 0
            });
            _this.now = i;
        }
    }
    this.next0(this);
    this.timer = setInterval(nexts, 2000);
}
/* ------------------------------ajax--------------------------------- */
function ajax(type, url, data, fn) {

    //1.创建对象
    var xhr = new XMLHttpRequest();

    //2.参数设置  open('')
    if (type.toLowerCase() == 'get') {
        if (data) {
            //如果是get方式并且有数据
            url = url + '?' + data;
        }
        xhr.open(type, url, true);
        xhr.send(null);
    } else {
        //post方式
        xhr.open(type, url, true);
        //请求头设置
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    //3.接收数据（数据未完全响应）
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState == 4) { //4.接收数据（数据完全响应）
            if (xhr.status == 200) {
                //成功接收数据
                //				var str = xhr.responseText;
                if (fn) {
                    //把数据传到外部使用
                    fn(xhr.responseText);
                    /*  console.log(xhr); */
                }
            } else {
                //如果出错给个提示
                alert('出错了，状态码是：' + xhr.status);
            }
        }
    }

}

function ajax2(opt) {
    function extend(obj1, obj2) { //配置参数：obj1  默认参数:obj2
        for (var key in obj1) {
            obj2[key] = obj1[key];
        }
    }

    var defaults = { //默认参数
        data: '',
        async: true
    }
    extend(opt, defaults); //使用默认参数
    //1.创建对象
    var xhr = new XMLHttpRequest();
    //2.发送请求
    if (defaults.type.toLowerCase() == 'get') {
        //get方式
        defaults.url += '?' + defaults.data;
        xhr.open('get', defaults.url, defaults.async);
        xhr.send(null);
    } else if (defaults.type.toLowerCase() == 'post') {
        //post方式
        xhr.open('post', defaults.url, defaults.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defaults.data);
    }
    //3.接收数据(数据未完全响应)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) { //4.接收数据(数据完全响应)
            if (xhr.status == 200) {
                //把拿到的数据丢到外面
                defaults.success(xhr.responseText);
            } else {
                alert('出错啦,http码是：' + xhr.status);
            }
        }
    }
}
/* -------------------------cookie------------------------ */
//设置cookie存帐号密码
function setCookie(key, value, iDay) {
    //key:键名   value：键值    iDay：失效时间
    var now = new Date();
    now.setDate(now.getDate() + iDay); //iDay:5天后失效， -1：立即失效
    //getDate()拿到当前天数，加上iDay等于失效时间，setDate为设置日期为哪天。
    document.cookie = key + '=' + value + ';expires=' + now + ';path=/';
}
//读取cookie得到帐号密码
function getCookie(key) {
    var str = document.cookie;
    var arr = str.split('; ');
    for (var ele of arr) {
        var arr2 = ele.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}
//移出cookie使cookie失效
function removeCookie(key) {
    setCookie(key, '', -1); //设置成过去的时间
}