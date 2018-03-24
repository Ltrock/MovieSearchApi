<?php require 'vendor/autoload.php';?>
<?php


$session = new SpotifyWebAPI\Session(
    '39d176b12e714332a3c5cc10354a3a2d',
    '49e736951f0f4e039bc8234ebdae488e'
);

$session->requestCredentialsToken();
$accessToken = $session->getAccessToken();

// Store the access token somewhere. In a database for example.

// Send the user along and fetch some data!
// header('Location: app.php');
// die();
// require 'vendor/autoload.php';

// Fetch the saved access token from somewhere. A database for example.

$api = new SpotifyWebAPI\SpotifyWebAPI();
$api->setAccessToken($accessToken);

/*receive tha input data that sent from application.js by name of movie*/
$name = $_GET["name"];
/*set result by search name of movie and show the album of soundtrack*/
$result = $api->search($name,'album','2');
/*use jason to change object to array*/
$results = json_decode(json_encode($result),true);
/*set $re by keep the album with items*/
$re = $results['albums']['items'];
foreach ($re as $key) 
{	
	/*keep information of uri of input to display*/
	$display = $key['uri'];
	/*display spotify by using $display(uri)*/
	echo "<iframe src=https://open.spotify.com/embed?uri=".$display." width=\'250\' height=\'380\' frameborder=\'0\' allowtransparency=\'true\'></iframe>";
}

?>