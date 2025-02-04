import React, { useEffect, useState } from 'react';
import { ITimer } from './types';
import { getTimerTime } from '../utils';

import styled from 'styled-components';

const TimerContainer = styled.div`
	padding: 1.5rem 2rem;
	gap: 0.5rem;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	text-align: center;
	min-width: 12rem;
`;

const Time = styled.span``;

const Actions = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
`;

interface ITimerProps {
	timer: ITimer;
	toggle: (id: number) => void;
	reset: (id: number) => void;
}

export const Timer = ({ timer, toggle, reset }: ITimerProps) => {
	const [time, setTime] = useState(timer.elapsedTime);

	useEffect(() => {
		let timerInterval: NodeJS.Timeout | null = null;

		if (timer.isRunning) {
			timerInterval = setInterval(() => {
				setTime(timer.elapsedTime + (Date.now() - timer.startTime));
			}, 100);
		} else {
			setTime(timer.elapsedTime);
		}

		return () => {
			if (timerInterval) clearInterval(timerInterval);
		};
	}, [timer]);

	return (
		<TimerContainer>
			<Time>{getTimerTime(time)}</Time>
			<Actions>
        {/* Я бы вынес этот (и весь остальной) текст в локализацию, но не тратил время, т.к. в ТЗ не было сказано */}
				<button onClick={() => toggle(timer.id)}>Start / Pause</button>
				<button onClick={() => reset(timer.id)}>Reset</button>
			</Actions>
		</TimerContainer>
	);
};
