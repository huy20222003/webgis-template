<?php 
    define('PG_DB', "CAM_HOANG_1"); //cần thay
    define('PG_HOST', "localhost"); //cần thay
    define('PG_USER', "postgres"); //cần thay
    define('PG_PORT', "5432"); // cần thay
    define('PG_PASS', "postgres"); // cần thay

    #extension = pgsql
    #bat config trong apache php.ini

    $conn = pg_connect("dbname=".PG_DB." password=".PG_PASS." host=".PG_HOST." user=".PG_USER." port=".PG_PORT);
    //$conn = pg_connect($db, $host, $user, $port, $port);
    
    // if (!$conn) {
    //     echo "Lỗi kết nối đến cơ sở dữ liệu: " . pg_last_error();
    // } else {
    //     echo "Kết nối đến cơ sở dữ liệu thành công!";
    // }
    
    // var_dump($conn);
    //$conn = pg_connect("dbname = password= host= port =)

?>