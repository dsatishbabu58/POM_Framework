import { generateRegistrationEmail } from '../utils/demoregester-utils';

export const registrationScenarios = [
  {
    url: 'https://demowebshop.tricentis.com/register',
    gender: 'Male',
    firstName: 'rama',
    lastName: 'krishna',
    email: generateRegistrationEmail('satish'),
    password: '123456789',
    confirmPassword: '123456789',
    expectedSuccessText: 'Your registration completed',
  },
  {
    url: 'https://demowebshop.tricentis.com/register',
    gender: 'Female',
    firstName: 'sita',
    lastName: 'laxmi',
    email: generateRegistrationEmail('sita'),
    password: '123456789',
    confirmPassword: '123456789',
    expectedSuccessText: 'Your registration completed',
  },
];
