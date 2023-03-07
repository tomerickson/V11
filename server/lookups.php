<?php
	include_once('config.php');
	$sql = "SELECT category, `key`, value FROM `parkhomov`.`lookup` order by `key`";
$sth = mysqli_query($conn,$sql);
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}
// print json_encode($rows);
@mysqli_close($conn);
// Set Content-type to JSO
header('Content-type: application/json');
echo json_encode($rows);