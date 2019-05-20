<?php
//设置编码，防止乱码
header('content-type:text/html;charset=utf-8');
//连接数据库
include 'conUser.php';
//接收数据
$mes = isset($_POST['mes']) ? $_POST['mes'] : '';//传达操作指令
$uid = isset($_POST['uid']) ? $_POST['uid'] : '';
$psw = isset($_POST['psw']) ? $_POST['psw'] : '';
$tel = isset($_POST['tel']) ? $_POST['tel'] : '';
$recommend = isset($_POST['recommend']) ? $_POST['recommend'] : '';
//写数据语句
//判断mes信息
if ($mes == 'check') {
    //查询uid是否重名;
    //查询语句;
    $sql = "SELECT * FROM gmuser WHERE uid='$uid'";
    //执行语句;
    $res = $con->query($sql);
    if ($res->num_rows) {
        echo 'no';
    } else {
        echo 'yes';
    }
}
if ($mes == 'check1') {
    //查询tel是否激活过;
    //查询语句;
    $sql1 = "SELECT * FROM gmuser WHERE tel='$tel'";
    //执行语句;
    $res1 = $con->query($sql1);
    if ($res1->num_rows) {
        echo 'no';
    } else {
        echo 'yes';
    }
}
if ($mes == 'check2') {
    //查询帐号密码是否正确
    //查询语句;
    $sql3 ="SELECT * FROM gmuser WHERE uid='$uid' AND psw='$psw'";
    //执行语句;
    $res3 = $con->query($sql3);
    if ($res3->num_rows) {
        echo 'yes';
    } else {
        echo 'no';
    }
}
if ($mes == 'save') {//储存用户信息
//储存客户的信息
//查询语句
    $sql2 = "INSERT INTO gmuser(uid,psw,tel,recommend)VALUES('$uid','$psw','$tel','$recommend');";
//执行语句
    $res2 = $con->query($sql2);//插入语句insert/update/delete返回的是布尔值，根据布尔值提示前端
// var_dump($result);
    if ($res2) {
    //成功
        echo 'yes';
    } else {
        echo 'no';
    }
}

?>