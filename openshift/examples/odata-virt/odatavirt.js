const odata = require('odata-client');
var args = require('optimist').argv,
    help = 'An odata client for testing a usstates virtualization. ' +
           'Either specify the full url (-l) or construct from virtualization components (-u, -v, -m, -d).\n' +
            '\t-l: the full url\n' +
            '\t-u: base location url of the virtualization service\n' +
            '\t-v: name of the vdb\n' +
            '\t-m: name of the vdb model\n' +
            '\t-d: name of the ddl view\n';

if ((args.h) || (args.help)) {
  console.log(help);
  process.exit(0);
}

var serviceUrl;
if ((args.u)) {
  var url = args.u;

  if ((args.v)) {
    var vdbName = args.v;
  } else {
    console.error("Error: No vdb name specified... exiting");
    process.exit(1);
  }

  if ((args.m)) {
    var modelName = args.m;
  } else {
    console.error("Error: No vdb model specified... exiting");
    process.exit(1);
  }

  if ((args.d)) {
    var ddlView = args.d;
  } else {
    console.error("Error: No ddl view specified... exiting");
    process.exit(1);
  }

  serviceUrl = url + '/odata4/' + vdbName + '/' + modelName + '/' + ddlView;

} else if ((args.l)) {
  serviceUrl = args.l;

} else {
  console.error("Error: No base location url (-u) or full url (-l) specified... exiting\n");
  console.error(help);
  process.exit(1);
}

// http://usstatesdsvdb-odata-beetle-studio.birds-of-prey.phantomjinx.org.uk/odata4/usstatesdsvdb/views/statesView
console.log("\nQuerying with odata url:\n" + serviceUrl + "\n\n===");

var config = {
  service: serviceUrl
};

var conn = odata(config);

var limit = 10;
var skip = 3;
var query = conn.top(limit).skip(skip).query();
console.log("\n#### Fetches the next " + limit + " records after skipping " + skip + " records ####\n");

conn.top(limit).skip(skip).get()
  .then(function(response) {
    if (! isJSON(response.body)) {
      console.error("Not a valid odata endpoint");
      console.error("Response:\n===\n" + response.body + "\n===\n");
      return;
    }

    var parsed = JSON.parse(response.body);
    var data = parsed.value;
    for (var i = 0; i < data.length; i++) {
      var tuple = data[i];
      console.log(tuple.state_code + "\t" + tuple.state);
    }

    console.log("\n===\n\nOdata Query:\n" + query);
  }, function(error) {
    console.log("Error: " + error.message);
  });

  function isJSON(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }
