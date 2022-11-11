import argon2 from 'argon2';
import e from 'express';
import jwt from 'express';
import User from '../models/User';

const userServices = class UserService {
  static async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (email.length <= 6) {
      throw new Error('Invalid email');
    } else {
      const structure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (structure !== true) {
        throw new Error('Invalid email');
      }
    }

    if (password.length <= 9) {
      throw new Error('Password must be 9 characters minimum');
    } else {
      const unique =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{9,}$/.test(
          password
        );
      if (unique !== true) {
        throw new Error(
          'Password must contain a symbol, uppercase and lowercase letter, and a number'
        );
      }
    }

    try {
      const passwordHash = await argon2.hash(password, {
        timeCost: 4,
      });
      const user = await User.insert({
        email,
        passwordHash,
      });

      return user;
    } catch (e) {
      console.error(e);
    }
  }
};
