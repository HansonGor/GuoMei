$(function () {
    //检测登录与未登录的时候，顶部用户状态栏的显示
    var $topStatus = $('.gm-top-left:eq(0)');
    // console.log($topStatus);
    if (getCookie('username')) {
        // console.log('123');
        $topStatus.html('<a href="###">尊敬的用户：' + getCookie('username') + '</a><a href="###" class="quicklogin">退出登录<a/>');
        p = new Promise(function (resolve) {
            {
                $.ajax({
                    type: 'post',
                    url: '../api/saveuserbuy.php',
                    async: true,
                    data: 'username=' + getCookie('username') + '&mes=get',
                    success: function ($str) {
                        resolve($str);
                    }
                })
            }
        })
        p.then(function (str) {
            //购物车渲染思路！有点强大！自己留意下！
            window.addEventListener('load', create(str), true); //如果登陆了，就渲染用户购物车的数据
            //userEvent，用户事件
            // window.addEventListener('load', userEvent(), true);

        })
    } else {
        $topStatus.html('<a href="###"> <li>国美会员</li></a> <a href="login.html"><li>登录</li></a><a href="register.html"><li>注册有礼</li></a>');
        // console.log('123');
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
    $(window).scroll(function () {
        // console.log(window.scrollY);
        if (window.scrollY <= $('#cartMain').offset().top + $('#cartMain').height() - $(window).height()) {
            // console.log(window.scrollY, $('#gm-cart').offset().top + $('#gm-cart').height() + 20 - $(window).height());
            $('#bar-wrapper').addClass('cart-active')
        } else {
            $('#bar-wrapper').removeClass('cart-active')
        }
    })
    //渲染用户名数据，通过cookie，如果登陆了，就通过用户名的id渲染用户的购物车数据
    function create($str) {
        var arr = JSON.parse($str); //把数据转化成对象
        console.log(arr);
        var map={};
        var    dest=[];
            for(var i=0;i<arr.length;i++){
                var ai=arr[i];
                if(!map[ai.shop]){
                    dest.push({
                        img:ai.img,
                        intro:ai.name,
                        num:ai.num,
                        price:ai.price,
                        shop:ai.shop,
                        username:ai.username,
                        data:[ai]
                    });
                    map[ai.shop]=ai
                }else{
                    for(var j=0;j<dest.length;j++){
                        var dj=dest[j];
                        if(dj.shop==ai.shop);
                        dj.data.push(ai);
                        break;
                    }
                }
            }
            console.log(dest);
        //如果商店名字一样就渲染在一齐
        // var $charobj = {}
        // $.each($arr, function ($i, $item) {
        //     /* 检验该商店名是否出现过(有点神奇，我一开始是想用indexOf来检验点名是否相同
        //         ，谁知道翻到自己笔记，找到老师字数统计，模仿了琳姐这个思路做出来了，666啊！ */
        //     if ($charobj[$item.shop]) {
        //         $charobj[$item.shop] += `<div class="shopping-goods-content">
        //         <div class="content-col-1">
        //         <input class="act-check-item" type="checkbox"/>
        //         </div>
        //         <div class="content-col-2">
        //         <img src="${$item.img}" alt="" style="width: 91px;height: 82px;">
        //         </div>
        //         <div class="col3-8 clearfix">
        //             <div class="content-col-3">
        //             ${$item.intro}
        //             </div>
        //             <div class="content-col-8">
        //                 颜色 ：白色
        //             </div>
        //         </div>
        //         <div class="content-col-4">¥ 3569.00</div>
        //         <div class="content-col-5">
        //             <div class="select-buy-box">
        //                 <a href="###" class="selectbtn">-</a>
        //                 <input type="text" value="${$item.num}" class="selectnum">
        //                 <a href="###" class="selectbtn">+</a>
        //             </div>
        //         </div>
        //         <div class="content-col-6">
        //             ${$item.price}
        //         </div>
        //         <div class="content-col-7">
        //             <a href="###" class="goods-remove">删除</a>
        //             <a href="###" class="goods-collect">移入收藏夹</a>
        //         </div>
        //     </div></div>`
        //     } else {
        //         $charobj[$item.shop] = `<div class="shopping-goods-box"><div class="shopping-goods-header">
        //         <div class="cart-col-1">
        //             <div class="shop-col-1">
        //             <input type="checkbox" class="act-check-shop-item"/>
        //             </div>
        //             <div class="shop-col-2">
        //                ${$item.shop}
        //             </div>
        //         </div>
        //     </div><div class="shopping-goods-content">
        //     <div class="content-col-1">
        //     <input class="act-check-item" type="checkbox"/>
        //     </div>
        //     <div class="content-col-2">
        //     <img src="${$item.img}" alt="" style="width: 91px;height: 82px;">
        //     </div>
        //     <div class="col3-8 clearfix">
        //         <div class="content-col-3">
        //         ${$item.intro}
        //         </div>
        //         <div class="content-col-8">
        //             颜色 ：白色
        //         </div>
        //     </div>
        //     <div class="content-col-4">¥ 3569.00</div>
        //     <div class="content-col-5">
        //         <div class="select-buy-box">
        //             <a href="###" class="selectbtn">-</a>
        //             <input type="text" value="${$item.num}" class="selectnum">
        //             <a href="###" class="selectbtn">+</a>
        //         </div>
        //     </div>
        //     <div class="content-col-6">
        //         ${$item.price}
        //     </div>
        //     <div class="content-col-7">
        //         <a href="###" class="goods-remove">删除</a>
        //         <a href="###" class="goods-collect">移入收藏夹</a>
        //     </div>
        // </div></div>`
        //     }
        // })
        //    console.log($charobj);
        // var $html = ''
        // for (var key in $charobj) {
        //     $html += $charobj[key]
        // }
        // $('#content').html($html);
    }

    function userEvent() {
        //全选的checkbox选中和未选中的样式
        var $allCheckAll = $('.act-check-all-item'); //所有全选按钮;
        var $allCheckAll2 = $('.act-check-all2-item');
        var $allCheck = $('.act-check-shop-item'); //一个商店的全选按钮;
        console.log($allCheckAll)
        var $check = $('.act-check-item'); //一个商店的选择按钮;
        var $shopBox = $('.shopping-goods-box'); //每个商店的盒子
        $allCheckAll.click(function () {
            // console.log($allCheckAll.prop('checked'))
            //所有全选按钮与其它选择按钮关系
            if ($allCheckAll.prop('checked')) {
                $allCheck.prop('checked', true);
                $check.prop('checked', true);
                $allCheckAll2.prop('checked', true);
            } else {
                $allCheck.prop('checked', false);
                $check.prop('checked', false);
                $allCheckAll2.prop('checked', false);
            }
        })
        $allCheckAll2.click(function () {
            // console.log($allCheckAll.prop('checked'))
            //所有全选按钮与其它选择按钮关系
            if ($allCheckAll2.prop('checked')) {
                $allCheck.prop('checked', true);
                $check.prop('checked', true);
                $allCheckAll.prop('checked', true);
            } else {
                $allCheck.prop('checked', false);
                $check.prop('checked', false);
                $allCheckAll.prop('checked', false);
            }
        })
        //一个商店的按钮与其下属按钮的关系
        $shopBox.each(function () {
            var $this = $(this);
            var $thisSonCheck = $this.find('.act-check-item');
            $thisSonCheck.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$thissonCheck都选中则店铺全选打对勾！
                        var $len =$thisSonCheck.size();
                        var $num=0;
                        $thisSonCheck.each(function(){
                            
                        })
                    }
                })
            })
        })
    }

})