<?php include "twitteroauth.php"; ?> <!--include function from library of twitter-->
<?php
/*get a api and anykeys from the website*/
$consumer = "mfGrSHbj8tuo54TmTar2keLIU";
$consumersecret = "M6frZvKHt9JetpAFMJkJW7Hoz6ZPHLQbq4SNR8V1tjwubIbWJw";
$accesstoken = "818648167663046656-RX4OGAzzPzGrXwM5d9VxByTBdJXSSkT";
$accesstokensecret = "dLgL2515610i92Yw2ulmpBlmcveYj8xrYC8bFdneI9wvk";

$twitter = new TwitterOAuth($consumer,$consumersecret,$accesstoken,$accesstokensecret);
$tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q=merhaba&result_type=recent&count=1');


if(isset($_POST['keyword']))
{	
	/*keep data of twitter to $txt without retweet and #*/
	$txt = $_POST['keyword']."-filter:retweets"."#"; 

	/*set a date form to update data*/
	$until = date("Y-m-d"); 

	/*get twitter's data and set it to show 25 result*/
	$tweets = $twitter->get('https://api.twitter.com/1.1/search/tweets.json?q='.$txt.'&result_type=recent&count=25'); 
	foreach($tweets as $tweet)
	{
		foreach($tweet as $t)
		{
			if(isset($t->user)) 
			{
				/*keep information that want to display in htmi page by use html tag*/ 
				$display ='<table>'.'<tr>'.'<td>'.'<img class="sticky" style="border-radius: 50%" src ="'.$t->user->profile_image_url.'" />'. '</td>'.'<td>'.$t->user->name." | @".$t->user->screen_name.' - '.$until.'<br>'.$t->text.'<br>'.'</td>'.'<tr>'.'</table>';
				echo $display; 
			}
		}

	}
}
?>