# Simple Hotel Lister

**Overview :**

Implement a Simple Hotel Lister web applicaton where a authenticated user can search for hotels list by city name and also filtered the results via hotel rating and pool feature.Technology used for frontend are React.js, Redux, Ant-design and for backend Django restframework with Django orm sqlite3 database.

**Set Up Project:**

Backend : 
1. Create a virtual enviroment in your local machine.
2. Then install the requiments.txt file using command=>   pip install -r requirements.txt
3. After that create a django project in a folder using command=>   django-admin startproject hotel_lister_backend
4. Now Create 2 app named authentication and hotels in project folder using command=>  py manage.py startapp appname
5. Replace the admin.py,urls.py,models.py,views.py,serializers.py file from my github repo in both app.
6. From main project folder replace the settings.py and urls.py in your project.
7. Run migration by this command=>  py manage.py makemigrations
                                    py manage.py migrate
8.Now run the server localy in your machine with this=>  py manage.py runserver

Note : In my pc the running url is : http://127.0.0.1:8000/

Frontend:
1. Create a react app using this command=> npx create-react-app appname
2. After creating the app open the folder in vs code and replace the src folder from my repo in your project.
3. Copy the dependencies from package.json file and replace it in your project dependencies.
4. Install the dependencies by terminal=> npm install
5. Now run the project via=>  npm start

Note : In my pc the running url is : http://localhost:3000/

**Data Used :**

I am using the option B. From this site "https://data.xotelo.com/api/list?location_key={location_key}". (Xotelo hotel api) . They are provided multiple city hotel data like name,rating,price,accomodation type etc.Using this api in my code and utilize the data as per instruction.

**AI tools :**

I am using Chatgpt for design the frontend structure and fixing the error by generating some boilerplate code by it.

