$(function () {
    //选择登录方式
    $tabLeft = $('#tabLeft');
    $tabRight = $('#tabRight');
    $telLogin = $('#telLogin');
    $userpsw = $('#userpsw');
    $tabisok = false;
    $tabLeft.click(function () {
        if ($tabisok == true) {
            $telLogin.css('display', 'none');
            $userpsw.css('display', 'block');
            $tabisok = false;
        }
    })
    $tabRight.click(function () {
        if ($tabisok == false) {
            $telLogin.css('display', 'block');
            $userpsw.css('display', 'none');
            $tabisok = true;
        }
    })
    //展示更多按钮
    $orderMore = $('.orderMore'); //绑定
    $more = $('.more');
    $isok = true;
    $orderMore.click(function () {
        if ($isok) {
            $orderMore.css('background-position-y', '-25px');
            $more.addClass('active');
        } else {
            $orderMore.css('background-position-y', '0px');
            $more.removeClass('active');
        }
        $isok = !$isok;
    })
    //用ajaxs检验帐号密码是否正确;
    $uid = $('#loginName');
    $psw = $('#loginPassword');
    $sub = $('#sub');
    $sub.click(function () {
        console.log($uid.val());
        $.ajax({
            type: 'post',
            url: '../api/gmSaveUser.php',
            data: 'uid=' + $uid.val() + '&psw=' + $psw.val() + '&mes=check2',
            success: function (str) {
                //   console.log(str);
                if (str == 'yes') {
                    alert('登录成功');
                    setCookie('username', $uid.val(), 7);
                    setCookie('password', $psw.val(), 7);
                    location.href = '../index.html'
                } else {
                    alert('登录失败，请检查密码和帐号是否正确');
                }
            }
        });
    })
    //自动登录功能
    var $autoLoginFlag = $('#autoLoginFlag');
    console.log($autoLoginFlag)
    $autoLoginFlag.click(function () {
        if ($autoLoginFlag.attr('checked')) {
            $autoLoginFlag.removeAttr('checked');
            removeCookie('autologin');
        } else {
            $autoLoginFlag.attr('checked', 'checked');
            console.log('yes');
            setCookie('autologin', 'yes', 7);
        }
    })
    if (getCookie('username') && getCookie('password')) {
        $('#loginName').val(getCookie('username'));
        $('#loginPassword').val(getCookie('password'));
        if (getCookie('autologin')) {
            $('#autoLoginFlag').attr('checked','checked');
              window.location.href="../index.html";//当检测到密码和账户（已用数据库验证设置），并且客户点击自动登录，则自动登录
        }
    }else{
        $autoLoginFlag.removeAttr('checked');
        removeCookie('autologin');
    }

})