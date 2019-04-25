$(function () {
  function buildHtml(message) {
    var Sendimage = ""
    message.image ? Sendimage = `<img src="${message.image}" class: 'text-image' >` : Sendimage = ""
    var new_message = `
                      <div class= "message">
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

  var buildMessageHTML = function (message) {
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-id=  ${message.id}  > 
                    <div class="upper-message" > 
                      <div class="upper-message__user-name" > 
                        ${message.user_name} 
                      </div > 
                      <div class="upper-message__date" > 
                        ${message.created_at} 
                      </div > 
                    </div > 
                    <div class="lower-message" > 
                      <p class="lower-message__content" > 
                        ${message.content} 
                      </p > 
                      <img src="  ${message.image.url}  " class="lower-message__image" > 
                    </div > 
                  </div >`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-id=  ${message.id}  > 
                    <div class="upper-message" > 
                      <div class="upper-message__user-name" > 
                        ${message.user_name} 
                      </div > 
                      <div class="upper-message__date" > 
                      ${message.created_at} 
                      </div > 
                    </div > 
                    <div class="lower-message" > 
                      <p class="lower-message__content" > 
                        ${message.content} 
                      </p > 
                    </div > 
                  </div >`
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-id=  ${message.id}  > 
                    <div class="upper-message" > 
                      <div class="upper-message__user-name" > 
                        ${message.user_name} 
                      </div > 
                      <div class="upper-message__date" > 
                        ${message.created_at} 
                      </div > 
                    </div > 
                    <div class="lower-message" > 
                      <img src="  ${message.image.url}  " class="lower-message__image" > 
                    </div > 
                  </div >`
    };
    return html;
  };

  // var reloadMessages = function () {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var text = $("#text")
  last_message_id = ("message_id : " + text.data('message_id'))
  alert(last_message_id);
  $.ajax({
    //ルーティングで設定した通りのURLを指定
    url: "/groups/group_id/api/messages/",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: { id: last_message_id }
  })
  console.log('aaa')
    .done(function (messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.foerEach(function (message) {
        insertHTML += buildMessageHTML(message)
      })
      //メッセージが入ったHTMLを取得
      insertHTML.text()
      //メッセージを追加
      insertHTML.append()
    })
    .fail(function () {
      alert('自動更新に失敗しました。');
    });
  // };
})
