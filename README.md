# To clone the application
git clone https://github.com/Kriti98ranjan/ipl-player-data

# To run the backend application 
npm install
npm run dev

# used mongodb atlas
# .env 
PORT=5000
MONGO_URI=mongodb+srv://kritiranjan196:Fd7v4N863EgfEF2A@cluster0.9l0yfmi.mongodb.net/ipl?retryWrites=true&w=majority&appName=Cluster0


# API Url 
* This API for list all player : -  GET http://localhost:5000/players
* This API for Update Player by id :-   PATCH http://localhost:5000/id
* This API for Create a new Player  : - POST hhtp://localhost:5000/players
* This API for Delete Player by id :- http://localhost:5000/players/id
* This API for description of Player by id/description :- GET http://localhost:5000/id/description

For pagination, sorting, searching : //GET 
ex: http://localhost:5000/players?page=1&limit=10&team=RCB&sortBy=runs&search=virat

