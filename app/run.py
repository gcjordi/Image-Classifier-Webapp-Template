import falcon
from falcon_cors import CORS
import json
from nn import process_image
from falcon_multipart.middleware import MultipartMiddleware


cors = CORS(allow_all_origins=True, allow_all_headers=True)
public_cors = CORS(allow_all_origins=True)
app = falcon.API(middleware=[cors.middleware, MultipartMiddleware()])


class Images(object):
    cors = public_cors

    def on_post(self, req, resp):
        try:
            if req.content_length:
                data = json.load(req.stream)
                evaluation = process_image(data['image'])
            resp.body = json.dumps({'resp_data': evaluation})
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_204
            print(str(e))


app.add_route('/', Images())
