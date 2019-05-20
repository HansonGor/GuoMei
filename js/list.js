$(function () {
    var goodsBox = getClassName(document, 'goods-box')[0]; //绑定渲染图片的节点
    // console.log(goodsBox)
    //制作每一页的渲染,每次按下按钮时生成。
    var ipage = 1; //第几页
    var num = 28; //每1页10条数据
    var rankType = ''; //price:根据价格排序 shoucang:根据收藏量排序
    var type = ''; //排序的类型
    var order = ''; //ASC为升序，DESC为降序。
    // console.log(order)
    //先图片的生成
    init(ipage);
    //再页数的生成
    // btn()

    function init(ipage) { //图片的生成
        // console.log(num)
        var p = new Promise(function (resolve) {
            ajax2({
                type: 'get',
                url: '../api/gsGoodsDate.php',
                data: 'page=' + ipage + '&num=' + num + '&type=' + type + '&order=' + order + '&mes=get1', //不用双引号
                success: function (str) {
                    resolve(str);
                    // console.log(str);
                    // arr = JSON.parse(str);
                    // console.log(arr);
                    // create(str);
                    console.log(1);
                }
            });
            // console.log('AJAX');
        })
        p.then(function (str) {
            arr = JSON.parse(str);
            // console.log(arr);
            window.addEventListener('load', create(str), true);
            window.addEventListener('load', function () {
                setTimeout(function () {
                    console.log(123)
                    createSelBTns();
                }, 1000)
            }, true);
            // createSelBTns(); //制作小图盒子左右选项按钮
            window.addEventListener('load', userEvent(), true)
        })

    }

    function create(str) {
        var arr = JSON.parse(str); //把数据转化成对象
        // console.log(arr);
        var res = arr.data.map(function (item) {
            return ` <li class="goods" data-gid=${item.gid}>
                <div class="goodsimg">
                <img src="${item.listimga1}" alt="" class="goodsimage">
                <img src="${item.listimga2}" alt="" class="goodsimage">
                <img src="${item.listimga3}" alt="" class="goodsimage">
                <img src="${item.listimga4}" alt="" class="goodsimage">
                <img src="${item.listimga5}" alt="" class="goodsimage">
                <img src="${item.listimga6}" alt="" class="goodsimage">
                </div>
                <div class="selbox">
                <span class="selbtn"></span>
                <div class="selimgbox">
                    <div class="select">
                    <div class="selsimg">
                    <img src="${item.listimgb1}" alt="" class="goodschoice">
                    <img src="${item.listimgb2}" alt="" class="goodschoice">
                    <img src="${item.listimgb3}" alt="" class="goodschoice">
                    <img src="${item.listimgb4}" alt="" class="goodschoice">
                    <img src="${item.listimgb5}" alt="" class="goodschoice">
                    <img src="${item.listimgb6}" alt="" class="goodschoice">
                    </div>
                    </div>
                    </div>
                    <span class="selbtn"></span>
                </div>
                <p class="goodsprice">
                    <span class="price">￥${item.price}</span>
                    <span class="promote">抢购价</span>
                </p>
                <p class="name"><a href="###">${item.intro}</a></p>
                <span class="comment">
                    <img src="../img/comment.png" alt=""><a href="###">已有<span
                            class="buyer">${item.comment}</span>评价</a>
                </span>
                <div class="shop"><img src="../img/sell.png" alt=""><a
                        href="###">${item.shop}</a></div>
            </li>`
        }).join('');
        goodsBox.innerHTML = res;

        var pagebox = getId('pagebox');
        var $pagebox = pagebox;
        console.log($pagebox)
        var $total = arr.total;
        var $num = arr.num;
        $(window).load(function () {
            $('#pagebox').paging({
                totalPage: Math.ceil($total / $num),
                totalSize: $total,
                callback: function (num) {
                    init(num);
                    console.log(num);
                }
            });
            $('.result-sum .ti').html($total);
            $('.current').attr('disabled', true)
                .css('point-events', 'none')
                .addClass('.cannotselect')

        })
    }
    //制作盒子左右选项按钮
    function createSelBTns() {
        var goods = document.getElementsByClassName('goods');
        for (let i = 0; i < goods.length; i++) {
            var selBtn = goods[i].getElementsByClassName('selbtn'); //左右按钮
            // console.log(i);
            console.log(selBtn.length)
            // var selImgBox = goods[i].getElementsByClassName('selimgbox')[0]; //装小图片的外层盒子
            var selSImg = goods[i].getElementsByClassName('selsimg')[0]; //装小图片的内层盒子
            if (selSImg.offsetWidth > 162) { //当内层盒子宽度高于外层盒子宽度的时候显示按钮
                // selBtn[0].style.display = 'block';
                for (let i = 0; i < selBtn.length; i++) {
                    selBtn[i].style.display = 'block';
                }
            }
        }
    }
    //图片选项卡
    var posi = null; //声明一开始的位置
    function userEvent() {
        var goods = document.getElementsByClassName('goods');
        var goodsimg = document.getElementsByClassName('goods');
        var goodsBox = document.getElementsByClassName('goods-box')[0];
        console.log(goodsBox)
        goodsBox.onclick = function (ev) { //制作跳转到详情页
            // console.log(ev.target);
            if (ev.target.className == 'goodsimage') {
                console.log((ev.target.parentNode.parentNode).dataset.gid) //用dataset.自定义属性名读取自定义属性
                location.href = 'detail.html?gid=' + (ev.target.parentNode.parentNode).dataset.gid
            }
        }
        for (let k = 0; k < goods.length; k++) {
            goods[k].onmouseover = function () {
                // console.log(k);
                var goodsimg = goods[k].getElementsByClassName('goodsimg')[0]; //大图片盒子
                // console.log(goodsimg);
                var select = goods[k].getElementsByClassName('select')[0]; //小图片盒子
                // console.log(select);
                var goodsimage = goodsimg.getElementsByClassName('goodsimage'); //大图片
                // console.log(goodsimage);
                var goodschoice = select.getElementsByClassName('goodschoice'); //小图片
                // console.log(goodschoice);
                // console.log(goodschoice.length);
                for (let i = 0; i < goodschoice.length; i++) {
                    goodschoice[i].onmouseover = function () {
                        for (let j = 0; j < goodschoice.length; j++) {
                            goodsimage[j].style.display = 'none';
                            css(goodschoice[j],'border','1px solid #fff')
                        }
                        goodsimage[i].style.display = 'block';
                        css(goodschoice[i],'border','1px solid black')
                    }

                }
                //制作左右按钮功能
                var goLeft = goods[k].getElementsByClassName('selbtn')[0]; //向左移动按钮
                // console.log(goLeft);
                var goRight = goods[k].getElementsByClassName('selbtn')[1]; //向右移动按钮
                // console.log(goRight);
                // var selImgBox = goods[k].getElementsByClassName('selimgbox')[0];
                // console.log(selImgBox.offsetWidth);
                var selSImg = goods[k].getElementsByClassName('selsimg')[0];
                // var selImgBox = goods[k].getElementsByClassName('selimgbox')[0];
                // console.log(selSImg.offsetHeight );
                // console.log(selImgBox.offsetHeight);
                // console.log(selSImg.offsetWidth > selImgBox.offsetWidth);
                var smallImgSize = 32;
                // console.log(this);
                this.posi = getstyle(select, 'left'); //获取一开始的位置
                this.posi = parseInt(this.posi);
                var _this = this;
                // console.log(this.posi);
                goLeft.onclick = function () {
                    console.log(selSImg.offsetWidth);
                    if (selSImg.offsetWidth + _this.posi > 160) {
                        return;
                    }
                    _this.posi += smallImgSize;
                    select.style.left = _this.posi + 'px';
                }
                goRight.onclick = function () {
                    console.log(selSImg.offsetWidth + _this.posi);
                    if (selSImg.offsetWidth + _this.posi <= 160) {
                        return;
                    }
                    _this.posi -= smallImgSize;
                    select.style.left = _this.posi + 'px';
                }
            }
            $('#pagebox').on('click','a',function(){
                window.scrollTo(0,$('#gm-main').offset().top);
                console.log(this);
            })
        }
    }
    //检测登录与未登录的时候，顶部用户状态栏的显示
    var $topStatus = $('.gm-top-left:eq(0)');
    console.log($topStatus);
    if (getCookie('username')) {
        console.log('123');
        $topStatus.html('<a href="###">尊敬的用户：' + getCookie('username') + '</a><a href="###" class="quicklogin">退出登录<a/>');
    } else {
        $topStatus.html('<a href="###"> <li>国美会员</li></a> <a href="login.html"><li>登录</li></a><a href="register.html"><li>注册有礼</li></a>');
        console.log('123');
    }
    //退出登录功能;
    $('.quicklogin').click(function () {
        removeCookie('username');
        removeCookie('password');
        window.location.href = 'login.html';
    })
    //关闭广告功能：
    $('.close:eq(0)').click(function () {
        // $('#gmbox').remove($('#gm-head-ad'));
        // console.log($('#gm-head-ad'));
        $('#gm-head-ad').remove()
    })
})