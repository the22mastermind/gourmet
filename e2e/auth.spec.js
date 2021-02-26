/* eslint-disable no-undef */
describe('Authentication', () => {
  it('should display login screen', async () => {
    $('~login-screen').waitForDisplayed(11000, false);

    expect($('~login-screen')).toBeVisible();
    expect($('~title').getText()).toEqual('Login to continue');
    expect($('~phone-number-input')).toBeVisible();
    expect($('~login-button')).toBeVisible();
    expect($('~go-to-signup-button')).toBeVisible();
  });

  it('should display is required validation errors', async () => {
    const phone = $('~phone-input-wrapper');
    const password = $('~password-input-wrapper');

    $('~login-button').click();

    expect(phone).toBeVisible();
    expect(password).toBeVisible();
    expect(phone.$('~helper-text-error').getText()).toEqual('Phone number is required');
    expect(password.$('~helper-text-error').getText()).toEqual('Password is required');
  });

  it('should display pattern validation errors', async () => {
    const phoneInputWrapper = $('~phone-input-wrapper');
    const passwordInputWrapper = $('~password-input-wrapper');
    const phone = $('~phone-number-input');
    const password = $('~password-input');

    phone.setValue('hello');
    password.setValue('hi');

    $('~login-button').click();

    expect(phone.getText()).toEqual('hello');
    expect(password.getText()).not.toBeVisible();
    expect(phoneInputWrapper.$('~helper-text-error').getText()).toEqual('Phone number must include country code eg. +250');
    expect(passwordInputWrapper.$('~helper-text-error').getText()).toEqual('Password length must be between 6 and 20, with at least one number and a symbol');
  });

  it('should display user not found error', async () => {
    const phone = $('~phone-number-input');
    const password = $('~password-input');

    phone.setValue('+250721479870');
    password.setValue('@1hello');

    $('~login-button').click();

    expect($('~snackbar')).toBeVisible();
  });

  it('should login successfully', async () => {
    const phone = $('~phone-number-input');
    const password = $('~password-input');

    phone.setValue('+250787773277');
    password.setValue('hello@123');

    $('~login-button').click();

    $('~home-screen').waitForDisplayed(11000, false);

    expect($('~title').getText()).toEqual('Home screen');
  });

  it('should logout successfully', async () => {
    $('~logout-button').click();

    $('~login-screen').waitForDisplayed(11000, false);

    expect($('~title').getText()).toEqual('Login to continue');
  });
});
  