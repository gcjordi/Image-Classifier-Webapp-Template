import sanic
from sanic_cors import CORS
from nn import process_image
import hupper
# from torchvision import models

app = sanic.Sanic()
CORS(app)
# model = models.resnet18(pretrained=True, num_classes=1000).eval()


@app.route('/', methods=['POST', 'OPTIONS'])
async def recognize(request):
    pred = process_image('model', request.body)
    return sanic.response.json({'pred': pred})

if __name__ == '__main__':
    reloader = hupper.start_reloader('app')
    reloader.watch_files([])
    app.run(host="0.0.0.0", port=8000)
