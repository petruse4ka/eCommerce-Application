import Input from '@/components/inputs';
import { InputType } from '@/types/enums';

describe('Input', () => {
  test('should return correct input value', () => {
    const input = new Input({
      type: InputType.TEXT,
      id: 'test-input',
      value: 'test value',
      placeholder: '',
      labelText: '',
      className: '',
    });

    expect(input.getValue()).toBe('test value');
  });
});
