const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const NewsItemsRoutes = express.Router();

// importing the json data set for news items
let newsitems = require('./NewsItems.json');


var resObj = {};


app.use(cors());


app.use(bodyParser.json());


/* Rote for returning requested news item and 
for blocking previous and next item search 
in the client side for first and lat item accordingly */
NewsItemsRoutes.route('/searchNews').post(function(req, res) { 
    
    if( req.body.page_filter == 1 )
    {
        resObj = {
            news_items: [newsitems.NewsItems[req.body.page_filter-1]],
            current_page: req.body.page_filter,
            total_pages: newsitems.NewsItems.length,
            has_next : true ,
            has_previous : false
        }
    }
    else if( req.body.page_filter == newsitems.NewsItems.length ) 
    {
        resObj = {
            news_items: [newsitems.NewsItems[req.body.page_filter-1]],
            current_page: req.body.page_filter,
            total_pages: newsitems.NewsItems.length,
            has_next : false ,
            has_previous : true
        }
    }
    else
    {
        resObj = {
            news_items: [newsitems.NewsItems[req.body.page_filter-1]],
            current_page: req.body.page_filter,
            total_pages: newsitems.NewsItems.length,
            has_next : true,
            has_previous : true
        }
    }
                
    res.json(resObj);

});


// using routing middleware
app.use('/NewsItems', NewsItemsRoutes);


app.listen(4000, function() {
    console.log("Server is running on Port: " + 4000);
});