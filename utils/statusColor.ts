export const statusTable = ['не начато', 'в работе', 'выполнено'];

export const statusColor = (status: number | string) => {
  switch (status) {
    case 'в работе':
      return { bg: '#FEF7E6', text: '#FFB940' };
    case 'выполнено':
      return { bg: '#E2F6E7', text: '#85DD9B' };
    case 'не начато':
      return { bg: '#EBEBEB', text: '#A7A7A7' };
    default:
      return { bg: '#EBEBEB', text: '#A7A7A7' };
  }
};
