class Speaker {
  speakerID: string;
  name: string;
  bio: string;
  expertise: string;
  email: string;
  image: string; 

  constructor(speakerID: string, name: string, bio: string, expertise: string, email: string, image: string) {
    this.speakerID = speakerID;
    this.name = name;
    this.bio = bio;
    this.expertise = expertise;
    this.email = email;
    this.image = image;
  }
}

export default Speaker;
