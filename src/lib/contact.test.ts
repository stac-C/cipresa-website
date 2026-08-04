import { describe, expect, it } from 'vitest';
import { validateContactPayload } from './contact';

describe('validateContactPayload', () => {
  it('rejects missing required field values', () => {
    expect(validateContactPayload({ name: '', email: '', subject: '', message: '' })).toEqual({
      isValid: false,
      errors: {
        name: 'Le nom est requis.',
        email: 'L’email est requis.',
        subject: 'Le sujet est requis.',
        message: 'Le message est requis.',
      },
    });
  });

  it('trims and accepts a complete payload', () => {
    expect(validateContactPayload({ name: '  Alice  ', email: '  alice@example.com ', subject: '  Demande  ', message: '  Bonjour  ' })).toEqual({
      isValid: true,
      cleaned: {
        name: 'Alice',
        email: 'alice@example.com',
        subject: 'Demande',
        message: 'Bonjour',
      },
    });
  });
});
