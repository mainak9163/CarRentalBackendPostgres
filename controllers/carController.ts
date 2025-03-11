import { Request, Response } from 'express';
import prisma from '../models/prisma';

function sanitizeInput(input: string): string {
  return input.replace(/\x00/g, ""); // Removes null bytes
}

export const addCar = async (req: Request, res: Response) => {
  try {
    const { model, image, registrationNumber, type, pricing } = req.body;

    const sanitizedData = {
      model: sanitizeInput(model),
      image: sanitizeInput(image),
      registrationNumber: sanitizeInput(registrationNumber),
      type: sanitizeInput(type),
      pricing: sanitizeInput(pricing),
    };

    const car = await prisma.car.create({ data: sanitizedData });
    res.status(201).json(car);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAvailableCars = async (_req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany({ where: { booked: false } });
    res.status(200).json(cars);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
