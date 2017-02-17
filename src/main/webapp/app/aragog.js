$(document).ready(function() {
    // httpWrapper(null, httpCall.POST, urlExtensions.postItems).done(function(data) {
 //        return false;
 //    }).fail(function() {
 //        console.log("error in posting data call - item post call");
 //    });
});

// Url parameters
var httpCall = Object.freeze({"GET":"GET", "POST":"POST"});

// Defualt url
var defaultUrl = "";

var urlExtensions = Object.freeze({
                                    "searchItems":"items/get", 
                                    "postItems":"items/post"
                                });

/**
* Searches for item
**/
function searchItem() {
    var itemTitle = getDisplay($("#itemTitleSearch").val());
    if (itemTitle.length > 0) {
        httpWrapper(itemTitle, httpCall.GET, urlExtensions.searchItems).done(function(data) {
            populateItemResultsTable(data);
        }).fail(function() {
            console.log("error in loading data call - item search");
        });
    }
}

/** 
* Populates the item table in the search form with the list of items returned from the search
* @param items - the items returned by the item search
**/
function populateItemResultsTable(data) {
    var items = data.items;
    
    $(".item-tbody:not(:last)").remove();
    if (items.length == 0) {
        $(".item-results-message").text("No Results Found").removeClass('hidden');
    }
    if (items.length > 500) {
        $(".search-results-count").text($(".search-results-count").text().split(":")[0] + ": ").append("500 of "+items.length);
    }
    else {
        $(".search-results-count").text($(".search-results-count").text().split(":")[0] + ": ").append(items.length);
    }
    for (var i in items) {
        $(".item-results-message").text("").addClass('hidden');
        
        if (i < 500) {
            var itemSearchData = $(".item-tbody").get(0).cloneNode(true);
            $(itemSearchData).removeClass('hidden');
            $(itemSearchData).insertAfter('table thead#itemTableHeader');

            var item = items[i];
            if(getDisplay(item.title) != "") {
                $(itemSearchData).find("#resultItemTitle").text(item.title);
            }
            if(getDisplay(item.price) != "") {
              $(itemSearchData).find("#resultItemPrice").text(item.price);
            }
        }
    }
    return false;
}

/**
 * Makes the AJAX call to the service to send/receive data. 
 * 
 * @param requestData - Data as object to be sent to the service.
 * @param httpCallType - Type of http request to be made
 * @param url - url extension to where the ajax call is to be made.
 */
function httpWrapper(requestData, httpCallType,url) {
    // ajax call to send data to the service.
    return $.ajax({
        type: httpCallType,
        url: defaultUrl+url,
        data: JSON.stringify(requestData),
        dataType: 'json',
        headers: {
            "Authorization": "Basic " +  sessionStorage.getItem("authorizationHeader"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data){
            console.log('Success');
            response = data;
        },
        error: function (result,status,error){
            console.log('Error: '+ result.status);
            console.log('Error caused during: ' + JSON.stringify(result.responseText)); 
            console.log('Error details: '+ error);
            var alertMessage = "";
            switch(result.status) {
                case 400: // Bad Request
                    alertMessage = "Bad Request. Please verify if the correct request is being sent.";
                    break;
                case 401: //Unauthorized
                    alertMessage = "Please verify if the authentication is provided.";
                    break;
                case 404: //resource not found
                    alertMessage = result.responseText + "Resource being called in not found. Please verify if the resource is available.";
                    break;
                case 415: // Invalid Media Type
                    alertMessage = "Invalid media type has been sent. Please verify if the correct media type is being sent.";
                    break;
                case 500: // Internal Error
                    alertMessage = "Internal error occured.";
                    break;
                default:
                    alertMessage = "";
                    break;
            }

            $.confirm({
                icon: 'fa fa-exclamation-triangle',
                title: "Warning",
                content: alertMessage + "<br>If error continues, please contact support desk. <br><hr> <legend data-toggle='collapse' href='#accordion-receiving' class='collapsed'><span class='expand-receiving'><a><left><i title='info' data-enable-tooltip='true' class ='icon-status-down'></i></left></a></span><span class='action-legend'> For More Information</span></legend><div class ='panel-collapse collapse' id ='accordion-receiving'>"+ result.responseText+"</div>",
                confirmButton: 'Cancel',
                cancelButton: 'Continue',
                confirmButtonClass: 'btn-primary',
                cancelButtonClass: 'btn-default',
                confirm: function(){
                    // Do nothing stay on the page.
                },
                cancel: function(){
                    // Do nothing stay on the page.
                }
            });
        }
    });
};

/**
 * Checks if the args is undefined or null.
 *
 * @param args - input string
 * @return {string} args if value is present or returns an empty string.
 */
function getDisplay(args) {
    if (typeof args === 'undefined' || args === null) {
        return "";
    }
    return args;
};