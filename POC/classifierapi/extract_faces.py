import dlib
from PIL import Image
from skimage import io
import time
import os

face_detector = dlib.get_frontal_face_detector()


def detect_faces(image):
    detected_faces = face_detector(image)
    face_frames = [(x.left(), x.top(), x.right(), x.bottom())
                   for x in detected_faces]
    return face_frames


if __name__ == '__main__':
    for f in os.scandir('images'):
        if f.is_dir():
            try:
                os.mkdir('./faces/' + f.name)
                for img_path in sorted(os.listdir('./images/' + f.name)):
                    image = io.imread('./images/' + f.name + '/' + img_path)
                    detected_faces = detect_faces(image)
                    print('face detected in {}'.format(img_path))
                    for n, face_rect in enumerate(detected_faces):
                        face = Image.fromarray(image).crop(face_rect)
                        face.save('{}/faces/{}/{}-{}.png'.format(os.path.abspath('.'),
                                                                 f.name, int(time.time()),
                                                                 n), 'PNG')
            except Exception:
                pass
