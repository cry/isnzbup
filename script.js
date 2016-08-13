console.log("script.js loaded " + (new Date()).getTime());

$.ajax({
  url: "ajax.php",
}).done(function(json) {
    console.log(json);

    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(json.updated);

    $("#updated").html(d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes());
    $("#loadingmsg").remove();

    var sites = Object.keys(json);

    for (var i = sites.length - 1; i >= 1; i--) {

        if (sites[i].indexOf('119') > -1 || sites[i].indexOf('563') > -1) {
            if (json[sites[i]]) {
                $("#newsgroups").append('<div class="panel panel-success"> <div class="panel-heading"> <h3 class="panel-title">' + sites[i] + '</h3> </div> </div>');
            } else {
                $("#newsgroups").prepend('<div class="panel panel-danger"> <div class="panel-heading"> <h3 class="panel-title">' + sites[i] + '</h3> </div> </div>');
            }
        } else {
            if (json[sites[i]]) {
                $("#indexers").append('<div class="panel panel-success"> <div class="panel-heading"> <h3 class="panel-title">' + sites[i] + '</h3> </div> </div>');
            } else {
                $("#indexers").prepend('<div class="panel panel-danger"> <div class="panel-heading"> <h3 class="panel-title">' + sites[i] + '</h3> </div> </div>');
            }
        }

    };
});