const http = require("http");
const PORT = 8000;

/*
phase 3 lets add a webpage and send it over
this can be a little annoying, it takes up a bunch of space, so in phase 4:
1 - move the html code into an html file
2 - organize it into a subfolder called pages
3 - this is a lesson from class -> use FS and Path to read the file and send the data

Note: I have only included the homepage here, for sanity sake

*/

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MY HOME PAGE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        nav ul {
            list-style: none;
            padding: 0;
        }
        nav ul li {
            display: inline;
            margin-right: 20px;
        }
        nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
        section {
            padding: 50px;
            text-align: center;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px 0;
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>

<header>
    <h1>Welcome to My Website</h1>
    <nav>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
        </ul>
    </nav>
</header>

<section>
    <h2>Welcome to the homepage</h2>
    <p>This is a simple homepage designed to introduce you to our site. Explore more about us and what we offer.</p>
</section>

<footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
</footer>

</body>
</html>
`);
    res.end();
  } else if (req.url === "/about") {
    res.write("welcome to the about page");
    res.end();
  } else if (req.url === "/contact") {
    res.write("welcome to the contact page");
    res.end();
  } else if (req.url === "/login") {
    res.write("welcome to the login page");
    res.end();
  } else {
    res.write("page not found");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
