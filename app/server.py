import falcon
from falcon_cors import CORS
import json
import time
from falcon_multipart.middleware import MultipartMiddleware


cors = CORS(allow_all_origins=True, allow_all_headers=True)
public_cors = CORS(allow_all_origins=True)
app = falcon.API(middleware=[cors.middleware, MultipartMiddleware()])


class Images(object):
    cors = public_cors

    def on_post(self, req, resp):
        if req.content_length:
            image = json.load(req.stream)
            print('image recieved')
            time.sleep(4)

        resp.body = json.dumps({'resp_data': 'This is a response'})
        resp.status = falcon.HTTP_200


app.add_route('/', Images())
