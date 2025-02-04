// Функция используется только в компоненте 'Timer',
// можно было бы оставить её рядом с этим компонентом и перенести сюда, если появится еще один вариант использования.
// Но здесь будет удобнее покрыть её тестами при необходимости (в ТЗ про тесты не было сказано, поэтому не тратил время на это)
export const getTimerTime = (msValue: number) => {
	const minutes = Math.floor(msValue / 60000)
		.toString()
		.padStart(2, '0');
	const seconds = Math.floor((msValue % 60000) / 1000)
		.toString()
		.padStart(2, '0');
	const milliseconds = Math.floor((msValue % 1000) / 100)
		.toString()
		.padEnd(3, '0');

	return `${minutes}:${seconds}.${milliseconds}`;
};
