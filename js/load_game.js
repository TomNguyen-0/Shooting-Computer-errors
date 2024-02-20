const projects = [
    {
        // link:"/developer/fix_errors_and_computers.html",
        link:"fix_errors_and_computers",
        title: "Fix Errors & Computers",
        image: "fix_errors_and_computers.jpg",
        desc: "Fix computers and fix computer errors!",
        date: "08/02/2021",
        alt: "Tom running towards computers while red computer errors are falling down on him."
    },
    {
        // link used for load_game(link->title)
        link:"Connect 4",
        title: "Connect 4",
        // image linked to "/developer/img/projects/connect_4.jpg"
        image: "connect_4.jpg",
        desc: "Play Connect 4! with another player",
        date: "09/08/2021",
        alt: "Board game Connect 4 with badges."
    },
    // {
    //     link:"Where is Tom",
    //     title: "Where's Tom",
    //     image: "where_is_tom.jpg",
    //     desc: "Find Tom hiding in the pictures",
    //     date: "09/19/2021",
    //     alt: "Nature images with cartoon version of Tom."
    // },
    {
        link:"badge_collector",
        title: "Badge Collector",
        image: "badge_collector.jpg",
        desc: "Collect badges to graduate!",
        date: "08/02/2021",
        alt: "Tom is running toward obstacles to collect badges"
    },
];
function displayUsedL(id){
    $("#used"+id).hide();
}
function displayUsedE(id){
    $("#used"+id).show();
}
function load_games(title){
    $('#project-container').html('');
    $('header').html('');
    $('header').removeClass('header-title');
    switch (title){
        case "badge_collector":
            const game_d = `
            <script src="./js/phaser.min.js"></script>
            <script src="./js/game.js"></script>`;
            $('#game_dependencies').append(game_d);
            badge_collector();  //linked to game.js
            $('#game-description').html('<h6>move: ←,→ ; jump: space,↑ </h6>');  // linked to games.html
            break;
        case "fix_errors_and_computers":
            const game_de = `
            <script src="./js/phaser.min.js"></script>
            <script src="./js/game2.js"></script>`;
            $('#game_dependencies').append(game_de);
            fix_errors_and_computers(); // linked to game2.js
            $('#game-description').html('<h6>move: ←,→ ; jump: ↑ ; shoot: space</h6>');
            break;
        case "Connect 4":
            window.location.href = "./4inrow/connect4.html"; // redirect to another html
            break;
        case "Where is Tom":
            const game_dep =`
            <script src="/developer/where_is_tom/where_is_tom.js"></script>
            `;
            $('#game_dependencies').append(game_dep);
            $('#game-description').html('<h6 style="margin: 10px 0 ;">Find Tom and Click on him!</h6>');
            where_is_tom();
            break;
        default:
            console.error("error");
            break;
    }
}

function display(){
    for(var i=0; i<projects.length ; i++){
        var syntax = `
        <div class="project-container" onClick="load_games('${projects[i].link}');count_viewers('${projects[i].image}');" onmouseenter="displayUsedE(${i})" onmouseleave="displayUsedL(${i})">
                <label class="project-labels-title text-center"><h4>${projects[i].title}</h4></label><br>
                <img src="./img/projects/${projects[i].image}" alt="${projects[i].alt}">
                <label class="project-labels-description text-capitalize">${projects[i].desc}</label>
                <label class="project-labels-date">${projects[i].date}</label>
            </div>
        `;
        $('#project-container').append(syntax);
    }
}

function projectInit(){
    init();
    display();
    $(".project-labels-used").hide()
}

window.onload = projectInit;

// onClick="location.href='${projects[i].link}'"