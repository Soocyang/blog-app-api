const POSITIVE_CONST = ['1', 'true', 'Y', 'yes']
const NEGATIVE_CONST = ['0', 'false', 'N', 'no']

export const convertBoolean = (value: string): number | null => {
  if (POSITIVE_CONST.includes(value)) return 1
  if (NEGATIVE_CONST.includes(value)) return 0
  return null
};
