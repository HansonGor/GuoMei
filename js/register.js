$(function () {
    var checkReg = { //注册表单正则
        username: function (str) {
            var reg = /^[\u4e00-\u9fa5\w\-、_]{3,20}$/;
            return reg.test(str)
        },
        tel: function (str) {
            var reg = /^1[34578]\d{9}$/;
            return reg.test(str);
        },
        psw: function (str) {
            var reg = /^[a-zA-Z\d@!@#$%^&*? ]{6,20}$/;
            return reg.test(str);
        },
        pswSure: function (str) {
            if (str == inputs[1].value) {
                return res = 1
            } else {
                return res = 0
            }
        },
        id: function (str) {
            var reg = /^[\u4e00-\u9fa5]{2,4}$/
            return reg.test(str);
        },
        idCode: function (str) {
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17})\x|X$/;
            return reg.test(str);
        },
        url: function (str) {
            var reg = /^[\u4e00-\u9fa5]{9,}[\d|\u4e00-\u9fa5|a-z|A-Z]+$/
            return reg.test(str);
        },
        bir: function (str) {
            var reg = /^\d{4}\/\d{2}\/\d{2}$/;
            return reg.test(str);
        },
    }
    var gmBox = getId('gmBox')
    var con = getClassName(document, 'container')[0]
    var rbox = getId('gm-registerBox');
    // console.log(rbox);
    var person = getId('person'); //个人注册表单
    var company = getId('company'); //企业注册表单
    var pEnter = getId('pEnter'); //个人注册入口
    // console.log(pEnter)
    var cEnter = getId('cEnter'); //企业注册入口
    // console.log(cEnter);
    var inputBox = getClassName(person, 'inputBox'); //注册表单盒子
    // console.log(inputBox);
    var inputs = getClassName(person, 'inputs'); //个人注册入口表单各框
    // console.log(inputs[0]);
    var inf = getClassName(person, 'inf') //正则提示信息；
    // console.log(inf);
    var powerBox = getClassName(person, 'powerBox')[0]; //密码强度盒子
    var power = getClassName(person, 'power'); //个人注册密码强度
    var active2 = getClassName(person, 'active2') //密码强度高亮显示强度
    var ppower = 0; //密码强度（1弱2中3强）
    // console.log(active2);
    // console.log(power);
    var isok = false; //个人注册入口开关;
    slideVer = getId('slideVer') //滑块的盒子;
    var infor = getClassName(person, 'infor')[0]
    var slideMove = getClassName(person, 'slideMove')[0] //滑动滑块
    var slideBar = getClassName(person, 'slideBar')[0] //滑块左边背景颜色
    var slideIntro = getClassName(person, 'slideIntro')[0]; //滑块提示信息;
    var getVer = getId('getVer');
    var istrue = false; //滑动开关;
    var verNum = null; //装验证码的盒子
    var sub = getId('sub');
    var pswMask = getId('pswMask') //密码遮罩层盒子:密码建议遮罩框;
    pswMask.style.height = gmBox.offsetHeight + 'px';
    var agreementMask = getId('agreementMask') //用户须知遮罩盒子
    agreementMask.style.height = gmBox.offsetHeight + 'px';
    var pswSugBtn = getId('pswSugBtn'); //密码设置建议按钮
    var close = getId('close');
    var agree = getId('agree');
    var disagree = getId('disagree');
    // var inputs0isok = null;
    // var inputs1isok = null;
    // var inputs2isok = null;
    // var inputs3isok = null;
    //循环表单验证生成开关
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].isok = false;
    }
    /* ----------------------------------遮罩层------------------------------- */
    pswSugBtn.onclick = function () {
        pswMask.style.display = 'block';
    }
    close.onclick = function () {
        pswMask.style.display = 'none';
    }
    disagree.onclick = function () {
        location.href = 'login.html';
    }
    agree.onclick = function () {
        gmBox.removeChild(agreementMask);
    }
    /* ------------------------------------聚焦事件------------------------------ */
    inputs[0].onfocus = function () {
        inf[0].className = 'inf active4';
        inf[0].innerHTML = '3-20个字符，支持汉子、字母、数字及"-""、""_"组合';

    }
    inputs[1].onfocus = function () {
        inf[1].className = 'inf active4';
        inf[1].innerHTML = '6-20个字符建议由字母，数字与符号两种以上组成';

    }
    inputs[2].onfocus = function () {
        inf[2].className = 'inf active4';
        inf[2].innerHTML = '请再次输入密码';

    }
    inputs[4].onfocus = function () {
        inf[4].className = 'inf active4';
        inf[4].innerHTML = '请输入短信验证码';

    }
    /* ----------------------------------失去焦点事件和键盘抬起事件------------------------------- */
    inputs[0].onblur = function () { //验证用户名
        // console.log(this.isok);
        this.isok = inputs0();
        // console.log(123);
    }

    function inputs0() {
        // this.isok = false;
        //如果输入的字数超过20个字符，则只有前面20个字符;
        var username = inputs[0].value.trim();
        var ok = null;
        inf[0].className = 'inf active3';
        inputs[0].style.border = '1px solid red';
        inputs[0].className = 'inputs';
        if (username) {
            var res = checkReg.username(username);
            // console.log(res);
            if (res) {
                // console.log(inf[0])
                ajax2({ //运用ajax检验该邮箱是否已经注册过，是的话不给予注册可直接登录，否则可以注册：检验唯一性
                    type: 'post',
                    url: '../api/gmSaveUser.php',
                    data: 'uid=' + username + '&mes=check',
                    success: function (str) { //成功回调后，进行yes和no的判断，检验唯一性
                        // console.log(str == 'yes');
                        // console.log(str);
                        if (str == 'yes') {
                            inf[0].innerHTML = ''; //545637029@qq.com
                            inf[0].className = 'inf';
                            inputs[0].style.border = '1px solid #888888';
                            inputs[0].isok = true;
                            inputs[0].className = 'inputs active5';
                            // console.log(123);
                            //  this.isok;
                            // inputs0isok = this.isok;
                        } else {
                            inf[0].innerHTML = '该用户名已存在，立刻<a style="display:inline" href="login.html">登录</a>或更换用户名'; //545637029@qq.com                               
                        }
                    }
                })
            } else {
                if (username.length < 3) {
                    inf[0].innerHTML = '用户名长度只能在3-20个字符之间';
                    return;
                }
                inf[0].innerHTML = '用户名只能由中文、英文、数字及"-"、"_"组成';
            }
        } else {
            inf[0].innerHTML = '请输入用户名';
        }
    }
    inputs[1].onblur = function () { //验证设置密码
        this.isok = Power();
    }
    inputs[1].onkeyup = function () {
        var psw = inputs[1].value.trim();
        if (psw.length >= 6) {
            inputs[2].disabled = ""
        } else {
            inputs[2].disabled = 'disabled'
        }
        this.isok = Power();
    }

    function Power() { //密码强度函数
        var psw = inputs[1].value.trim();
        // this.isok = false;
        //如果设置密码的长度大于等于6位，则才可以使用“再次输入密码框”
        if (psw.length >= 6) {
            inputs[2].disabled = ""
        } else {
            inputs[2].disabled = 'disabled'
        }
        inputs[1].style.border = 'red 1px solid';
        css(inputBox[1], 'margin-bottom', '28px');
        css(powerBox, 'display', 'none');
        setClassName(inf[1], 'inf active3');
        inputs[1].className = 'inputs';
        if (psw) {
            css(inputBox[1], 'margin-bottom', '0');
            css(powerBox, 'display', 'block');
            for (var i = 0; i < active2.length; i++) {
                active2[i].style.width = '0';
            }
            var ppower = 0;
            // console.log(ppower);
            if (/\d/.test(psw)) {
                ppower++
            }
            if (/[a-zA-Z]/.test(psw)) {
                ppower++;
            }
            if (/[@!@#$%^&*?]/.test(psw)) {
                ppower++;
            }
            for (var i = 0; i < ppower; i++) {
                active2[i].style.width = '30px';
            }
            var res = checkReg.psw(psw);
            //PSW中截取一个字符;
            var word = psw.slice(0, 1);
            // console.log(word);
            // console.log(PSW.indexOf(word));
            if (res) {
                if (/^[0-9]+$/.test(psw)) {
                    inf[1].innerHTML = '不能全为数字';
                    // console.log(this.isok);
                    return this.isok;
                }
                for (i = 0; i < psw.length; i++) {
                    if (psw[i] != word) {
                        inf[1].innerHTML = '';
                        inputs[1].style.border = '1px solid #888888';
                        setClassName(inf[1], 'inf');
                        // console.log(this.isok);     
                        inputs[1].className = 'inputs active5';
                        this.isok = true;
                        // inputs1isok = this.isok;
                        return this.isok;
                    } else {
                        inf[1].innerHTML = '不能为同一字符';
                    }
                }
            } else {
                inf[1].innerHTML = '长度应为6-20个字符或使用了非法字符';
            }
        } else {
            inf[1].innerHTML = '请输入密码';
        }
        // console.log(this.isok);
        return this.isok;
    }
    inputs[2].onblur = function () { //验证密码二次正确
        this.isok = inputs2();
    }

    function inputs2() {
        this.isok = false;
        var pswSure = inputs[2].value.trim();
        inputs[2].style.border = '1px solid red';
        inputs[2].className = 'inputs';
        setClassName(inf[2], 'inf active3');
        inputs.className = 'inputs'
        if (pswSure) {
            var res = checkReg.pswSure(pswSure);
            if (res) {
                // inf[2].innerHTML = ''; //a122456
                inputs[2].style.border = '1px solid #888888';
                setClassName(inf[2], 'inf');
                this.isok = true;
                // inputs2isok = this.isok;
                inputs[2].className = 'inputs active5';
                return this.isok;
            } else {
                inf[2].innerHTML = '两次密码不一致';
            }
        } else {
            inf[2].innerHTML = '请再次入密码';
        }
    }
    inputs[3].onblur = function () { //绑定曾未绑定的手机号
        this.isok = inputs3();
    }

    function inputs3() {
        this.isok = false;
        setClassName(inf[3], 'inf active3');
        inputs[3].className = 'inputs';
        inputs[3].style.border = '1px solid red';
        var tel = inputs[3].value.trim(); //手机号码
        if (tel) {
            var res = checkReg.tel(tel);
            if (res) {
                ajax2({ //运用ajax检验该邮箱是否已经注册过，是的话不给予注册可直接登录，否则可以注册：检验唯一性
                    type: 'post',
                    url: '../api/gmSaveUser.php',
                    data: 'tel=' + tel + '&mes=check1',
                    success: function (str) { //成功回调后，进行yes和no的判断，检验唯一性
                        // console.log(str == 'yes');
                        // console.log(str);
                        if (str == 'yes') {
                            // console.log(this.isok);
                            // inputs3isok = this.isok;
                            inf[3].innerHTML = ''; //35876543664
                            inputs[3].style.border = '1px solid #888888';
                            inputs[3].className = 'inputs active5';
                            setClassName(inf[3], 'inf');
                            inputs[3].isok = true;
                            return inputs[3].isok;
                        } else {
                            inf[3].innerHTML = '手机号已被激活过，请重新输入'; //545637029@qq.com                               
                        }
                    }
                })
            } else {
                inf[3].innerHTML = '手机号码格式有误，请重新输入';
            }
            // console.log(res)
        } else {
            inf[3].innerHTML = '手机号不能为空';
        }
    };
    //以下做滑动解锁
    // console.log(slideMove);
    slideMove.onmousedown = function (ev) {
        var ix = ev.offsetX; //鼠标相对于父元素的水平距离
        slideMove.onmousemove = function (ev) {
            var l = ev.clientX - ix - slideVer.offsetLeft - con.offsetLeft;
            if (l < 0) {
                var l = 0;
            } else if (l >= (slideVer.offsetWidth - slideMove.offsetWidth - 10)) {
                // console.log(inputs[0].isok);
                if (inputs[0].isok) {
                    if (inputs[1].isok) {
                        if (inputs[2].isok) {
                            if (inputs[3].isok) {
                                var l = slideVer.offsetWidth - slideMove.offsetWidth;
                                istrue = true; //滑动开关;
                            } else {
                                inputs3();
                            }
                        } else {
                            inputs2();
                        }
                    } else {
                        Power();
                    }
                } else {
                    inputs0();
                }
                l = slideVer.offsetWidth - slideMove.offsetWidth;
            }
            slideBar.style.width = slideMove.offsetLeft + 'px';
            slideMove.style.left = l + 'px';
        }

        document.onmouseup = function () {
            if (istrue == false) {
                slideMove.style.left = '0px';
                slideBar.style.width = '0px';
            } else {
                // if()
                infor.className = 'infor';
                slideMove.onmousedown = null;
                slideIntro.innerHTML = '验证成功';
                slideMove.style.background = 'url(../img/ok.png)';
            }
            slideMove.onmousemove = null;
        }
    }
    //以下做短信验证
    inputs[4].onblur = function () {
        this.isok = inputs4();
    }

    function inputs4() {
        console.log(verNum)
        this.isok = false;
        setClassName(inf[4], 'inf active3');
        inputs[4].style.border = '1px solid red';
        var ver = inputs[4].value.trim();
        if (ver) {
            if (ver == verNum) {
                inputs[4].style.border = '1px solid #888888';
                inf[4].innerHTML = '';
                setClassName(inf[4], 'inf');
                // console.log(123);
                return this.isok = true;
            } else {
                inf[4].innerHTML = '手机验证码错误';
            }
        } else {
            inf[4].innerHTML = '请输入短信验证码';
        }
    }
    /* --------------------------------点击事件------------------------- */
    // console.log(inputs[0])
    //点击一次后，会进入60s倒计时，之后才能再次点击;
    function verAble() {
        var sec = 60;
        var timer = '';
        timer = setInterval(function () {
            --sec;
            getVer.value = sec + '秒后重新获取短信验证码';
            if (sec <= 0) {
                getVer.value = '获取短信验证码';
                getVer.disabled = '';
                clearInterval(timer);
            }
        }, 1000)
    }
    rbox.onclick = function (ev) {
        // console.log(ev.target)
        if (ev.target.id == 'pEnter' && isok == true) { //个人注册入口
            console.log(123)
            css(person, 'display', 'block');
            css(company, 'display', 'none');
            setClassName(pEnter, 'userType active1');
            setClassName(cEnter, 'userType');
            css(rbox, 'border-right', '1px solid #e6e6e6');
            isok = false;
            // console.log(isok);
        }
        if (ev.target.id == 'cEnter' && isok == false) { //企业注册入口
            css(person, 'display', 'none');
            css(company, 'display', 'block');
            setClassName(pEnter, 'userType');
            setClassName(cEnter, 'userType  active1');
            css(rbox, 'border-right', '0px')
            isok = true;
            // console.log(123);
            // console.log(isok);
        }
        if (ev.target.id == 'getVer') { //以下为获取短信验证码
            var tel = inputs[3].value.trim(); //手机号码
            if (inputs[3].isok) { //手机号
                if (istrue) {
                      ajax2({
                          type: 'post',
                          url: '../api/phoneVer.php',
                          data: 'userphone=' + tel,
                          success: function (str) {
                              // console.log(str);
                              var obj = JSON.parse(str);
                              // console.log(obj);
                              // console.log(obj.phonecode)
                              verNum = obj.phonecode;
                          }
                      });
                   /*  var str = '{"phonecode":319287,"message":{"reason":"操作成功","result":{"sid":"1720509233152402500","fee":1,"count":1},"error_code":0}}'
                    // console.log(str);
                    var obj = JSON.parse(str);
                    // console.log(obj);
                    console.log(obj.phonecode);
                    verNum = obj.phonecode; */
                    //点击一次后，会进入60s倒计时，之后才能再次点击;
                    getVer.disabled = 'disabled';
                    verAble();
                } else {
                    infor.className = 'infor active3';
                }
            } else {
                inputs3();
            }
        }
        if (ev.target.id == 'sub') {
            for (var i = 0; i < inputs.length - 1; i++) {
                // console.log(inputs[i].isok);
                if (!inputs[i].isok) {
                    alert('注册失败，请检查信息是否正确');
                    return;
                }
            }
            ajax2({ //保存用户注册信息到数据库
                type: 'post',
                url: '../api/gmSaveUser.php',
                data: 'uid=' + inputs[0].value + '&psw=' + inputs[1].value + '&tel=' + inputs[3]
                    .value + '&recommend=' + inputs[5].value + '&mes=save', //通过整理成url格式将data通过ajax传给后端，注意url格式，‘&’号和‘=’号
                success: function (str) { //提示是否注册成功，给前端回应
                    if (str) {
                        alert('注册成功');
                        // location.href='userLogin.html?'
                        location.href = 'login.html'
                    } else {
                        alert('注册失败，请核实信息');
                    }
                }
            })
        }
    }
})