$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
      $('.row-offcanvas').toggleClass('active')
    });
    var source = $('#articlesList').html();
    var template = Handlebars.compile(source);
    $results = $('#allArticles');
    
    $.get('/api/articles', function(data){
        $results.html(template({articles: data.articles}));
    });
});
