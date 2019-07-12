async function jokeList(){
    let results = await axios.get(
        `https://icanhazdadjoke.com/search?limit=10&term=dog`,
        {headers: {'Accept': 'Application/Json'}}
    );
    console.log(results);
    let jokes = results.data.results;
    return jokes;
    }

$(async function(){
    let arrayOfJoke = await jokeList();
    display(arrayOfJoke);
})



function display(arrayOfJoke){
    for (let list of arrayOfJoke){
        //check if joke vote count already exists in local storage
        if (localStorage.getItem(list.id) === null){
            localStorage.setItem(list.id, 0)
        }

        //if it doesn't then set the joke vote count to 0

        $(".list-of-joke").append(`
        <div>
            <li>${list.joke}</li>
            <button class="btn btn-info" id="${list.id}-upvote">upvote</button>
            <button class="btn btn-info" id="${list.id}-downvote">downvote</button>
            <span id="${list.id}">${localStorage.getItem(list.id)}</span>
        </div>`);

        $(`#${list.id}-upvote`).on("click", function(){
            //updated vote count
            let count = Number(localStorage.getItem(list.id)) + 1;
            localStorage.setItem(list.id, count);
            //update DOM to show current vote count
            $(`#${list.id}`).text(localStorage.getItem(list.id));
        })

        $(`#${list.id}-downvote`).on("click", function(){
            //updated vote count
            let count = Number(localStorage.getItem(list.id)) - 1;
            localStorage.setItem(list.id, count);
            //update DOM to show current vote count
            $(`#${list.id}`).text(localStorage.getItem(list.id));
        })
    }


   
    // $("#search-form").on("submit", async function handleSearch(evt){
    //     evt.preventDefault();

}


