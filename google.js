var _prevIndex = 0;
var _nextIndex = 0;
var _resultsPerPage = 10;
var _pageNumber = 1;

$(function ()
{
    $('#btnSearch').show().click(function () { Search($("#txtSearchTerm").val(),0);});

});

function Search(term, direction)
{
    var startIndex = 1;

    if (direction === -1)
    {
        startIndex = _prevIndex; 
        _pageNumber--;
    }
    if (direction === 1)
    {
        startIndex = _nextIndex; 
        _pageNumber++;
    }
    if (direction === 0)
    {
        startIndex = 1; 
        _pageNumber = 1;
    }

    var mGoogleCustomSearchKey='014740480032990979195:2xo8pnt-lmk';
    var mGoogleApiKey='AIzaSyA8Dws66qS7iqimpRBR-6pw8dkJAn2dZHE';

    var url = "https://www.googleapis.com/customsearch/v1?key="
    + mGoogleApiKey + "&num=10&cx=" + mGoogleCustomSearchKey + "&start=" + startIndex + "&q=" + escape(term) + "&callback=?";

    $.getJSON(url, '', SearchCompleted);
}

function SearchCompleted(response)
{
    var html = "";
    $("#searchResult").html("");

    if (response.items == null)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    if (response.items.length == 0)
    {
        $("#searchResult").html("No matching pages found");
        return;
    }

    $("#searchResult").html(response.queries.request[0].totalResults + " pages found");

    for (var i = 0; i < response.items.length; i++)
    {
        var item = response.items[i];
        var title = item.htmlTitle;
        var icon = icon = "class='cmisc' title='Open other page'";

        html += "<br><div class='bg-google'><div class='hcHead2'><a target='_blank' " + icon + " href='" + item.link + "'> " + title + "</a></div><br>";
        html += item.htmlSnippet + "</div>";
    }
//btnSearch
    $("#output").html(html);
}