export class Movie {
    

    constructor(name,id,genre,duration,releaseDate,description,director,actors,rating) { 
        this.name=name;
        this.id=id;
        this.genre=genre
        this.duration=duration;
        this.description=description;
        this.director=director;
        this.actors=actors;
        this.rating=rating;
        this.releaseDate=releaseDate;
        this.photo="https://ik.imagekit.io/cineticketbooking/Movies/"+id+".jpeg";
     } 
  }