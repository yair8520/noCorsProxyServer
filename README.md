# NoCORS Proxy Server

Welcome to the NoCORS Proxy Server!

This server acts as a proxy between your front-end application and external APIs that may have CORS (Cross-Origin Resource Sharing) restrictions. CORS restrictions can prevent your front-end application from making requests directly to APIs hosted on different domains. This server bypasses those restrictions, allowing you to access external APIs from your client-side code.

**For more tools visit my site:** [**dev-tools**](https://yair8520.github.io/dev-tools/)


## How to send a request through the NoCORS Proxy Server:

1. Set up your client application:

   - Ensure you have a front-end application (e.g., React, Angular, Vue.js) running on either running on either my  [**Postman Clone**](https://yair8520.github.io/dev-tools/#/api)  or 'http://localhost:3000' (if testing locally). This client application will make requests to external APIs through the NoCORS Proxy Server.

2. Import the HTTP client library:

   - If you're using Axios, import it in your client-side code like this:
     ```javascript
     import axios from "axios";
     ```

3. Make a request to the NoCORS Proxy Server:
   - To make a request, simply call the HTTP client's method (e.g., axios.get, axios.post) with the desired URL as follows:
     ```javascript
     axios.defaults.baseURL =
       "https://ec2-16-171-200-227.eu-north-1.compute.amazonaws.com/api/";
     axios
       .get("https://jsonplaceholder.typicode.com/todos/")
       .then((response) => {
         // Handle the response data here
         console.log(response.data);
       });
     ```

The NoCORS Proxy Server ensures that the appropriate CORS headers are added to the response, allowing your client-side application to access the requested API data without CORS-related issues.

Author: Yair Gabay
