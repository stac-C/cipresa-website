export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactValidationResult =
  | { isValid: true; cleaned: ContactFormPayload }
  | { isValid: false; errors: Record<string, string> };

export function validateContactPayload(payload: ContactFormPayload): ContactValidationResult {
  const cleaned = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
  };

  const errors: Record<string, string> = {};

  if (!cleaned.name) errors.name = 'Le nom est requis.';
  if (!cleaned.email) errors.email = 'L’email est requis.';
  if (!cleaned.subject) errors.subject = 'Le sujet est requis.';
  if (!cleaned.message) errors.message = 'Le message est requis.';

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, cleaned };
}
