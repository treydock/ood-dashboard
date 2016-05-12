// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require_tree .

(function(){
  window.current_dir = "";
  // does datatable store the original
  var init_table = function(url){
    window.files_table = $('#files').DataTable({
      // "sAjaxSource": "https://websvcs08.osc.edu/pun/dev/files/api/v1/fs/nfs/17/efranz/",
      "sAjaxSource": url,
      "sAjaxDataProp": "files",
      "paging": false,
      "columns": [
        {class: "name", data: "name"},
        {class: "size", data: "size"},
        {class: "date", data: "date"}
      ]
    });

    init_click_handlers();
  };

  var init_click_handlers = function(){
    $('#files tbody').on( 'click', 'tr', function () {
      if ($(this).hasClass('active')) {
        // do nothing
      }
      else {
        $('#files tr.active').removeClass('active');
        $(this).addClass('active');
      }
    });

    $('#files tbody').on( 'dblclick', 'tr', function () {
      var d = files_table.row(this).data()
      if(d.size == "dir"){
        console.log("open directory: " + d.name);

        if(d.name == ".."){
          console.log("open parent directory");
        }
        else{
          cloudcmd(current_dir + "/" + d.name);
        }
      }
      else{
        console.log("view file: " + d.name);
      }
    });
  };


  window.cloudcmd = function(path){
    var url = "https://websvcs08.osc.edu/pun/dev/files/api/v1/fs" + path;

    if(typeof files_table === "undefined"){
      init_table(url);
    }
    else{
      files_table.ajax.url(url).load();
    }
    window.current_dir = path;
  }







})();
