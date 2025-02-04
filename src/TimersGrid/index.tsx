import React, { useState } from 'react';
import { Timer } from './Timer';
import { ITimer } from './types';

import styled from 'styled-components';

const TimersGridContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const GridActions = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const Grid = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
`;

export const TimersGrid = () => {
	const [timers, setTimers] = useState<Array<ITimer>>([]);

	const addTimer = () => {
		const newTimer = {
			id: Date.now(),
			startTime: 0,
			elapsedTime: 0,
			isRunning: false
		};

		setTimers((prev) => [...prev, newTimer]);
	};

	const toggleTimer = (id: number) => {
		setTimers((prev) =>
			prev.map((timer) => {
				if (timer.id === id) {
					return timer.isRunning
						? {
								...timer,
								isRunning: false,
								elapsedTime: timer.elapsedTime + (Date.now() - timer.startTime)
						  }
						: { ...timer, isRunning: true, startTime: Date.now() };
				}
				return timer;
			})
		);
	};

  // Из ТЗ не совсем понятно, нужно ли останавливать таймер. Данная реализация его останавливает
	const resetTimer = (id: number) => {
		setTimers((prev) =>
			prev.map((timer) =>
				timer.id === id ? { ...timer, startTime: 0, elapsedTime: 0, isRunning: false } : timer
			)
		);
	};

	const removeLastTimer = () => {
		setTimers((prev) => prev.slice(0, -1));
	};

	return (
		<TimersGridContainer>
			<GridActions>
				<button onClick={addTimer}>Add timer</button>
				<button onClick={removeLastTimer} disabled={timers.length === 0}>
					Remove
				</button>
			</GridActions>
			<Grid>
				{timers.map((timer) => (
					<Timer key={timer.id} timer={timer} toggle={toggleTimer} reset={resetTimer} />
				))}
			</Grid>
		</TimersGridContainer>
	);
};
