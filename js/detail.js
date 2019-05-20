$(function () {
    var $gidData = decodeURI(location.search); //接收传过来的参数
    var $gidStr = $gidData.slice(1); //将参数传过来带的?去掉，“1”为从第一位字符开始截取
    // var $detailBox=$('#gm-main');
    // console.log($detailBox)
    var $p = new Promise(function (resolve) {
        $.ajax({
            type: 'get',
            url: '../api/gsGoodsDate.php',
            data: $gidStr + '&mes=get2',
            success: function ($str) {
                resolve($str); //渲染数据
            }
        })
    })
    $p.then(function ($str) {
        create($str);
        $(window).load(function () {
            setTimeout(function () {
                userEvent();
            }, 2000)
        })
    })

    function createSelBtn() {
        var selBtn = getClassName(document, 'selbtn');
        // console.log(selBtn.length);
        var selectWidth = getClassName(document, 'select-width')[0];
        // console.log(selectWidth.offsetWidth)
        if (selectWidth.offsetWidth > 352) {
            for (let i = 0; i < selBtn.length; i++) { //当内层盒子宽度高于外层盒子宽度的时候显示按钮
                selBtn[i].style.display = 'block';
            }
        }
    }

    function create($str) {
        var $arr = JSON.parse($str);
        // console.log($arr);
        $obj = $arr[0];
        var $html = `  
        <div class="contain clearfix rel">
        <div class="goods-bigimg">
        <div id="bigbox">
            <img src="${$obj.detailimgb1}" alt="" class="goodsbigimage z-level">
            <img src="${$obj.detailimgb2}" alt="" class="goodsbigimage">
            <img src="${$obj.detailimgb3}" alt="" class="goodsbigimage">
            <img src="${$obj.detailimgb4}" alt="" class="goodsbigimage">
            <img src="${$obj.detailimgb5}" alt="" class="goodsbigimage">
            <img src="${$obj.detailimgb6}" alt="" class="goodsbigimage">
        </div>
        </div>
        <div class="detail-left">
            <div class="goods-box">
            <div id="magnifying-glass-box"></div>
                <img src="${$obj.detailimgb1}" alt="" class="goodsimage">
                <img src="${$obj.detailimgb2}" alt="" class="goodsimage">
                <img src="${$obj.detailimgb3}" alt="" class="goodsimage">
                <img src="${$obj.detailimgb4}" alt="" class="goodsimage">
                <img src="${$obj.detailimgb5}" alt="" class="goodsimage">
                <img src="${$obj.detailimgb6}" alt="" class="goodsimage">
            </div>
            <div class="goods-select-box">
                <span class="selbtn" id="prebtn"></span>
                <div class="goods-select">
                <div class="select-width-box">
                <div class="select-width">
                    <img src="${$obj.detailimga1}" alt="" class="goodschoice">
                    <img src="${$obj.detailimga2}" alt="" class="goodschoice">
                    <img src="${$obj.detailimga3}" alt="" class="goodschoice">
                    <img src="${$obj.detailimga4}" alt="" class="goodschoice">
                    <img src="${$obj.detailimga5}" alt="" class="goodschoice">
                    <img src="${$obj.detailimga6}" alt="" class="goodschoice">
                    </div>
                </div>
                </div>
                <span class="selbtn" id="nextbtn"></span>
            </div>
        </div>
        <div class="detail-right">
                <p class="goods-shop">店名：${$obj.shop}</p>
            <h1 class="goods-intro">
            ${$obj.intro}
            </h1>
            <div class="goods-status clearfix">
                <div class="status-left">
                    <p class="goods-price">
                        抢&nbsp;&nbsp;购&nbsp;&nbsp;价&nbsp;&nbsp;<span
                            class="price">¥${$obj.price}</span><del>￥16888.00</del>&nbsp;&nbsp;&nbsp;<a href="###"
                            class="ib">降价通知</a>

                    </p>
                </div>
                <div class="status-right">
                    <span>好评度99%</span>
                    <a href="###" class="goods-comment">${$obj.comment}人评价</a>
                </div>
            </div>
            <div class="goods-style">
                <dl class="color-style">
                    <dt class="style-title">颜&nbsp;&nbsp;&nbsp;色&nbsp;&nbsp;&nbsp;</dt>
                    <dd class="style-content">金色</dd>
                    <dd class="style-content">银色</dd>
                    <dd class="style-content">深灰色</dd>
                </dl>
                <dl class="copy-style">
                    <dt class="style-title">版&nbsp;&nbsp;&nbsp;本&nbsp;&nbsp;&nbsp;</dt>
                    <dd class="style-content">全网通64GB</dd>
                    <dd class="style-content">全网通256GB</dd>
                    <dd class="style-content">全网通512GB</dd>
                </dl>
            </div>
            <div class="goods-add clearfix">
                <div class="buy-num-box clearfix">
                <span class="inf">最多购买5件</span>
                <input class="buy-num" type="text" oninput="this.value=this.value.replace(/[^1-5]/g,'')" value="1" maxlength="1"/>
                    <div class="buy-num-select">
                        <div class="buy-select cannotselect">+</div>
                        <div class="buy-select cannotselect">-</div>
                    </div>
                </div>
                <div class="goods-tocart cannotselect">加入购物车</div>
                <div class="goods-tophone"></div>
            </div>

        </div>
    </div>
        `
        // console.log($html);
        $('#gm-main').html($html);
        $(window).load(function () {
            setTimeout(function () {
                createSelBtn();
            }, 800)
        })
        console.log(123)
        //
        console.log($('.buy-num:eq(0)'))
        $('.buy-num:eq(0)').focus(function () {
            console.log(123)
            $('.inf:eq(0)').css('display', 'inline-block');
        })
        $('.buy-num:eq(0)').blur(function () {
            $('.inf:eq(0)').css('display', 'none');
        })
    }

    function userEvent() {
        //以下做图片选项卡
        var $goodsimage = $('.goods-box:eq(0) .goodsimage');
        // console.log($goodsimage);
        var $goodschoice = $('.goods-select:eq(0) .goodschoice');
        // console.log($goodschoice);
        var $inum = 0; //是为了储存购买哪一张图片的商品
        $goodschoice.mouseover(function () {
            // console.log($(this).index());
            $goodschoice.eq($(this).index())
                .css('border', '1px solid red')
                .siblings()
                .css('border', '1px solid #fff')
            $goodsimage.eq($(this).index())
                .css('display', 'block')
                .siblings()
                .css('display', 'none');
            $inum = $(this).index();
            $('.goodsbigimage').eq($(this).index())
                .addClass('z-level')
                .siblings()
                .removeClass('z-level')
        })
        //以下做购买数量
        var $buyNum = $('.goods-add:eq(0) .buy-num:eq(0)');
        // console.log($buyNum)
        var $add = $('.goods-add:eq(0) .buy-select:eq(0)');
        var $reduce = $('.goods-add:eq(0) .buy-select:eq(1)');
        // console.log($add);
        // console.log($reduce);
        $add.click(function () {
            var $num = $buyNum.val();
            ++$num;
            // console.log($num);
            if ($num >= 5) {
                $num = 5;
            }
            $buyNum.val($num);
        })
        $reduce.click(function () {
            var $num = $buyNum.val();
            --$num;
            // console.log($num);
            if ($num <= 1) {
                $num = 1;
            }
            $buyNum.val($num);
        })
        //以下做加入购物车
        var $goodsToCart = $('.goods-add:eq(0) .goods-tocart:eq(0)');
        $goodsToCart.click(function () {
            $.ajax({
                type:'post',
                url:'../api/saveuserbuy.php',
                async:true,
                data:'username='+getCookie('username')+'&img='+$goodschoice.eq($inum).attr('src')+'&shop='+$obj.shop+'&intro='+$obj.intro+'&price='+$obj.price+'&num='+$buyNum.val()+'&mes=save',
                success:function(str){
                    console.log(str)
                }
            })
            // console.log('username=' + getCookie('username') + '&img=' + $goodschoice.eq($inum).attr('src') + '&shop=' + $obj.shop + '&intro=' + $obj.intro + '&price=' + $obj.price + '&num=' + $buyNum.html() + '&mes=save')
        })
        //以下做放大镜
        var con = getClassName(document, 'contain')[2];
        // console.log(con.offsetLeft);
        var goodsBox = getClassName(document, 'goods-box')[0];
        // console.log(goodsBox.offsetTop);
        var glassBox = getId('magnifying-glass-box');
        // console.log(glassBox);
        var mainBox = getId('gm-main');
        // console.log(mainBox.offsetTop);
        var bigBox = getId('bigbox');
        goodsBigBox = getClassName(document, 'goods-bigimg')[0];
        goodsBox.onmousemove = function (ev) {
            glassBox.style.display = 'block';
            goodsBigBox.style.display = 'block';
            glassMove(ev)

        }
        goodsBox.onmouseout = function () {
            glassBox.style.display = 'none';
            goodsBigBox.style.display = 'none';
        }

        function glassMove(ev) {
            var l = ev.pageX - con.offsetLeft - glassBox.offsetWidth / 2;
            l <= 0 ? l = 0 : l;
            // console.log(ev.pageX);
            // console.log(l);
            l >= goodsBox.offsetWidth - glassBox.offsetWidth ? l = goodsBox.offsetWidth - glassBox.offsetWidth : l
            glassBox.style.left = l + 'px';
            // console.log(ev.pageY - mainBox.offsetTop - glassBox.offsetHeight / 2);
            var t = ev.pageY - mainBox.offsetTop - glassBox.offsetHeight / 2;
            t <= 0 ? t = 0 : t;
            t >= goodsBox.offsetHeight - glassBox.offsetHeight ? t = goodsBox.offsetHeight - glassBox.offsetHeight : t;
            glassBox.style.top = t + 'px';
            var bl = -l * 3;
            var bt = -t * 3;
            bigBox.style.left = bl + 'px';
            bigBox.style.top = bt + 'px';
            //计算放大比例
            /*              150宽高放大镜
                   450规格：    占比1/3:150
        变成：     1350规格：    占比1/3:450
                    */
        }

        //以下做左右选择按钮：
        var selectWidth = getClassName(document, 'select-width')[0]; //内层装小图盒子
        var selectWidthBox = getClassName(document, 'select-width-box')[0] //外层装小图盒子
        // console.log(selectWidth.offsetWidth);
        // console.log(selectWidthBox);
        var preBtn = getId('prebtn');
        var nextbtn = getId('nextbtn');
        var smallImgSize = 68;
        preBtn.onclick = function () {
            var posi = parseInt(getstyle(selectWidthBox, 'left'));
            console.log(selectWidth.offsetWidth);
            if (selectWidth.offsetWidth + posi >= 350) {
                return;
            }
            posi += smallImgSize;
            selectWidthBox.style.left = posi + 'px';
        }
        nextbtn.onclick = function () {
            var posi = parseInt(getstyle(selectWidthBox, 'left'));
            console.log(selectWidth.offsetWidth);
            if (selectWidth.offsetWidth + posi < 350) {
                return;
            }
            posi -= smallImgSize;
            console.log(posi);
            selectWidthBox.style.left = posi + 'px';

        }
    }
    //检测登录与未登录的时候，顶部用户状态栏的显示
    var $topStatus = $('.gm-top-left:eq(0)');
    // console.log($topStatus);
    if (getCookie('username')) {
        // console.log('123');
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