jQuery(document).ready( function($) {
  var w = $('.pdb-signup');
  if (w) {
    var registerForm = $(w.find('form')[0]);
    function autoFill(player) {
      registerForm.find('#pdb-egd_id')[0].value = player.Pin_Player;
      registerForm.find('#pdb-first_name')[0].value = player.Name;
      registerForm.find('#pdb-last_name')[0].value = player.Last_Name;
      registerForm.find('#pdb-country')[0].value = player.Country_Code;
      registerForm.find('#pdb-club')[0].value = player.Club;
      registerForm.find('#pdb-grade')[0].value = player.Grade;
    }
    var egdSearchBtn = $(w.find('#egd-find-id')[0]);
    var url = 'http://www.europeangodatabase.eu/EGD/GetPlayerDataByData.php';
    var list = $(w.find('#egd-search-results')[0]);
    var egdFName = w.find('#egd-first-name')[0];
    var egdLName = w.find('#egd-last-name')[0];
    function search() {
      $.getJSON(
        url,
        { name: egdFName.value, lastname: egdLName.value },
        function(result) {
          list.empty();
          $.each(result.players, function(i, player) {
            var text = player.Pin_Player + ', ';
            text += player.Real_Name + ' ' + player.Real_Last_Name + ', ';
            text += player.Grade + ', ';
            text += player.Club + ' ' + player.Country_Code;
            var li = $('<button>').text(text);
            li.appendTo(list);
            li.click(function() { autoFill(player); });
          });
        }
      );
    };
    egdSearchBtn.click(search);
  }
});
