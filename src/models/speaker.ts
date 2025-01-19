class Speaker {
    name: string;
    bio: string;
    expertise: string;
    email: string; 
  
    constructor(
      name: string,
      bio: string,
      expertise: string,
      email: string
    ) {
      this.name = name;
      this.bio = bio;
      this.expertise = expertise;
      this.email = email;
    }
  }
  
  export default Speaker;
  