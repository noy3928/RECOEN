import { convertDateFormat } from '../convertDateFormat';

const createAt = '2022-12-26';

describe('convertDateFormat', () => {
  it('YYYY-MM-DD 형식의 날짜를 DD MMM YYYY 형식으로 변환한다.', () => {
    expect(convertDateFormat(createAt)).toBe('26 DEC 2022');
  });

  context('date가 없을 때', () => {
    it('undefined를 반환한다.', () => {
      expect(convertDateFormat(undefined)).toBe(undefined);
    });
  });
});
