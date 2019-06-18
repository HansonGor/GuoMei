$(function () {
    //轮播图效果
    //动作播放;
    var $bannerBox = $('#gm-banner'); //banner盒子
    var $banImg = $('#banImgBox .banImg'); //每张图片
    var $selBtn = $('#gm-banner .selBtn'); //焦点按钮
    var $goleft = $('.go_l').eq(0);
    // console.log($goleft)
    var $goright = $('.go_r').eq(0);
    var $i = 0;

    function next() {
        startMove($banImg[$i], {
            'opacity': 0
        });
        $banImg.eq($i).removeClass('zindex');
        $selBtn.eq($i).removeClass('selBtnAc');
        ++$i;
        if ($i >= $banImg.size()) {
            $i = 0;
        }
        startMove($banImg[$i], {
            'opacity': 100
        });
        $banImg.eq($i).addClass('zindex');
        $selBtn.eq($i).addClass('selBtnAc');
    }

    function pre() {
        startMove($banImg[$i], {
            'opacity': 0
        });
        $banImg.eq($i).removeClass('zindex');
        $selBtn.eq($i).removeClass('selBtnAc');
        --$i;
        if ($i <= -1) {
            $i = $banImg.size() - 1;
        }
        startMove($banImg[$i], {
            'opacity': 100
        });
        $banImg.eq($i).addClass('zindex');
        $selBtn.eq($i).addClass('selBtnAc');
    }
    $goleft.click(function () {
        pre()
    })
    $goright.click(function () {
        next()
    })
    var $timer = null;
    $timer = setInterval(next, 3500);
    //焦点跟随，选项卡，触摸式停止播放，离开时继续播放
    $bannerBox.mouseover(function () {
        clearInterval($timer);
    })
    $bannerBox.mouseout(function () {
        $timer = setInterval(next, 3500);
    })
    $selBtn.mouseover(function () {
        $(this).addClass('selBtnAc')
            .siblings()
            .removeClass('selBtnAc');
        $banImg.eq($(this).index())
            .addClass('zindex')
            .animate({ //轮播图缓冲动画
                'opacity': 1
            }, 300, 'linear')
            .siblings()
            .removeClass('zindex')
            .css('opacity', 0);
        $i = $(this).index()
    })
    //导航效果;
    var gmCategory = getId('gm-category');
    var catemainL = getClassName(gmCategory, 'catemain-l')[0]
    // console.log(catemainL);
    var data = [{ //第一条
        dataT: ['潮3C&nbsp;&gt;', '手机充值&nbsp;&gt;', '数码&nbsp;&gt;', '依旧换新&nbsp;&gt;', '手机充值&nbsp;&gt;', '延保服务&nbsp;&gt;', '智享生活&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第二条
        dataT: ['潮3C&nbsp;&gt;', '数码&nbsp;&gt;', '以旧换新&nbsp;&gt;', '延保服务&nbsp;&gt;', '智享生活&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第三条
        dataT: ['潮3C&nbsp;&gt;', '电脑办公&nbsp;&gt;', '精品精英&nbsp;&gt;', '以旧换新&nbsp;&gt;', '美通卡&nbsp;&gt;', '研报服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第四条
        dataT: ['电视影音&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '延保服务&nbsp;&gt;', '智享生活&nbsp;&gt;', '研报服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第五条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第六条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第七条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第八条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第九条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十一条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十二条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十三条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十四条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }, { //第十五条
        dataT: ['空调&nbsp;&gt;', '冰箱&nbsp;&gt;', '洗衣机&nbsp;&gt;', '家电节能专区&nbsp;&gt;', '美通卡&nbsp;&gt;', '以旧换新&nbsp;&gt;', '以旧换新&nbsp;&gt;', '家电清洗服务&nbsp;&gt;'],
        dataM: [{
            dataDt: '手机通讯',
            dataDd: ['手机', '对讲机', 'iphone', '华为', '小米', '荣耀', '三星', 'OPPO', 'vivo']
        }, {
            dataDt: '运营商',
            dataDd: ['中国移动', '中国联通']
        }, {
            dataDt: '手机配件',
            dataDd: ['手机盒', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '移动电源', '蓝牙耳机', '手机电池', '苹果周边', '车载配件']
        }, {
            dataDt: '充话费',
            dataDd: ['移动/联通/电信/极信']
        }, {
            dataDt: '充流量',
            dataDd: ['移动/联通/电信']
        }]
    }]
    // console.log(data.length)
    // 绑定指定索引
    var cate = getClassName(gmCategory, 'cate');
    var cateMain = getClassName(document, 'catemain')[0];
    var cateWrap = getClassName(document, 'cateWrap')[0];
    var bannerBox = getId('gm-banner');
    var allCategory = getClassName(document, 'allCategory')[0];
    // console.log(allCategory);
    enterNav();

    function enterNav() {
        for (let i = 0; i < cate.length; i++) {
            cate[i].onmouseover = cateMain.onmouseover = function () {
                cateWrap.style.display = 'block';
                cateMain.style.display = 'block';
                var html = '<ul class="l-top clearfix">';
                html += data[i].dataT.map(function (item) {
                    return `<li><a href="###">${item}</a></li>`
                }).join('');
                html += '</ul>';
                html += data[i].dataM.map(function (item) {
                    return `<dl class="l-main clearfix"><dt>${item.dataDt}</dt><div class="l-content">
                    ${item.dataDd.map(function(item){   
                        return `<dd><a href="###">${item}</a></dd>`
                    }).join('')}
                       </div></dl>`
                }).join('');
                // console.log(html);
                catemainL.innerHTML = html;
                if (window.scrollY >= cateWrap.offsetTop + gmCategory.offsetTop && window.scrollY <= cateWrap.offsetTop + gmCategory.offsetTop + bannerBox.offsetHeight) {
                    // console.log('Yes');
                    cateMain.style.position = 'fixed';
                    cateMain.style.top = '0';
                    cateMain.style.left = '300px';
                } else {
                    cateMain.style.position = 'absolute';
                    cateMain.style.top = '41px';
                    cateMain.style.left = '225px';
                }
            }
            cate[i].onmouseout = cateMain.onmouseout = function () {
                cateMain.style.display = 'none';
                if (window.scrollY >= bannerBox.offsetTop + bannerBox.offsetHeight) {
                    cateWrap.style.display = 'none';
                } else {
                    cateWrap.style.display = 'block';
                }
            }
        }

    }

    // console.log(gmCategory.offsetTop);
    var contain = getClassName(document, 'contain')[0];
    var levelBox = getId('gm-levelnav');
    var level = getClassName(levelBox, 'level');
    var mainBox = getId('gm-main');
    var tall = null;
    var main = getClassName(mainBox, 'main');
    var levelPre = getId('levelpre');
    var levelNext = getId('levelnext');
    var footer = getId('gm-footer');
    //楼层跳跃选项卡
    for (let i = 0; i < level.length; i++) {
        level[i].onclick = function () {
            tall = mainBox.offsetTop + main[i].offsetTop - 40;
            var itall = 94;
            // clearInterval(distallTimer);
            //假如window.scrollY>=main[i].offsetTop,则window.scrollY-itall
            distallTimer = setInterval(function () {
                if (window.scrollY >= tall) {
                    console.log(1)
                    var distall = window.scrollY - itall;
                    if (distall >= tall) {
                        window.scrollTo(0, distall)
                    } else {
                        window.scrollTo(0, tall);
                        clearInterval(distallTimer);
                    }
                } else if (window.scrollY < tall) {
                    console.log(2)
                    var distall = window.scrollY + itall;
                    if (distall <= tall) {
                        window.scrollTo(0, distall)
                    } else {
                        window.scrollTo(0, tall);
                        clearInterval(distallTimer);
                    }
                }
            }, 20)
        }
    }
    //回到顶部
    function topTop() {
        DisTopTimer = setInterval(function () {
            var i = 47;
            var disTop = window.scrollY - i;
            if (disTop > 0) {
                window.scrollTo(0, disTop)
                console.log(123)
            } else {
                clearInterval(DisTopTimer);
                window.scrollTo(0, 0);
            }
        })
    }
    levelPre.onclick = function () {
        topTop()
    }
    //回到底部
    // console.log(document.body.offsetHeight - window.innerHeight);
    levelNext.onclick = function () {
        DisFootTimer = setInterval(function () {
            var i = 47;
            var disFoot = window.scrollY + i;
            if (disFoot <= document.body.offsetHeight - window.innerHeight) {
                window.scrollTo(0, disFoot);
                console.log(123)
            } else {
                clearInterval(DisFootTimer);
                window.scrollTo(0, footer.offsetTop);
            }
        })
    }
    window.onscroll = function () {
        //吸顶菜单
        for(let i=0;i<level.length;i++){
            css(level[i],'color','#5e5e5e')
        }
        for (let i = 0; i < main.length; i++) {
            if (window.scrollY <= main[i].offsetTop+mainBox.offsetTop+main[i].offsetHeight-40) {
                css(level[i],'color','red');
                break;
            }
        }
        if (window.scrollY >= bannerBox.offsetTop + bannerBox.offsetHeight) {
            cateMain.style.display = 'none';
        }
        if (window.scrollY >= bannerBox.offsetTop + bannerBox.offsetHeight) {
            // console.log('yes');
            gmCategory.style.position = 'fixed';
            gmCategory.style.top = '0';
            cateWrap.style.display = 'none';
            cateMain.onmouseover = cateWrap.onmouseover = allCategory.onmouseover = function () {
                cateWrap.style.display = 'block';
                enterNav();
            }
            cateMain.onmouseout = allCategory.onmouseout = cateWrap.onmouseout = function () {
                if (window.scrollY >= bannerBox.offsetTop + bannerBox.offsetHeight) {
                    cateWrap.style.display = 'none';
                } else {
                    cateWrap.style.display = 'block';
                }
            }
        } else {
            gmCategory.style.position = 'relative';
            cateWrap.style.display = 'block';
        }
        //楼层跳跃显示与隐藏与右下方“回到顶部”隐藏与出现
        if (window.scrollY >= mainBox.offsetTop - 110) {
            css(levelBox, 'display', 'block');
            $('.totop:eq(0)').css('display', 'block');
        } else {
            css(levelBox, 'display', 'none');
            $('.totop:eq(0)').css('display', 'none');
        }
    }
    //检测登录与未登录的时候，顶部用户状态栏的显示
    var $topStatus = $('.gm-top-left:eq(0)');
    console.log($topStatus);
    if (getCookie('username')) {
        console.log('123');
        $topStatus.html('<a href="###">尊敬的用户：' + getCookie('username') + '</a><a href="###" class="quicklogin">退出登录<a/>');
    } else {
        $topStatus.html('<a href="###"> <li>国美会员</li></a> <a href="html/login.html"><li>登录</li></a><a href="html/register.html"><li>注册有礼</li></a>');
        console.log('123');
    }
    //退出登录功能;
    $('.quicklogin').click(function () {
        removeCookie('username');
        removeCookie('password');
        window.location.href = 'html/login.html';
    })
    //关闭广告功能：
    $('.close:eq(0)').click(function () {
        // $('#gmbox').remove($('#gm-head-ad'));
        // console.log($('#gm-head-ad'));
        $('#gm-head-ad').remove()
    })
    $('.totop:eq(0)').click(function () {
        topTop()
    })
})