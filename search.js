gapi.client.setApiKey("AIzaSyBx0bhLgA2UJdX7WvWtjt56h-mVZ2B_QvI");

function keyWordsearch(){
    gapi.client.setApiKey("AIzaSyBx0bhLgA2UJdX7WvWtjt56h-mVZ2B_QvI");
    gapi.client.load('youtube', 'v3', function() {
        makeRequest();
    });
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet', 
        maxResults: 10
    });
    request.execute(function(response)  {                                                                                    
        $('#results').empty()
        var srchItems = response.result.items;                      
        $.each(srchItems, function(index, item) {
        vidTitle = item.snippet.title;  

        $('#results').append('<pre>' + vidTitle + '</pre>');                      
        })  
    })  
}

function commentRequest() {
    gapi.client.setApiKey("AIzaSyBx0bhLgA2UJdX7WvWtjt56h-mVZ2B_QvI");
    gapi.client.load('youtube', 'v3', function() {
            makeRequest();
    });
}

function createResource(properties) {
  var resource = {};
  var normalizedProps = properties;
  for (var p in properties) {
    var value = properties[p];
    if (p && p.substr(-2, 2) == '[]') {
      var adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (var p in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
      var propArray = p.split('.');
      var ref = resource;
      for (var pa = 0; pa < propArray.length; pa++) {
        var key = propArray[pa];
        if (pa == propArray.length - 1) {
          ref[key] = normalizedProps[p];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    };
  }
  return resource;
}

function removeEmptyParams(params) {
  for (var p in params) {
    if (!params[p] || params[p] == 'undefined') {
      delete params[p];
    }
  }
  return params;
}

function executeRequest(request) {
  request.execute(function(response) {
    console.log(response);
    $('#results').append('<pre>' + response + '</pre>');
  });
}

function buildApiRequest(requestMethod, path, params, properties) {
  params = removeEmptyParams(params);
  var request;
  if (properties) {
    var resource = createResource(properties);
    request = gapi.client.request({
        'body': resource,
        'method': requestMethod,
        'path': path,
        'params': params
    });
  } else {
    request = gapi.client.request({
        'method': requestMethod,
        'path': path,
        'params': params
    });
  }
  executeRequest(request);
}

    
function defineRequest() {
  // See full sample for buildApiRequest() code, which is not 
  // specific to a particular API or API method.
  buildApiRequest('GET',
                '/youtube/v3/comments',
                {'parentId': 'z13icrq45mzjfvkpv04ce54gbnjgvroojf0',
                 'part': 'snippet'});
}