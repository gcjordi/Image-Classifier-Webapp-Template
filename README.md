# Visual Recognition

## This basic web application has two parts:
- A react app that sends an image to the python api
- The python api accepts the image, passes it through ResNet and gives a [class](https://gist.github.com/sdhnshu/8982ff7bac4f8f839af3ee2055ee8b0e) as an output which is sent back to the frontend

### Requirements
- node v10.15.2
- python v3.6.8

### Commands
- npm start (Dev)
- npm run-script build (Build Prod)
- gunicorn app:app --reload (Backend)