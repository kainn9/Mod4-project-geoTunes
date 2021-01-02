# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Pin.destroy_all
PlayRoute.destroy_all
User.destroy_all


User.create(username:"RingoS", password: "23", name:"Ringo Starr", location: "Liverpool")
User.create(username:"Pauly", password: "123", name:"Paul McCartney", location: "Liverpool")
User.create(username:"JL", password: "123", name:"John Lennon", location: "Liverpool")
User.create(username:"Georgie", password: "123", name:"George Harrison", location: "Liverpool")

