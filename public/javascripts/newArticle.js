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

function publishArticle(evt){
    var parameters = {};
    parameters.title = $('#title').val();
    parameters.email = $('#email').val();

    /*$.post('/api/articles', parameters, function(data){
        $.post('/api/abstract/' + 
    });*/
}

$(function(){
    $("#csv-file").change(handleFileSelect);
    $("#publish").click(publishArticle);
});
