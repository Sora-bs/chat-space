$(function(){
    function buildHtml(message){
        var html = `.text
                        - if ${message.content}.present?
                            %p.text
                            = ${message.content}
                        = image_tag ${message.image}.url, class: 'text' if ${message.image}.present?`
        return html;
    }

    $('#new_message').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(message){
            var html = buildHtml(message);
            $('.text').append(html)
            $('.text').animate({scrollTop: $('.text')[0].scrollHeight}, 'fast');
        })
        .fail(function(){
            alert('error');
          })
    })
})