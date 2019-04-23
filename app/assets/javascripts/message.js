$(function () {
  function buildHtml(message) {
    var Sendimage = ""
    message.image ? Sendimage = `<img src="${message.image}" class: 'text-image' >` : Sendimage = ""
    var new_message = `
                      <div class= "message">
                        <div class= "upper-info">
                          <p class= "group-user">
                            ${message.name}
                          </p>
                          <p class= "date">
                            ${message.time}
                          </p>
                        </div>
                        <div class= "text">
                          <p class= "text-message">
                            ${message.content}
                          </p>
                            ${Sendimage}
                        </div>
                      </div>
                      `;
    return new_message;
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
      .done(function (message) {
        var html = buildHtml(message);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('.input-box__text').val('');
        $('.input-submit').prop('disabled', false);
      })
      .fail(function () {
        alert('メッセージを入力してください。');
        $('.input-box__text').val('');
        $('.input-submit').prop('disabled', false);
      })
  })
})
