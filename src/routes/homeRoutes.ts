import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  const description = `
    <!DOCTYPE html>
    <html>
    
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          width: 70vw;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
    
        h2 {
          color: #333;
          font-size: 34px;
          margin-bottom: 20px;
        }
    
        p {
          color: #555;
          font-size: 22px;
          margin-bottom: 16px;
        }
    
        li {
          color: #333;
          font-size: 22px;
          margin-bottom: 8px;
        }
    
        code {
          background-color: #f0f0f0;
          padding: 4px;
          border-radius: 4px;
          font-size:20px;
        }
    
        strong {
          color: #333; 
        }
    
        pre {
          background-color: #f0f0f0;
          padding: 8px;
          border-radius: 4px;
          overflow: auto;
          word-wrap: break-word;
        }
    
        a {
          color: #007bff;
          text-decoration: none;
        }
    
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    
    <body>
      <h2>Welcome to the NoCORS Proxy Server!</h2>
      <p>This server acts as a proxy between your front-end application and external APIs that may have CORS (Cross-Origin
        Resource Sharing) restrictions. CORS restrictions can prevent your front-end application from making requests
        directly to APIs hosted on different domains. This server bypasses those restrictions, allowing you to access
        external APIs from your client-side code.</p>
        <p><strong>For more tools visit my site:</strong> <a href="https://yair8520.github.io/dev-tools/" target="_blank">dev-tools</a></p>
        <p><strong>Author:</strong> Yair Gabay <a href="https://github.com/yair8520" target="_blank"> My GitHub Profile</a></p>
      <h3>How to send a request through the NoCORS Proxy Server:</h3>
      <ol>
        <li><strong>Set up your client application:</strong></li>
        <p>Ensure you have a front-end application (e.g., React, Angular, Vue.js) running on either my 
          <a href="https://yair8520.github.io/dev-tools/#/api" target="_blank">Postman Clone</a>  or
          <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> (if testing locally). This client
          application will make requests to external APIs through the NoCORS Proxy Server.</p>
        <li><strong>Import the HTTP client library:</strong></li>
        <p>If you're using Axios, import it in your client-side code like this:</p>
        <pre><code>import axios from 'axios';</code></pre>
        <li><strong>Make a request to the NoCORS Proxy Server:</strong></li>
        <p>To make a request, simply call the HTTP client's method (e.g., axios.get, axios.post) with the desired URL as
          follows:</p>
        <pre><code>axios.defaults.baseURL = 'https://ec2-16-171-200-227.eu-north-1.compute.amazonaws.com/api/';
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        // Handle the response data here
        console.log(response.data); 
      })</code></pre>
      </ol>
      <p>The NoCORS Proxy Server ensures that the appropriate CORS headers are added to the response, allowing your
        client-side application to access the requested API data without CORS-related issues.</p>
      
    <p>test 2</p>
    </body>
    
    </html>
    
    
`;

  res.send(description);
});

export default router;