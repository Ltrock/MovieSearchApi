var mykey = 'AIzaSyBrpl3p10sYXhP4b9f_pL_W7JO1sQ9l_qE';
 //submit event ,run when submit happens
$(function() {   
    $('#searching').submit( function(e) {
        e.preventDefault();  //prevent the form being submitted
    });
});
 
//function to search
function search() {
    //clear it
    $('#result').html('');
    $('#buttons').html(''); 
    
    // To get the input
    q = $('#find').val();
    if($('#find').val()==''){
        $('#result').value('');
    }
    

    b = document.getElementById('find').value;
    c =  $('#find').val();
    
    
    // get youtube APIs
    $.get(
        "https://www.googleapis.com/youtube/v3/search?&maxResults=21", {
            part: 'snippet, id',
            q: q+"official trailer", //set key to search just trailer
            type: 'video',
            key: 'AIzaSyBrpl3p10sYXhP4b9f_pL_W7JO1sQ9l_qE'
        }
        , function(data) {
            var nextPage = data.nextPageToken;
            var prevPage = data.prevPageToken;
            console.log(data);  //log the data in browser
             
            $.each(data.items, function(i, vid) {  //for each video
                var output = getOutput(vid); //get output
                $('#result').append(output); //show output
            });
        /*sent input of movie name to twitter*/
        twitter(b);
        /*sent input of movie name to spontify*/
        spotify(c);
        
        //get button
        var butt = getButtons(prevPage, nextPage);      
            // show button
            $('#buttons').append(butt);
        });
}
// function for next page
function next() {
    var token = $('#nextbutton').data('token');
    var q = $('#nextbutton').data('find');
         
   // clear it
    $('#result').html('');
    $('#buttons').html('');
     
    // get input
    q = $('#find').val();  
    //get google APIs
    $.get(
        "https://www.googleapis.com/youtube/v3/search?&maxResults=21", {
            part: 'snippet, id',
            q: q+"official trailer", //set key to search just trailer
            pageToken: token,
            type: 'video',
            key: mykey
        }, function(data) {
             
            var nextPage = data.nextPageToken;
            var prevPage = data.prevPageToken;

            console.log(data);//log the data in browser
             
            $.each(data.items, function(i, vid) {
                var output = getOutput(vid); 

                $('#result').append(output);  //display movie of next page
            });
             
            var butt = getButtons(prevPage, nextPage);
             
            // Display buttons
            $('#buttons').append(butt);
        });    
}
 
// function for previous page
function prev() {
    var token = $('#prevbutton').data('token');
    var q = $('#prevbutton').data('find'); 
   // clear it
    $('#result').html('');
    $('#buttons').html('');

    q = $('#find').val(); 
    $.get(
        "https://www.googleapis.com/youtube/v3/search?&maxResults=21", {
            part: 'snippet, id',
            q: q+"official trailer", //set key to search just trailer
            pageToken: token,
            type: 'video',
            key: mykey
        }, function(data) {
             
            var nextPage = data.nextPageToken;
            var prevPage = data.prevPageToken;
             
            console.log(data);
             
            $.each(data.items, function(i, vid) {

                var output = getOutput(vid);
                $('#result').append(output); //display movie of previous page
            });
             
            var button = getButtons(prevPage, nextPage);
            $('#buttons').append(button);
        });    
}
//function to get buttons
function getButtons(prevPageToken, nextPageToken) {
    //return next page button
    if(!prevPageToken) {
        var btn = '<div class="btn-group">' +'<button id="prevbutton" class="btn btn-primary btn-md">Prev</button>' 
        +'<button id="nextbutton" class="btn btn-primary btn-md" data-token="' + nextPageToken + '" data-find="' + q + '"' +'onclick = "next()">Next</button>' +'</div>' 
    }
    
    //return previous and next page buttons
    if(prevPageToken) {
        var btn = '<div class="btn-group">' +'<button id="prevbutton" class="btn btn-primary btn-md" data-token="' + prevPageToken + '" data-find="' + q + '"' +'onclick = "prev()">Prev</button>' 
        +'<button id="nextbutton" class="btn btn-primary btn-md" data-token="' + nextPageToken + '" data-find="' + q + '"' +'onclick = "next()">Next</button>' +'</div>'  
    }
     
    return btn;
}

// function to show the output
function getOutput(vid) {
    var vidtitle = vid.snippet.title;
    var thumbnail = vid.snippet.thumbnails.medium.url;
    var videoID = vid.id.videoId;
    var description = vid.snippet.description;
    var channel = vid.snippet.channelTitle;
    var date = vid.snippet.publishedAt;
    
    var output = '<div class="movie">'+
        
        '<div class="movie-body">'+'<h4 class="movie-title">'+vidtitle+'</h4>'+
        '<center>'+'<img src="' + thumbnail + '">'+'</center>'+'<br>'+
        '<button type="button" id="movie-btn" class="btn-default btn-md" data-toggle="modal" data-target="#'+videoID+'"'+'>'+"Preview"+'</button>'+
     
        '<div class="modal fade" id="'+videoID+'">'+
        '<div class="modal-content">'+
        '<div class="modal-header" style="padding:20px 40px">'+
        '<button type="button" class="close" data-dismiss="modal">'+'&times;'+'</button>'+
        '<h4 class="movie-title-preview">'+vidtitle+'</h4>'+'</div>'+     
        '<div class="modal-body" style="padding:12px 15px">'+
        '<table>'+'<tr>'+'<td>'+'<img class="sticky" width="280" height="auto" src="'+thumbnail+'">'+'</td>'+
        '<td>'+'<p class="movie-description">'+channel+'</br>'+'</br>'+date+'</br>'+'</br>'+description+'</p>'+'<br>'+
        "URL : "+'<a href="http://youtube.com/embed/'+videoID+'"target="_blank">'+"http://youtube.com/embed/"+ videoID+'</a>'+
        '</td>'+'</tr>'+'</table>'+'</div>'+
        '<div class="modal-footer">'+
        '<button type="submit" class="btn btn-default pull-right" data-dismiss="modal">'+
        '<span class="glyphicon glyphicon-remove">'+'</span>'+" Cancel"+'</button>'+'</div>'+
        '</div>'+'</div>'
        +'</div>'+'</div>'+'&emsp;'
     
    $(document).ready(function(){
        $("#movie-btn").click(function(){
            $("#myModal").modal();
        });
    });
    
     return  output; 
}

/*receive name of movie*/
function twitter(b)
{ //console.log("ok");
  str = b;//document.getElementById('find').value;
  //console.log(str)
  if (str.length==0)
  {
    document.getElementByName().innerHTML="";
    return;
  }
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
    xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  { //console.log(xmlhttp.responseText);
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
  }
  }
    xmlhttp.open("POST","twitter.php", ); //send data to get information fron twitter.php
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xmlhttp.send("keyword=" +str);
    return false;
  }

/*receive name of movie*/
function spotify(c)
{
  console.log(c);
 $.ajax({
        url: "spotify.php",
        context: document.body,
        data:{ 'name':c} //send name of movie as 'name'
      }).done(function(data) 
      {
            console.log(data); //print data in console
           
            $('#spon').html(data); //send dat to diaplay in html page

      });

}