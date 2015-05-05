var data;
 
function handleFileSelect(evt) {
    var file = evt.target.files[0];
    
    Papa.parse(file, {
        header: false,
        dynamicTyping: false,
        complete: function(results) {
            data = results;
        }
    });
}

function submitAbstract(params){
    $.post('/api/abstracts', params, function(res){
        console.log(res);
    });
}

function submitStat(params){
    $.post('/api/stats', params, function(res){
        console.log(res);
    });
}

function submitCSV(params){
    $.post('/api/upload', params, function(res){
        console.log(res);
    });
}

function submitURL(params){
    $.post('/api/urlReferences', params, function(res){
        console.log(res);
    });
}

function publishArticle(evt){
    var parameters = {},
        headers = [],
        rows = [];
    
    parameters.title = $('#title').val();
    parameters.email = $('#email').val();
    var headerTypes = JSON.parse($('#headerTypes').val());
    for(var i in data.data[0]){
        var x = {};
        x[data.data[0][i]] =  headerTypes[i];
        headers.push(x);
    }
    for(i=1; i < data.data.length; i++)
        if(data.data[i][0] !== '') rows.push(data.data[i]);
    
    $.post('/api/articles', parameters, function(res){
        var newAb = {},
            newStat = {},
            newUrl = {},
            csvUpload = {};

        csvUpload.rows = rows;
        csvUpload.headers = headers;
        newAb.articleID = res.articleID;
        newStat.articleID = res.articleID;
        newUrl.articleID = res.articleID;
        newUrl.urlReference = $('#urlReference').val();
        newAb.content = $('#content').val();
        newStat.typeID = $('input[name="group1"]:checked').val();
        newStat.tableName = $('#tableName').val();
        csvUpload.title = newStat.tableName;
    
        submitAbstract(newAb);
        submitStat(newStat);
        submitCSV({data:JSON.stringify(csvUpload)});
        submitURL(newUrl);
    });
}

$(function(){
    $("#csv-file").change(handleFileSelect);
    $("#publish").click(publishArticle);
});
