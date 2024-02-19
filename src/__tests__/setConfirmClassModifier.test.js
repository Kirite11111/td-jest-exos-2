import setConfirmClassModifier from '../setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
  it('returns "confirm disabled" when hasErrors is true with default classModifier', () => {
    const result = setConfirmClassModifier(true);
    expect(result).toBe('confirm disabled');
  });

  it('returns "confirm success" when hasErrors is false with default classModifier', () => {
    const result = setConfirmClassModifier(false);
    expect(result).toBe('confirm success');
  });

  it('returns "[customModifier] disabled" when hasErrors is true with custom classModifier', () => {
    const customModifier = 'custom-confirm';
    const result = setConfirmClassModifier(true, customModifier);
    expect(result).toBe('custom-confirm disabled');
  });

  it('returns "[customModifier] success" when hasErrors is false with custom classModifier', () => {
    const customModifier = 'custom-confirm';
    const result = setConfirmClassModifier(false, customModifier);
    expect(result).toBe('custom-confirm success');
  });
});
