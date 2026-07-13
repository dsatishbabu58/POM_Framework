import { test, expect } from '@playwright/test';

test('count duplicate values in a list', async () => {
  const tags = [
    'div', 'button', 'div', 'a', 'button', 'div',
    'span', 'div', 'a', 'button', 'input', 'div',
    'button', 'a', 'div', 'span', 'div', 'button', 'dv', 'sp', 'dv', 'bu'
  ];

  const counttag: Record<string, number> = {};

  for (const tag of tags) {
  counttag[tag] = (counttag[tag] || 0) + 1;
}

//   for (const tag of tags) {
//     if (counttag[tag]) {
//       counttag[tag] = counttag[tag] + 1;
//     } else {
//       counttag[tag] = 1;
//     }
//   }

  const uniqueTags = new Set(tags);
  const uniqueCount = uniqueTags.size;

  console.log('count tag =', counttag);
  console.log('total tags =', tags.length);
  console.log('unique tags =', uniqueTags);
  console.log('unique tags count =', uniqueCount);

  expect(counttag['div']).toBe(7);
  expect(counttag['button']).toBe(5);
  expect(counttag['a']).toBe(3);
  expect(counttag['span']).toBe(2);
  expect(counttag['dv']).toBe(2);
  expect(counttag['sp']).toBe(1);
  expect(counttag['bu']).toBe(1);
 
});

test('reverse string', async () => {
  const str = 'satishbabu';
  const reversedstr = str.split('').reverse().join('');

  console.log('reversed string =', reversedstr);
  console.log('Length of string =', str.length);

  expect(reversedstr).toBe('ubabhsitas');
  expect(str.length).toBe(10);
});

const nums1 = [10, 25, 3, 99, 45];
console.log('Max number', Math.max(...nums1)); // 99
console.log('Min Number',Math.min(...nums1)); // 3

