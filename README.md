![Build](https://github.com/the22mastermind/gourmet/workflows/Continuous%20Integration/badge.svg) [![codecov](https://codecov.io/gh/the22mastermind/gourmet/branch/main/graph/badge.svg)](https://codecov.io/gh/the22mastermind/gourmet)

# Gourmet
Gourmet Online Food Ordering Mobile App
<br/><br/>

## Description

Gourmet is an android mobile app that helps people to order food from Gourmet restaurant.<br/><br/>

## Features

- [x] Authentication (Sign Up, Login, and Logout)
- [x] View restaurant menu
- [x] Place order + Stripe Payment
- [x] View own orders list
- [x] View own single order

## Technologies/tools used

- React Native
- React Native Paper
- React Navigation 5
- React Hook Form
- React Native Testing Library
- Appium

## Tests

- Unit & Integration Tests (Jest & RNTL)
- End-to-End Tests (Appium)

## CI/CD

1. Github Actions

## Author

Bertrand Masabo

<br/>

## Screenshots

![](gourmet.gif)

<br/>

## Testing Locally

1. Ensure you have NodeJs 14+ and yarn installed on your system
<br/>

2. Ensure you have Android Studio installed and configured with an AVD
<br/>

3. Open your terminal and clone this repo
```
$ git clone https://github.com/the22mastermind/gourmet.git
```
4. Switch into the project root directory and install dependencies
```
$ cd gourmet && yarn install
```
5. Launch an emulator from AVD in Android Studio
<br/>

6. Launch Metro bundler
```
$ yarn start
```
7. Open another terminal window and run
```
$ yarn android
```
8. Ensure you have completed the steps [here](https://github.com/the22mastermind/gourmet-api/blob/main/README.md#testing-locally) before testing the features.
