import { Request, Response } from 'express';
import prisma from '../models/prisma';

export const addCar = async (req: Request, res: Response) => {
  try {
    const { model, image, registrationNumber, type, pricing } = req.body;
    const car = await prisma.car.create({
      data: { model, image, registrationNumber, type, pricing },
    });
    res.status(201).json(car);
  } catch (error:any) {
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
