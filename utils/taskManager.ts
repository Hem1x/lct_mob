export const convertFioToFi = (str: string) => str.split(' ').slice(0, 2).join(' ');

export const graidTable = ['junior', 'middle', 'senior'];

export const priorityTable = ['низкий', 'средний', 'высокий'];

export const convertStringToCoord = (str: string): number[] => {
  return str.split(',').map((el) => +el);
};
