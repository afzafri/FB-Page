$(document).ready(function() {

  window.fbAsyncInit = function() {
    FB.init({
      appId            : '799563926836864',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });
  };

  $('#loginBtn').click(function() {
    fbLogin();
  });

  function fbLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
          getUser();
          getPagesList();
        } else {
          $("#userInfo").append('Login Failed. User cancelled login or did not fully authorize.').hide().fadeIn('slow');
        }
    }, {scope: ['manage_pages', 'publish_pages']});
  }

});
