<?php
header('Access-Control-Allow-Origin: *');

session_start();

$host = "localhost";
$user = "root";
$password = "";
$dbname = "sqlinjection";
$emp_no = '';

$con = mysqli_connect($host, $user, $password,$dbname);

$method = $_SERVER['REQUEST_METHOD'];



if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}


switch ($method) {
	case 'POST':

		$user = mysqli_real_escape_string($con,stripcslashes($_POST['user']));
		$clave = mysqli_real_escape_string($con,stripcslashes($_POST["clave"]));
  
		
		
		$sql = "select * from usuarios where usuario = '$user' and password = '$clave';";
	  
		break;
}


//solo permite un query
$result = mysqli_query($con,$sql);

$count = mysqli_num_rows($result);


if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}

if ($count == 1) {
	$info = $result->fetch_assoc();
	//echo json_encode(array('dpi'=>$info['usuario'], 'clave'=>$info['password'], 'tipo_usuario'=>$info['tipo'] ) );
	echo json_encode($info);

  } else {
	http_response_code(404);
  }

$con->close();


?>
