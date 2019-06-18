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
                        // console.log(str)
                        resolve($str);
                    }
                })
            }
        })
        p.then(function ($str) {
            //购物车渲染思路！有点强大！自己留意下！
            window.addEventListener('load', create($str), true); //如果登陆了，就渲染用户购物车的数据
            //userEvent，用户事件
            window.addEventListener('load', userEvent(), true);

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
            $('#cart-bottom').addClass('cart-active')
        } else {
            $('#cart-bottom').removeClass('cart-active')
        }
    })
    //渲染用户名数据，通过cookie，如果登陆了，就通过用户名的id渲染用户的购物车数据
    function create(str) {
        // console.log(str)
        var arr = JSON.parse(str); //把数据转化成对象
        // console.log(arr);
        var map = {};
        var dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            // console.log(ai)
            if (!map[ai.shop]) {
                dest.push({
                    // img: ai.img,
                    // intro: ai.name,
                    // num: ai.num,
                    // price: ai.price,
                    shop: ai.shop,
                    // username: ai.username,
                    data: [ai]
                });
                map[ai.shop] = ai
                // console.log(map,i)
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.shop === ai.shop){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        console.log(map)
        console.log(dest)
        //如果商店名字一样就渲染在一齐
        var cartMain = $('#cartMain');
        var html = '<div class="container">'
        html += dest.map(function (item) {
            return ` <div class="shopping-goods-box cartBox"><div class="shopping-goods-header shop_info">
            <div class="cart-col-1">
                <div class="shop-col-1">
                    <input type="checkbox" id="shop_a" class="shopChoice" />
                </div>
                <div class="shop-col-2">
                    ${item.shop}
                </div>
            </div>
        </div>${item.data.map(function(item){
            return ` <div class="shopping-goods-content order_content">
            <div class="content-col-1">
                <input class="son_check" type="checkbox" />
            </div>
            <div class="content-col-2">
                <img src="${item.img}" alt="" style="width: 91px;height: 82px;">
            </div>
            <div class="col3-8 clearfix">
                <div class="content-col-3">
                    ${item.intro}
                </div>
                <div class="content-col-8">
                    颜色 ：白色
                </div>
            </div>
            <div class="content-col-4 pirce">￥${item.price}</div>
            <div class="content-col-5">
                <div class="select-buy-box">
                    <a href="###" class="selectbtn reduce">-</a>
                    <input type="text" value="${item.num}" class="selectnum  sum">
                    <a href="###" class="selectbtn plus">+</a>
                </div>
            </div>
            <div class="content-col-6 list_sum">￥${(item.price*item.num).toFixed(2)}</div>
            <div class="content-col-7">
                <a href="###" class="goods-remove delBtn">删除</a>
                <a href="###" class="goods-collect">移入收藏夹</a>

            </div>
        </div>`
        })}</div>`
        }).join('');
        html += '</div>';
        cartMain.html(html);
    }

    function userEvent() {
        //全局的checkbox选中和未选中的样式
        var $shopBox = $('#gm-cart');
        $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
            $wholeChexbox = $('.whole_check'),
            $cartBox = $('.shopping-goods-box'), //每个商铺盒子
            $shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
            $sonCheckBox = $('.son_check'); //每个商铺下的商品的checkbox

        //===============================================全局全选与单个商品的关系================================
        $wholeChexbox.click(function () {
            var $checkboxs = $shopBox.find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                // $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                // $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });
        $sonCheckBox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：所有单个商品是否勾选
                    var len = $sonCheckBox.length;
                    var num = 0;
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');
                }
            })
            totalMoney();
        })
        //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

        //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
        $shopCheckbox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：店铺全选中，则全局全选按钮打对勾。
                    var len = $shopCheckbox.length;
                    console.log(len)
                    var num = 0;
                    $shopCheckbox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        // $wholeChexbox.next('label').addClass('mark');
                    }

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                    // $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                } else {
                    //否则，全局全选按钮取消对勾
                    $wholeChexbox.prop("checked", false);
                    // $wholeChexbox.next('label').removeClass('mark');

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                    $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });
        //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

        //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
        $cartBox.each(function () {
            var $this = $(this);
            var $sonChecks = $this.find('.son_check');
            $sonChecks.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                        var len = $sonChecks.length;
                        var num = 0;
                        $sonChecks.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                                console.log(num, len)
                            }
                        });
                        if (num == len) {
                            console.log(123)
                            $(this).parents('.shopping-goods-box').find('.shopping-goods-header').find('.cart-col-1').find('.shop-col-1').find('.shopChoice').prop("checked", true);
                            // $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                        }

                    } else {
                        //否则，店铺全选取消
                        $(this).parents('.shopping-goods-box').find('.shopping-goods-header').find('.cart-col-1').find('.shop-col-1').find('.shopChoice').prop("checked", false);
                        // $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });
        });


        //=================================================商品数量==============================================
        var $plus = $('.plus'),
            $reduce = $('.reduce'),
            $all_sum = $('.sum');
        $plus.click(function () {
            var $inputVal = $(this).prev('input'),
                $count = parseInt($inputVal.val()) + 1,
                $price = $(this).parents('.select-buy-box').parents('.content-col-5').prev('.pirce').html().substring(1), //单价
                $priceTotalObj = $(this).parents('.select-buy-box').parents('.content-col-5').next('.list_sum');
            console.log($price)
            if ($count >= 5) {
                $count = 5;
            };

            $inputVal.val($count);
            $priceTotalObj.html('¥' + ($count * parseInt($price)).toFixed(2));
            // $priceTotalObj.html('￥'+$priceTotal);

            totalMoney();
        });

        $reduce.click(function () {
            var $inputVal = $(this).next('input'),
                $count = parseInt($inputVal.val()) - 1,
                $price = $(this).parents('.select-buy-box').parents('.content-col-5').prev('.pirce').html().substring(1), //单价
                $priceTotalObj = $(this).parents('.select-buy-box').parents('.content-col-5').next('.list_sum');
            console.log(123);
            if ($count <= 1) {
                $count = 1;
            };

            $inputVal.val($count);
            $priceTotalObj.html('¥' + ($count * parseInt($price)).toFixed(2));
            // $priceTotalObj.html('￥'+$priceTotal);

            totalMoney();
        });


        $all_sum.keyup(function () {
            var $count = 0,
                $priceTotalObj = $(this).parents('.select-buy-box').parents('.content-col-5').next('.list_sum')
            $price = $(this).parents('.select-buy-box').parents('.content-col-5').prev('.pirce').html(), //单价
                $priceTotal = 0;
            if ($(this).val() == '') {
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g, ''));
            $count = $(this).val();
            $priceTotal = $count * parseInt($price);
            $(this).attr('value', $count);
            $priceTotalObj.html('¥' + ($count * parseInt($price)).toFixed(2));
            totalMoney();
        });
        //======================================移除商品========================================

        var $order_lists = null;
        $('.delBtn').click(function () {
            $order_lists = $(this).parents('.shopping-goods-content');
            console.log($order_lists);
            $order_content = $order_lists.parents('#cartMain');
            $res = confirm('确认移出商品？');
            if ($res) {
                $order_lists.remove();
            }
            totalMoney();
            var $this = $(this);
            // console.log($(this).parents('.shopping-goods-content').find('.content-col-2').find('img').attr('src'))
            $.ajax({
                type: 'post',
                url: '../api/saveuserbuy.php',
                async: true,
                data: 'username=' + getCookie('username') + '&img=' + $this.parents('.shopping-goods-content').find('.content-col-2').find('img').attr('src') + '&mes=del',
                success: function ($str) {
                    // resolve($str);
                }
            })
        });

        //======================================总计==========================================

        function totalMoney() {
            var total_money = 0;
            var total_count = 0;
            var calBtn = $('.calBtn a');
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    var num = parseInt($(this).parents('.shopping-goods-content').find('.content-col-5').find('.sum').val());
                    // console.log($(this).parents('.shopping-goods-content').find('.list_sum').html().substring(1))
                    var goods = parseInt($(this).parents('.shopping-goods-content').find('.list_sum').html().substring(1));
                    // console.log(goods)
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.total_text').html('￥' + total_money.toFixed(2));
            $('.piece_num').html(total_count);

            // console.log(total_money,total_count);

            // if (total_money != 0 && total_count != 0) {
            //     if (!calBtn.hasClass('btn_sty')) {
            //         calBtn.addClass('btn_sty');
            //     }
            // } else {
            //     if (calBtn.hasClass('btn_sty')) {
            //         calBtn.removeClass('btn_sty');
            //     }
            // }
        }


    }
})