$(function(){

    var source = $("#articlesList").html();
    var dataTemplate = Handlebars.compile(source);
    $results = $('#results')

    $('#search').on('keyup', function(e){
        if(e.keyCode === 13) {
         var parameters = { search: $(this).val() };
            $.post('api/search', parameters, function(data){
                if (data.articles instanceof Array) {
                    $results.html( dataTemplate({articles:data.articles}) ); 
                } else {
                    $results.html(data);
                };
            });

        };

    });

});
