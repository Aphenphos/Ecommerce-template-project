import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class UserService {
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
      const structure = /^[^\s@;]+@[^\s@;]+\.[^\s@;]+$/.test(email);
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

  static async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error('Invalid Login');
      const v: boolean = await argon2.verify(
        user.passwordHash,
        password
      );
      if (v === false) throw new Error('Invalid Login');

      const jsecret = process.env.JWT_SECRET;
      if (jsecret === undefined) throw new Error('Invalid Login');
      const token = jwt.sign({ ...user }, jsecret, {
        expiresIn: '1 hour',
      });

      return token;
    } catch (err: any) {
      err.status = 401;
      throw err;
    }
  }
}

export default UserService;
