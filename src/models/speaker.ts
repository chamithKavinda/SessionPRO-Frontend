class Speaker {
  id: string;
  name: string;
  bio: string;
  expertise: string;
  email: string;
  image: string; 

  constructor(id: string, name: string, bio: string, expertise: string, email: string, image: string) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.expertise = expertise;
    this.email = email;
    this.image = image;
  }
}

export default Speaker;
