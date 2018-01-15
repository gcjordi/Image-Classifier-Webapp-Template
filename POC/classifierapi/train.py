import torch
import torchvision
import torchvision.transforms as transforms

batch_size = 32
image_size = 145
images_folder = 'faces'
no_classes = 4
lr = 1e-4
epochs = 20

transform = transforms.Compose([transforms.CenterCrop(image_size),
                                transforms.ToTensor(),
                                transforms.Normalize((0.5, 0.5, 0.5),
                                                     (0.5, 0.5, 0.5))])

dataset = torchvision.datasets.ImageFolder(root=images_folder,
                                           transform=transform)

data_loader = torch.utils.data.DataLoader(dataset=dataset,
                                          batch_size=batch_size,
                                          shuffle=True,
                                          num_workers=2,
                                          drop_last=True)
resnet18 = torchvision.models.resnet18(pretrained=True)
for param in resnet18.parameters():
    param.requires_grad = False

resnet18.fc = torch.nn.Linear(2048, no_classes)
resnet18.cuda()
resnet18.train()

optimizer = torch.optim.Adam(resnet18.fc.parameters(), lr, weight_decay=1e-4)
criterion = torch.nn.CrossEntropyLoss().cuda()

for epoch in range(epochs):

    for i, (images, target) in enumerate(data_loader):

        target = target.cuda(async=True)
        images = images.cuda(async=True)

        image_var = torch.autograd.Variable(images)
        label_var = torch.autograd.Variable(target)

        y_pred = resnet18(image_var)
        loss = criterion(y_pred, label_var)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        print('Epoch [%d/%d], Iter [%d/%d], loss: %.4f' %
              (epoch + 1, epochs, i + 1, len(data_loader),
               loss.data[0]))

torch.save(resnet18, 'model.pkl')
