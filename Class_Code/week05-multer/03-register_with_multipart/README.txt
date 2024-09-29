In this part we go back to the html file and add a new attribute to the form called enctype 
    -> it will specificy which encoding type should be used



when we submit the form, we get a blank result. 
Thats because our express server is not setup to handle multipart form data yet
In the next part we will add something called multer: it will breakdown and handle 
    file data before giving us our body information