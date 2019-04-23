$(function () {
  var searchList = $("#user-search-result")

  function appendHtml(user) {
    var addHtml = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
    searchList.append(addHtml);
  }

  function appendErrMsgToHTML(msg) {
    var errMsg = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${msg}</p>
                  </div>`
    searchList.append(errMsg);
  }

  function removeHtml(user) {
    var rmHtml = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
  }

  $("#user-search-field").on("keyup", function () {
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function (users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          console.log('aaa')
          users.forEach(function (user) {
            appendHtml(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません。");
        }
      })
      .fail(function () {
        alert('ユーザー検索に失敗しました。')
      })
  });

  $("#user-search-result").on("click", function () {
    $("#user-search-result").remove();
    $("#user-search-result").val();
  })
});
