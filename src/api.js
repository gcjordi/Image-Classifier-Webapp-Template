import $ from 'jquery';

export function upload(b64img, callback){
    $.ajax({
        url: 'http://127.0.0.1:8000',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: b64img,
        success: function(response){
            callback(response.pred)
        },
        error: function(error){
            console.log(error)
        }
    })
}