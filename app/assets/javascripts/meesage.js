$(function(){ 
  var buildHTML = function(message) {
    image = (message.image) ? `<img class= "message-item__image" src=${message.image} >` : "";

    var html = `<div class="message-item" data-message-id="${message.id}"> 
          <div class="message-item__user">
            <div class="message-user">
              ${message.user_name}
            </div>
            <div class="message-text">
              ${message.created_at}
            </div>
          </div>
          <div class="message-item__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('form')[0].reset();
    $('.submit-btn').attr('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});