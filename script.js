//Search beer by name (or something included in name)
//Or give random beer
//information to provide = ABV, Picture, brewer, name, type
const beerApp = {};

//food API key
beerApp.foodApiKey = '9b610bf2e6bb62063c11edbf6e3442f3'
beerApp.foodApiId = '4c2c716c'
//API urls 
beerApp.beerApiUrl = 'http://ontariobeerapi.ca/beers'
beerApp.foodApiUrl = 'https://api.edamam.com/search'

//MAKE a BEER RANDOMIzER!
beerApp.randomizer = (arr) => {
    //write math to give a random number within the length of the array 
    const randomIndex = Math.floor(Math.random() * arr.length);
 
    //pass that number into the index of the array
    return arr[randomIndex];
}

//Borrowed this and turned into a function so the right letters were capitalized when user types input - FROM https://www.c-sharpcorner.com/blogs/how-to-uppercase-or-capitalize-first-letter-of-each-word-using-jquery
beerApp.fixText = () => {
    $("#userInput").keyup(function () {  
    $('#userInput').css('textTransform', 'capitalize');  
});  
}

// borrowed this code from https://stackoverflow.com/questions/6677035/jquery-scroll-to-element and turned it into a function for my site!
beerApp.scrolly = () => {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#beerShow").offset().top
    }, 1500);
}

//takes user input and stores in a variable
beerApp.getInput = () => {

    $('button[type=submit]').on('click', (e) => {
                
        e.preventDefault();
        $('.beerBorder').remove();
        $('.beerContainer').empty();
        const queryOrig = $('#userInput').val();

        //borrowed from https://masteringjs.io/tutorials/fundamentals/capitalize-first-letter To change the value of the capitalized first letter (NOT just the DOM)
        function capitalize(query) {
            return queryOrig.charAt(0).toUpperCase() + queryOrig.slice(1);
          }
          
          const query = queryOrig.split(' ').map(capitalize).join(' ');
          query;
        //user input beer = query
        //if theres no input, tell em 
        if ($('#userInput').val() === "") {
            $('.beerOclock').text('You need to type in a beer!').addClass('outLine');
        } else {
    

        // beerApp.getBeer();
        beerApp.displayBeers(query);        
        }  
    })
};


    //get beer data from API
    beerApp.getBeer = () => {
        const beerAPiInfo = $.ajax({
            url: 'http://proxy.hackeryou.com',
            method: 'GET',
            dataType: 'json',
            data: {
                reqUrl: `${beerApp.beerApiUrl}/`,
                params: {
                    method: 'GET',
                    dataType: 'json'
                }
            }    
        });
            return beerAPiInfo;
    }


   //process response and display the chosen beer
   beerApp.displayBeers = (query) =>{
     
    const manyBeers = beerApp.getBeer();

    const beerBorder = `
    <h2 class="beerBorder">
        <i class="fas fa-arrow-circle-down"></i>
        <i class="fas fa-arrow-circle-down"></i>
        <i class="fas fa-arrow-circle-down"></i>
        <i class="fas fa-arrow-circle-down"></i>
        <i class="fas fa-arrow-circle-down"></i>
    </h2>`

    $('header').append(beerBorder);

    //process beer promise and store into useable variable (beerArray)
       manyBeers.done((beerArray)=>{    

               
           //find user chosen beer with query and beer array with filter
           const beerChoice = beerArray.filter((beer)=>{   
               if (beer.name.includes(query)){
                   console.log(beer);


                   const htmlToAppend = 
                   `<div class="beerChoice">
                      <h3>${beer.name}</h3>
                      <div class="imageContainer">
                          <img src=${beer.image_url} alt="Photo of a ${beer.name}" class="beerImage">
                      </div>
                      <h4>ABV: ${beer.abv}</h4>
                      <h4>Type: ${beer.type}</h4>
                      <h4>Brewer: ${beer.brewer}</h4>
                      <h4>Country: ${beer.country}</h4>
                  </div>`

              //take the above and append it to the queen container where it will show the content
                  $('.beerContainer').append(htmlToAppend);

                   $('userInput').val('');
                    //scroll to beers
                    beerApp.scrolly();
               } else {
                $('.beerOclock').text('Apologies, this beer is not included in Version 1.0').addClass('outLine');
               }
               
            })
       });
    }

   
//GETS BEER ARRAY AND RETURNS RANDOM BEER 
   beerApp.randomizedBeer = () => {
    $('.beer-container').empty();
    $('.beerBorder').remove();
       const fridayBeers = beerApp.getBeer();
       fridayBeers.done((beerArray)=>{
           let randomBeer = beerApp.randomizer(beerArray);
           console.log(randomBeer.name);
           let query = randomBeer.name;
           beerApp.displayBeers(query);
            beerApp.scrolly();
           
       })
   }

   //on "random button" click, give a randomized beer
   $('#random').on('click', (e) => {
    e.preventDefault();
    $('.beerContainer').empty();
    beerApp.randomizedBeer();
});

beerApp.init = () => {
    beerApp.fixText();
    beerApp.getInput();   
}

$(function(){
    beerApp.init();
});


// HELLO! 

// I would love feedback the structure and format of my Jqeury/JS!
// Do you think it is in the right order? Indented appropriately? 
//  Does it follow a sound order of operations and scope??
// this is one area I feel we didn't talk about in deth so any feed back woulf be awesome! 
//Thanks you !