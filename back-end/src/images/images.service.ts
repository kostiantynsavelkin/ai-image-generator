import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import * as levenshtein from 'fast-levenshtein';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Image } from './images.entity';
import * as fs from 'fs';
import sharp from 'sharp';
import * as path from 'path';
import * as util from 'util';

const access = util.promisify(fs.access);
const unlink = util.promisify(fs.unlink);

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) { }

  async findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }

  async findAllowedAll(): Promise<Image[]> {
    return this.imagesRepository.find({ where: { allowed: true } });
  }

  async findOne(id: number): Promise<Image> {
    // Create a FindOneOptions object with the id value
    const options: FindOneOptions<Image> = {
      where: { id },
    };
    return this.imagesRepository.findOne(options);
  }

  async remove(id: string): Promise<void> {
    await this.imagesRepository.delete(id);
  }

  async create(image: Image): Promise<Image> {
    return this.imagesRepository.save(image);
  }

  async generate(keyword: string, roblox: boolean, count: number): Promise<Image[]> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const publicAssetsPath = path.join(__dirname, '../../', 'public');

    const prompt = `${roblox === true ? 'Make thumbnail that look like Popular games that' : ''} include these ideas: ${keyword}. Show an image of thumbnail. Please ensure that this is one unified image, not split into separate sections.`;

    try {
      const imageList = [];

      for (let i = 0; i < count; i++) {
        const openai = new OpenAI({ apiKey });

        const response = await openai.images.generate({
          prompt: prompt,
          n: 1,
          model: "dall-e-3",
          quality: 'standard',
          size: '1024x1024'
        });

        this.logger.log('Response: ' + JSON.stringify(response), 'Image');

        const imageUrl = response.data[0].url;

        // Download image and save to public assets directory
        const imageName = `generated_image_${Date.now()}_${i}.jpg`;
        const imagePath = path.join(publicAssetsPath, imageName);
        const writer = fs.createWriteStream(imagePath);

        const imageResponse = await axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'stream',
        });

        imageResponse.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });

        // Register image path
        const newImage = new Image();
        newImage.url = imageName;
        newImage.keyword = keyword;

        // Save the new image to the database
        await this.imagesRepository.save(newImage);

        imageList.push(newImage);
      }

      return imageList;
    } catch (error) {
      this.logger.error('Error generating image: ' + error, error.stack, 'Image');
      return null;
    }
  }
}