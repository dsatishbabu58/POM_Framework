export function generateRegistrationEmail(prefix = 'satish', domain = 'gmail.com'): string {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000).toString();
  return `${prefix}.${randomSuffix}@${domain}`;
}
