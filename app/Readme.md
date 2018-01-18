- Python Setup (from app folder):
`pip install -r requirements.txt` & `conda install pytorch torchvision -c pytorch`

- To build frontend (from app folder): 
`npm run-script build`

- To run frontend (from build folder): 
`python -m http.server -b 127.0.0.1 3000`

- To run backend (from src folder):
`gunicorn run:app`