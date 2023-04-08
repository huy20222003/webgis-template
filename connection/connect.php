<?php 
    define('PG_DB', "DATABASE_NAME"); //cần thay
    define('PG_HOST', "HOST"); //cần thay
    define('PG_USER', "USERNAME"); //cần thay
    define('PG_PORT', "PORT"); // cần thay
    define('PG_PASS', "PASSWORD"); // cần thay

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
