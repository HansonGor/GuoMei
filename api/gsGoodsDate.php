<?php
    //1.后端：接收参数，查询第一页的数据，给前端
$mes = isset($_GET['mes']) ? $_GET['mes'] : '';
$page = isset($_GET['page']) ? $_GET['page'] : '2';
$num = isset($_GET['num']) ? $_GET['num'] : '28';
$type = isset($_GET['type']) ? $_GET['type'] : '';
$order = isset($_GET['order']) ? $_GET['order'] : '';
$gid = isset($_GET['gid']) ? $_GET['gid'] : '';
// echo $num;
    //2.连接数据库
include 'conGoods.php';
    //SELECT * FROM goodsdata1 LIMIT 0,10; 查询第1页的语法
    /* 设置页码与货物渲染的函数关系：
        page num index      求：起始下标
        1    12   0-9;           0
        2    12   10-19         12
        3    12   20-29         24
    公式：index=(page-1)*num;
    起始下标：
    第一页：（1-1）=0；
    第二页： （2-1）=1;
    第三页：（3-1）=2;
 */
    //3.写查询语句
if ($mes == 'get1') {
    $index = ($page - 1) * $num;
    if ($type) {
        $sql = "SELECT * FROM gmgoodsdate ORDER BY $type $order LIMIT  $index,$num";
    } else {
        //空，没有传值过来，不需要排序
        $sql = "SELECT * FROM gmgoodsdate LIMIT $index,$num";
    }
    
    
        //4.写执行语句
    $res = $con->query($sql);//结果集，除了select语句其他返回布尔值
        //var_dump($res)
        //需求：要数据
    $content = $res->fetch_all(MYSQLI_ASSOC);
        //传给前端
        // echo json_encode($content,JSON_UNESCAPED_UNICODE);
    
        //查询总条数，从而获取有多少个页码
    $sql2 = 'SELECT * FROM gmgoodsdate';
    $res2 = $con->query($sql2);
        //获取结果集的总条数即可;
    // echo $res2->num_rows;
        //如果要传输多个数据，可以做成关联数组
    $datalist = array(
        'data' => $content,
        'total' => $res2->num_rows,
        'page' => $page,
        'num' => $num
    );
    // var_dump($datalist);
    echo json_encode($datalist, JSON_UNESCAPED_UNICODE);
}
if ($mes == 'get2') {
    $sql3 = "SELECT * FROM gmgoodsdate WHERE gid='$gid'";//查找传过来的gid
    $res3 = $con->query($sql3);
    $datalist2 = $res3->fetch_all(MYSQLI_ASSOC);
    echo json_encode($datalist2, JSON_UNESCAPED_UNICODE);
}

?>