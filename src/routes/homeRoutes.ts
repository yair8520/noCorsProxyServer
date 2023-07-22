import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    const description = `
<h2>Welcome to the NoCORS Proxy Server!</h2>
<p>This server acts as a proxy between your front-end application and external APIs that may have CORS (Cross-Origin Resource Sharing) restrictions. CORS restrictions can prevent your front-end application from making requests directly to APIs hosted on different domains. This server bypasses those restrictions, allowing you to access external APIs from your client-side code.</p>
<h3>How to send a request through the NoCORS Proxy Server:</h3>
<ol>
  <li><strong>Set up your client application:</strong></li>
  <p>Ensure you have a front-end application (e.g., React, Angular, Vue.js) running on either 'https://yair8520.github.io' (if deployed) or 'http://localhost:3000' (if testing locally). This client application will make requests to external APIs through the NoCORS Proxy Server.</p>
  <li><strong>Import the HTTP client library:</strong></li>
  <p>If you're using Axios, import it in your client-side code like this:</p>
  <pre><code>import axios from 'axios';</code></pre>
  <li><strong>Make a request to the NoCORS Proxy Server:</strong></li>
  <p>To make a request, simply call the HTTP client's method (e.g., axios.get, axios.post) with the desired URL as follows:</p>
  <pre><code>axios.get('https://nocorsproxyserver-b23bc189a395.herokuapp.com/api/https://jsonplaceholder.typicode.com/todos/')
  .then(response => {
    // Handle the response data here
    console.log(response.data);
  })</code></pre>
</ol>
<p>The NoCORS Proxy Server ensures that the appropriate CORS headers are added to the response, allowing your client-side application to access the requested API data without CORS-related issues.</p>
<p><strong>Author:</strong> Yair Gabay </p>
`;

    res.send(description);
});

export default router;