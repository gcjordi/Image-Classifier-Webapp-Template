# Visual Recognition

## This basic web application has two parts:
- A react app that sends an image to the python api
- The python api accepts the image, passes it through ResNet and gives a [class](https://gist.github.com/sdhnshu/8982ff7bac4f8f839af3ee2055ee8b0e) as an output which is sent back to the frontend

- Python Setup (from app folder):
`pip install -r requirements.txt` & `conda install pytorch torchvision -c pytorch`

- To build frontend (from app folder): 
`npm run-script build`

- To run frontend (from build folder): 
`python -m http.server -b 127.0.0.1 3000`

- To run backend (from src folder):
`gunicorn run:app`