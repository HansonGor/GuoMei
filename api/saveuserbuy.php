<?php
//设置编码，防止乱码
header('content-type:text/html;charset=utf-8');
//连接数据库
include 'conUser.php';
//接收数据
$mes = isset($_POST['mes']) ? $_POST['mes'] : '';
$username = isset($_POST['username']) ? $_POST['username'] : '';
$img = isset($_POST['img']) ? $_POST['img'] : '';
$shop = isset($_POST['shop']) ? $_POST['shop'] : '';
$intro = isset($_POST['intro']) ? $_POST['intro'] : '';
$price = isset($_POST['price']) ? $_POST['price'] : '';
$num = isset($_POST['num']) ? $_POST['num'] : '';
if ($mes == 'save') {
   /*  当在详情页加入商品的时候，看是否存在该条数据，如果存在，则只需改变商品的数量，如果 
   如果不存在，则插入一条新的商品（通过图片名标识和用户名标识）*/
   //1.写查询语句
    // echo 'yes';
    $sql = "SELECT * FROM saveuserbuy WHERE img= '$img'AND username='$username'";
   //2.写执行语句
    $res = $con->query($sql);
    // var_dump($res);
    if ($res->num_rows) {
     /* 如果存在，则查询数据库中的原来num数，然后再加上传进来的数量*/
        $datalist = $res->fetch_all(MYSQLI_ASSOC);
        // var_dump($datalist);
        $inum = $datalist[0]['num'];//数组读取数据的方法
        // echo $inum;
        $fnum = $inum + $num;
        if ($fnum > 5) {
            $fnum = 5;
        }
        // echo $fnum;
    //1.写更新语句
        $sql2 = "UPDATE saveuserbuy SET num='$fnum'WHERE img='$img'AND username='$username'";
    //2.执行更新语句
        $res2 = $con->query($sql2);
        // echo $res2;
    } else {
      //1.写数据库查询语句；
        $sql3 = "INSERT INTO saveuserbuy(username,img,shop,intro,price,num)VALUES('$username','$img','$shop','$intro','$price','$num')";
      //2.执行语句;
        $res3 = $con->query($sql3);
        // echo $res3;
    }
}
if ($mes = 'get') {
    /* 当操作指令为get的时候，渲染对应的商品的数据（唯一标识：用户名） */
    //当打开购物车页面的时候，渲染对应用户的数据
    //1.写查询语句
    $sql4 = "SELECT * FROM saveuserbuy WHERE username='$username'";
    //2.写执行语句
    $res4 = $con->query($sql4);
    $datalist4 = $res4->fetch_all(MYSQLI_ASSOC);
    echo json_encode($datalist4, JSON_UNESCAPED_UNICODE);
}
?>