import axios from 'axios';

const fetchUsers = async () => {
	const response = await axios.get("https://jsonplaceholder.typicode.com/users");


    
	return response.data;


    
};

fetchUsers()
	.then(users => console.log(users));

    console.log("Before try...catch");

    try {
        const result = 10 / 0;
        console.log(result); // Цей рядок не виконається через помилку
      } catch (error) {
        // Обробимо помилку
        console.error(error.message);
      }
      
      console.log("After try...catch");
