export interface User{
  _id?:string
  email:string,
  password:string
  userId?:string
  isUser?:boolean
}
export interface Catalog{
  title:string
  keyword:string
  location:string
  date:string
  imageUrl?:string
  description:string
  author?:author
  _id?: string
}
export interface Post{
  title:string
  keyword:string
  location:string
  date:string
  imageUrl?:string
  description:string
  author?:author
  votes?:Array<User>
  rating?:number
  _id?: string
  hasUser?:boolean
  isAuthor?:boolean
  isVoted?:boolean
  peopleVoted?:Array<string>

}
export interface author{
  firstName:string
  lastName:string
  email:string
  password:string
  posts:Array<User>
}
export interface Message{
  message:string
}
