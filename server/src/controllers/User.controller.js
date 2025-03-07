const UserService = require('../services/User.Service');
const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');
const colors = require('colors');
const UserValidator = require('../utils/User.validator');
const cookiesConfig = require('../config/cookiesConfig');
const generateTokens = require('../utils/generateTokens');

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;
      const { accessToken, refreshToken } = generateTokens({ user });
      console.log(colors.bgGreen('Successfully generated new tokens'))
      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Successfully generated new tokens', {
          user,
          accessToken,
        }),
      );
    } catch ({ message }) {
      console.log(colors.bgRed('Error generating new tokens'));
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signUp(req, res) {
    const { email, username, password } = req.body;
    const { isValid, error } = UserValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      console.log(colors.bgRed('Registration validation error'));
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
        const userFound = await UserService.getByEmail(normalizedEmail);
      if (userFound) {
        console.log(colors.bgRed('A user with this email already exists'));
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'A user with this email already exists',
              null,
              'A user with this email already exists',
            ),
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        email: normalizedEmail,
        username,
        password: hashedPassword,
      });

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      console.log(colors.bgGreen('Registration successful'));
      res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Registration successful', {
            user: plainUser,
            accessToken,
          }),
        );
    } catch ({ message }) {
      console.log(colors.bgRed('Error creating user'));
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const { isValid, error } = UserValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      console.log(colors.bgRed('Login validation error'));
      return res.status(400).json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        console.log(colors.bgRed('User with this email not found'));
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              'User with this email not found',
              null,
              'User with this email not found',
            ),
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log(colors.bgRed('Invalid password'));
        return res
          .status(401)
          .json(formatResponse(401, 'Invalid password.', null, 'Invalid password.'));
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      console.log(colors.bgGreen('Login successful'));

      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login successful', {
            user: plainUser,
            accessToken,
          }),
        );
    } catch ({ message }) {
      console.log(colors.bgRed('Error logging in'));
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signOut(req, res) {
    try {
      console.log(colors.bgGreen('Logout successful'));
      res.clearCookie('refreshToken').json(formatResponse(200, 'Logout successful'));
    } catch ({ message }) {
      console.log(colors.bgRed('Error logging out'));
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = UserController;
