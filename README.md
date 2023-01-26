# Quiz Application 

+ With HTML , Css , JavaScript.
- Responsive / Mobile.

![Laptop-1-1440x900](https://user-images.githubusercontent.com/121452350/214863806-979a8c7d-cbb7-42fe-8d0c-4142622f440e.png)
![iPhone-XR-XS-Max-414x896](https://user-images.githubusercontent.com/121452350/214863822-73a16274-404b-49f4-ab36-f4d28126e4ef.png)

## To change the questions you need to edit the JSON file in :


```javascript
    myRequest.onreadystatechange = function () {
                   let questionsObject = JSON.parse(this.responseText);
    }    
    myRequest.open("GET", "qstions.json", true);

```
