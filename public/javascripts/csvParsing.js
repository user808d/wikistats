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

$(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
});
