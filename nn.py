from base64 import b64decode
from PIL import Image
from io import BytesIO
# from torchvision import transforms
# from torch.autograd import Variable
# import torch.nn as nn
# import numpy as np
# import pickle


def process_image(model, b64img):

    # image = Image.open()
    # print(BytesIO(b64decode(b64img)))
    print(Image.frombytes('RGB', (224,224), b64img, 'PNG'))

    # trans = transforms.Compose([
    #     transforms.Resize(224),
    #     transforms.RandomCrop(224),
    #     transforms.ToTensor(),
    #     transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
    # image = Variable(trans(image))

    # image = image.view(1, 3, 224, 224)

    # softmax = nn.LogSoftmax(1)
    # preds = softmax(model(image)).data.cpu().numpy()

    # res = np.argmax(preds)

    # with open('classes.pkl', 'rb') as f:
    #     imagenet_classes = pickle.load(f)

    # return imagenet_classes[res].split(',')[0]

# nginx:

#     container_name: nginx
#     restart: always
#     image: danieldent/nginx-ssl-proxy
#     environment:
#       UPSTREAM: 127.0.0.1:8000
#       SERVERNAME: classifier.sdhnshu.com
#     ports:
#       - "80:80"
#       - "443:443"
#     volumes:
#       - "/etc/letsencrypt"