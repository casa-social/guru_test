// Hero Model
type Hero = {
    id:string,
    avatarUrl: string,
    fullName: string,
    typeId: string,
    description:string,
    type:{
        id:string,
        name:string
    }
}

export default Hero
