const product = require('../models/product');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
  console.log('Conected');
}).on('error',function(error){
  console.log(error);
});

var products = [
    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/b/b8/Spider-Man_Into_the_Spider-Verse_%282018_poster%29.png',
    title:'Spider-Man: Into the Spider-Verse',
    description:'Teen Miles Morales becomes Spider-Man of his reality, crossing his path with five counterparts from another dimensions to stop a threat for all realities.',
    price:300
  }),

    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/3/3b/URI_-_New_poster.jpg',
    title:'Uri: The Surgical Strike',
    description:'Uri chronicles the events of the surgical strike conducted by the Indian military against the suspected militants in Pakistan occupied Kashmir (PoK). It tells the story of the 11 tumultuous events over which the operation was carried out.',
    price:300
  }),

/*    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/8/85/Captain_Marvel_poster.jpg',
    title:'Captain Marvel',
    description:'Captain Marvel gets caught in the middle of a galactic war between two alien races.',
    price:300
  }),

    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg',
    title:'Avengers:Infinity War',
    description:'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality. The fate of the planet and existence itself has never been more uncertain as everything the Avengers have fought for has led up to this moment.',
    price:300
  }),*/

    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/1/1c/Spider-Man_Far_From_Home_poster.jpeg',
    title:'Spider-Man: Far From Home',
    description:"Peter Parker's relaxing European vacation takes an unexpected turn when Nick Fury suddenly shows up in his hotel room. Parker soon finds himself donning the Spider-Man suit to help Fury stop the evil Mysterio from wreaking havoc across the continent.",
    price:300
  })

/*    new product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/f/fd/How_to_Train_Your_Dragon_3_poster.png',
    title:'How To Train Your Dragon : The Hidden World',
    description:" Now chief and ruler of Berk alongside Astrid, Hiccup has created a gloriously chaotic dragon utopia. When the sudden appearance of female Light Fury coincides with the darkest threat their village has ever faced, Hiccup and Toothless must leave the only home they’ve known and journey to a hidden world thought only to exist in myth",
    price:300
  }),*/

];
var done = 0;
for(var i = 0;i<products.length;i++){
  products[i].save().then(function(){
    done++;
    if(done === product.length)
    mongoose.disconnect();
  });
}
