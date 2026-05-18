import { StxErrorMessagePipe } from './stx-error-message-pipe';
import { ValidationMessages } from '../types/validation';

describe('StxErrorMessagePipe', () => {
  let pipe: StxErrorMessagePipe;

  beforeEach(() => {
    pipe = new StxErrorMessagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when errors are falsy or empty', () => {
    it('returns null if errors is null', () => {
      expect(pipe.transform(null, {})).toBeNull();
    });

    it('returns null if errors is undefined', () => {
      expect(pipe.transform(undefined, {})).toBeNull();
    });

    it('returns null if errors is an empty object', () => {
      expect(pipe.transform({}, {})).toBeNull();
    });
  });

  it('should return custom message for required error', () => {
    const errors = { required: true };

    expect(pipe.transform(errors, {}, 'Email')).toBe('Поле Email обязательно');
  });

  it('interpolates parameters for maxlength error', () => {
    const errors = { maxlength: { requiredLength: 10 } };
    const result = pipe.transform(errors, {}, 'Имя');
    expect(result).toMatch(/10/);
  });

  it('interpolates parameters for minlength error', () => {
    const errors = { minlength: { requiredLength: 10 } };
    const result = pipe.transform(errors, {}, 'Имя');
    expect(result).toMatch(/10/);
  });

  it('uses custom string message from config', () => {
    const errors = {
      loginInvalid: {
        requirements: ['letters digits hyphen underscore only', 'can not start with digit'],
      },
    };

    const customConfig: ValidationMessages = {
      loginInvalid: 'Неверный логин: {{requirements}}',
    };

    const result = pipe.transform(errors, customConfig, 'Логин');
    expect(result).toBe('Неверный логин: letters digits hyphen underscore only, can not start with digit');
  });

  it('calls custom function handler', () => {
    const errors = { required: true };
    const handler = vi.fn().mockReturnValue('Custom message');
    const customConfig = { required: handler };

    const result = pipe.transform(errors, customConfig, 'Field');

    expect(handler).toHaveBeenCalledWith('Field', true);
    expect(result).toBe('Custom message');
  });

  it('returns generic fallback for unknown error type', () => {
    const errors = { unknownError: { foo: 1 } };

    const result = pipe.transform(errors, {});

    expect(result).toBe('Ошибка: unknownError');
  });

  it('should interpolate {{name}} in custom message', () => {
    const errors = { customError: { foo: 'bar' } };
    const custom = { customError: 'Error in {{name}}: {{foo}}' };

    const result = pipe.transform(errors, custom, 'Username');

    expect(result).toBe('Error in Username: bar');
  });
});
