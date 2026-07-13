import { test, expect } from '@playwright/test';

test('count tags', async () => {
  const tags = ['div', 'button', 'div', 'a', 'button', 'div'];

  let countDiv = 0;
  let countButton = 0;
  let countA = 0;

  for (const tag of tags) {
    if (tag === 'div') {
      countDiv = countDiv + 1;
    }

    if (tag === 'button') {
      countButton = countButton + 1;
    }

    if (tag === 'a') {
      countA = countA + 1;
    }
  }

  console.log('total count =', tags.length);
  console.log('div count =', countDiv);
  console.log('button count =', countButton);
  console.log('a count =', countA);

  expect(countDiv).toBe(3);
  expect(countButton).toBe(2);
  expect(countA).toBe(1);
});

test('reverse string', async () => {
  const word = 'satish';
  const reversedWord = word.split('').reverse().join('');

  console.log('reversed string =', reversedWord);
  expect(reversedWord).toBe('hsitas');
});
