<?php 
    include('../connection/connect.php');
    # restful api. method get, post, delete

    // check biến $_GET có giá trị hay không
    if(isset($_GET['loaidat'])){
        $loaidat = $_GET['loaidat'];
        $name = strtolower($loaidat);

        //cần thay
        $query = "select *,st_x(ST_Centroid(geom)) as x ,st_y(ST_Centroid(geom)) as y from public.camhoangdc_1 where LOWER(loaidat) like '%$loaidat%'"; //cần thay
        $result = pg_query($conn, $query);
        $tong_so_ket_qua = pg_num_rows($result);

        if($tong_so_ket_qua > 0) {
            while($dong = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                $link = "<a href='javascript:void(0);' onclick='viewLocation(".$dong['x'].",".$dong['y'].")'>Xem ngay</a>";
                echo 
                "<div style='padding: 6px 0;'>
                    <p>Loại đất: ".$dong['loaidat']." | Diện tích: ".$dong['dientich']."</p> 
                    ".$link."
                </div>"; //cần thay
            }
        } else {
            echo "Không tìm thấy kết quả";
        }
    } else {
        echo "Không tìm thấy thông tin";
    }
?>
