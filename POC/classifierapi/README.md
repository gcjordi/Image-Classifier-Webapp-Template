## A Flask api that accepts images and classifies them

### Install:
* everything from requirements.txt (flask flask-cors gunicorn scikit-image)
* dlib (conda install -c menpo dlib)
* pytorch and torchvision from pytorch.org

### To run:
gunicorn app:app --reload
