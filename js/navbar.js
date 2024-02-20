


function navbar(resume_path = "/developer/resume.html"){
// function navbar(){
    var title=document.title;
    var game, syntax = '';
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i); // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
    // screen.width  used to check screen size
    if(isMobile){
        game = ``;
    }else{
        // game = `<a class="nav-link" href="games.html" onclick="resume_function();" id="games">Games</a>`;
        game = `<a class="nav-link" href="games.html" id="games">Games</a>`;
    }

    syntax=`
    <div class="container-fluid nav-theme">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link" aria-current="page" href="home.html" id="homePage">Home</a>
                <a class="nav-link" href="https://tom-nguyen-resume.streamlit.app/?company=netlify" id="resumePage">Resume</a>
                <a class="nav-link" href="projects.html" id="projectsPage">Projects</a>
                ${game}
                
            </div>
        </div>
    </div>

    `; // old resume path: <a class="nav-link" href="${resume_path}" id="resumePage">Resume</a>
    // <a class="nav-link" href="tools.html" id="tools">Tools</a>
    // <a class="nav-link" href="contact.html" id="contactPage">Contact Me</a>
    // <a class="nav-link" href="awards.html"  id="awardsPage">Awards</a>
    $(".navbar").append(syntax);
    if(title=="Home"){
        $("#homePage").addClass("active");
    }else if(title =="Resume"){
        $("#resumePage").addClass("active");
    }else if(title =="Projects"){
    $("#projectsPage").addClass("active");
    }else if(title =="Awards"){
        $("#awardsPage").addClass("active");
    }else if(title =="References"){
        $("#referencesPage").addClass("active");
    }else if(title =="Games" || title=='Badge Collector!' || title=='Fix Errors and Computers'){
        $("#games").addClass("active");
    }else if(title =="Tools"){
        $("#tools").addClass("active");
    }else if(title =="Contact Me"){
        $("#contactPage").addClass("active");
    }
}

{/* <a class="nav-link" href="references.html" id="referencesPage">References</a> */}