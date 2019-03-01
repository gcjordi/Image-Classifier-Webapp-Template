import falcon
from falcon_cors import CORS
import json
import os
from nn import process_image
from falcon_multipart.middleware import MultipartMiddleware


cors = CORS(allow_all_origins=True, allow_all_headers=True)
public_cors = CORS(allow_all_origins=True)
app = falcon.API(middleware=[cors.middleware, MultipartMiddleware()])


class Images(object):
    def on_post(self, req, resp):
        try:
            if not req.content_length:
                raise AssertionError('No content')
            req = json.load(req.stream)
            evaluation = process_image(req['image'])
            print(f'>> Evaluated: {evaluation}')
            resp.body = json.dumps({'resp_data': evaluation})
            resp.status = falcon.HTTP_200
        except Exception as e:
            resp.status = falcon.HTTP_204


class Index(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('../frontend/build/index.html', 'r') as f:
            resp.body = f.read()


app.add_route('/identify', Images())
app.add_route('/', Index())
app.add_static_route('/static', os.path.abspath("../frontend/build"))
