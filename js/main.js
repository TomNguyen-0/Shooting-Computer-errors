// var resumeData={
//     'resume_path': '/developer/resume.html'
// };

function count_viewers(within_count=""){
    var path_name = window.location.pathname;
    var resume_title = path_name.substring(path_name.lastIndexOf('/') + 1); // resume.html
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    if (within_count != ""){
        within_count = "-"+within_count;
        within_count = within_count.replace(/\s/g, '_'); // remove space
    }
    if (isMobile){
        within_count = within_count+"-mobile";
    }
    const api_url = 'https://tomnguyen.pythonanywhere.com/?input='+resume_title+within_count;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", api_url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

 function get_ip(){
    jQuery.get('https://ipinfo.io/json', function() {}, "json").always(function(resp) {
        // var countryCode = (resp && resp.country) ? resp.country : "us"; // <-- here
        callback2(resp.loc);
    });


    // $.get('https://ipinfo.io', function(resp) {callback2(resp.loc)}, "json");    // if you change json to jsonp it will print to console.log

      $.ajax({
        url:'https://geoip-db.com/jsonp/',
        dataType:'jsonp',
      })
      $.ajax({
        url:'http://geoip-db.com/jsonp/',
        dataType:'jsonp',
      }) // turn on fucntion callback to use this
}

    function callback( response ) {   // for get_ip()
      const latitude = response.latitude;
      const longitude = response.longitude;
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=00452c23fc094756bf2510331150b5f1`)
        .then(response => response.json())
        .then(result => {
            const text = result['results'][0]['formatted'] + '-' + result['results'][0]['components']['continent'];
            count_viewers(text);
        })
    }
    
    function callback2( response ) {   // for get_ip()
        var temp = response.split(",");
      const latitude = temp[0];
      const longitude = temp[1];
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=00452c23fc094756bf2510331150b5f1`)
        .then(response => response.json())
        .then(result => {
            const text = result['results'][0]['formatted'] + '-' + result['results'][0]['components']['continent'];
            count_viewers(text);
        })
    }


    function init(){
    if (localStorage.getItem("not_default_resume") ){
        // console.log('localStorage.getItem(resume_path) :>> ', localStorage.getItem('resume_path'));
        navbar(localStorage.getItem("resume_path"));
    }else{
        navbar();
    }
    count_viewers();
    if (document.title == "Resume"){
        // getLocation();
        get_ip();
    }
    
}
window.onload=init;
