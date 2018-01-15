from flask import Flask, request
import binascii
from flask_cors import CORS

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        image = dict(request.form)
        if image:
            image_name = image['filename'][0]

            encoded_image = image['data'][0].split(',')[1]
            base64_img = binascii.a2b_base64(encoded_image)

            with open('./inputs/{}'.format(image_name), 'wb') as f:
                f.write(base64_img)

    elif request.method == 'GET':
        return """Welcome to Classifier api!"""
    return 'okay'


if __name__ == '__main__':
    app.run()
