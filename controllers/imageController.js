const sharp = require('sharp');
const Image = require('../models/image');
const nanoId = require('nanoid');
const BinData = require('mongodb').Binary;

class ImageController {
  constructor(imageRepository) {
    this.imageRepository = imageRepository;
  }

  async upload(req, res) {
    const imageData = req.file.buffer;
    const imageName = req.file.originalname.substring(0, req.file.originalname.lastIndexOf('.'));
    const imageFormat = req.file.mimetype;
    const id = nanoId.nanoid();

    const image = new Image(id, imageName, imageData, imageFormat);
    await this.imageRepository.save(image);

    // Get extension from format
    const mimeTypeRegex = /^image\/(?<extension>\w+)$/;
    function getExtensionFromFormatWithRegex(format) {
      const match = mimeTypeRegex.exec(format);
      return match ? match.groups.extension : "";
    }
    
    const newImageData = await sharp(imageData).greyscale().toBuffer();
    const newImageName = `${image.name}-greyscale.${getExtensionFromFormatWithRegex(image.format)}`;
    const newImageFormat = image.format;
    const newId = nanoId.nanoid();

    const newImage = new Image(newId, newImageName, newImageData, newImageFormat);
    await this.imageRepository.save(newImage);

    res.set('Content-Type', image.format);
    res.send(imageData);
  }

  async greyscale(req, res) {
    const { id } = req.params;

    const image = await this.imageRepository.findById(id);

    if (!image) {
      return res.sendStatus(404);
    }
    // const imageDataBuffer = Buffer.from(image.data);
  
    const newImageData = await sharp(image.data).greyscale().toBuffer();

    

    // Save to database 
    const newId = nanoId.nanoid();
    const newImageName = `${image.name}-greyscale.${getExtensionFromFormatWithRegex(image.format)}`;
    const newImage = new Image(newId, newImageName, newImageData, image.format);
    await this.imageRepository.save(newImage);

    res.status(201).json({
      id: newImage.id,
      name: newImage.name,
      createdAt: newImage.createdAt,
    });

    // res.set('Content-Type', `image/${image.format}`);
    // res.send(greyscaleImage);
  }

  async retrieve(req, res) {
    const { id } = req.params;

    const image = await this.imageRepository.findById(id);

    if (!image) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', image.format);
    res.send(image.data);
  }
}

module.exports = ImageController;