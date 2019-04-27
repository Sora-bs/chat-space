$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHtml(message) {
      var sendImage = ""
      message.image ? sendImage = `<img src="${message.image}" class: 'text-image' >` : sendImage = ""
      var new_message = `
                      <div class= "message" data-id="${message.id}">
                        <div class= "upper-info">
                          <p class= "group-user">
                            ${message.user_name}
                          </p>
                          <p class= "date">
                            ${message.created_at}
                          </p>
                        </div>
                        <div class= "text">
                          <p class= "text-message">
                            ${message.content}
                          </p>
                            ${sendImage}
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
          var html = buildHtml(message);// 非同期でメッセージを追加
          $('.messages').append(html);// 実際に追加する
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          $('.input-box__text').val('');//テキストフィールドを空にする
          $('.input-submit').prop('disabled', false);//送信ボタンを有効にする
        })
        .fail(function () {
          alert('メッセージを入力してください。');
          $('.input-box__text').val('');
          $('.input-submit').prop('disabled', false);
        })
    })

    var reloadMessages = function () {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message').last().data('id')
      //ブラウザ上の最後のidを取得、last()がないと最初のmessage_idが呼び出される
      var groupId = location.pathname.split('/')[2]
      $.ajax({
        url: `/groups/${groupId}/api/messages`, // 変数使用時''でなく``を使う
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
        .done(function (messages) {
          var insertHTML = '';  //追加するHTMLの入れ物
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          messages.forEach(function (message) {
            insertHTML = buildHtml(message);  //メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);  //メッセージを追加
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          });
        })
        .fail(function () {
          alert('自動更新に失敗しました。');
        });
    };
    setInterval(reloadMessages, 5000);
  });
});
