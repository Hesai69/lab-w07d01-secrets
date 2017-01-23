console.log('sshhh');

$('.like-btn').on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.post('/secrets/' + id + '/likes', function(res) {
    console.log(res);
    var secret = res.value;
    var html = render(secret);
    $btn.closest('.secret').html(html);
  });
});

// example
$('#create').on('click', function(evt) {
  var newSecret = {
    message: $('#secret_message').val()
  }
  $.post('/secrets', newSecret, function(res) {
    console.log(res);
    //$.get('/secrets/' + res._id);
  })
});
// ajax delete method
$('.remove-btn').on('click', function(evt) {
  var id = $(evt.target).data().id;
  $.ajax({
    url: '/secrets/' + id,
    method: 'DELETE'
  }).then(function(res) {
    console.log(res);
    $(evt.target).parent().remove();
  });
});

function render(secret) {
  var temp = $('template').html();
  var compile = Handlebars.compile(temp);
  return compile({secret: secret});
}
