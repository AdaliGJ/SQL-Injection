<?php
header('Access-Control-Allow-Origin: *');

session_start();

$host = "localhost";
$user = "root";
$password = "";
$dbname = "sqlinjection";


$con = new mysqli($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];



if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'POST':

	$user = $_POST['user'];
  	$clave = $_POST["clave"];

 	 
 	 
  	$sql = "select * from usuarios where usuario = '$user' and password = '$clave';";
	
  	break;
}
$usarray=array();



if ($con -> multi_query($sql)) {
	do {
	  if ($result = $con -> store_result()) {
		while ($row = $result -> fetch_row()) {
			$usarray[] = $row;
		}
	   $result -> free_result();
	  }
	} while ($con -> next_result());
  }else{
	http_response_code(404);
  }


 

$count = count($usarray, COUNT_NORMAL);

if ($count != 0) {
    echo json_encode(array('usuario'=>$usarray[0][0]));
	echo json_encode($usarray);
  } else {
		http_response_code(404);
  }

  //$info2 = $result->fetch_assoc();
 //echo json_encode($usarray);

$con->close();


?>

