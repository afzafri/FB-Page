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

  $(document).on("click", "#getToken", function() {
    var access_token = $(this).attr("acsTkn");
    copyToClipboard(access_token);
    $(this).parent().html("<br><font color='lime'>Access Token copied</font>").hide().fadeIn('slow');
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

  function getUser() {
    FB.api('/me', function(response) {
      $("#userInfo").append('Welcome! Good to see you, ' + response.name + '.').hide().fadeIn('slow');
    });
  }

  function getPagesList() {
    FB.api('/me/accounts', function(response) {
      var pages = response.data;
      var len = pages.length;
      $("#noPages").append('You have <b>' + len + '</b> pages available.').hide().fadeIn('slow');

      if(len > 0) {
        $('#pageTable').fadeIn('slow');
        for(var i=0;i<len;i++) {
          var id = pages[i].id;
          var name = pages[i].name;
          var category = pages[i].category;
          var tasks = "";
          for(var j=0;j<pages[i].tasks.length;j++) {
            tasks += "<li>"+pages[i].tasks[j]+"</li>";
          }
          var access_token = pages[i].access_token;

          var pageData = "<tr>" +
                            "<td>"+(i+1)+"</td>"+
                            "<td>"+id+"</td>"+
                            "<td>"+name+"</td>"+
                            "<td>"+category+"</td>"+
                            "<td><ul>"+tasks+"</ul></td>"+
                            "<td><button id='getToken' acsTkn='"+access_token+"'>Copy Token</button></td>"+
                            "<td><button id='manageBtn' pageID='"+id+"' acsTkn='"+access_token+"'>Manage</button></td>"+
                         "<tr>";

          $('#pageTable tbody').append(pageData).hide().fadeIn('slow');
        }
      }
    });
  }

  function copyToClipboard(text){
      var dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute('value', text);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
  }

});
